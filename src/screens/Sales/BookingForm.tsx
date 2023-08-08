/* eslint-disable react/no-unescaped-entities */
import 'react-toastify/dist/ReactToastify.css';

import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useSyncedFields } from 'hooks/useDiscountCalculator';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Countdown from 'react-countdown';
import Select from 'react-select';
import './SalesStyle.css'
import {
  addBooking,
  getAreaInfo,
  getBankList,
  getInstallmentDetails,
  getInstallmentOptions,
  getOtherChargesList,
  getOtherExtraCharges,
  getTermsnConditions,
  getUnitInfo,
  getUnitParkingInfo,
  getVisitorsList,
  triggerTimer,
} from 'redux/sales';
import { IVisitor } from 'redux/sales/salesInterface';
import { useAppDispatch, useAppSelector } from 'redux/store';
import { DISTRIBUTION_METHOD, HTML_REGEX } from 'utils/constant';

import AddCustomerModal from './AddCustomerModal';

const unitId = 28;

const BookingForm = () => {
  const dispatch = useAppDispatch();
  const {
    visitorList,
    unitInfo,
    unitParkingInfo,
    otherChargesList,
    termsList,
    installmentsList,
    installmentsInformation,
    banksList,
    unitAreaInfo,
    extraChargesList,
  } = useAppSelector(s => s.sales);

  const [show, setShow] = useState(false);

  const [customerDetails, setCustomerDetails] = useState<IVisitor>();

  const [isToggle, setIsToggle] = useState(true);

  const [extraCharges, setExtraCharges] = useState([]);

  function handleUpdateExtraCharges() {
    const updatedData = extraChargesList?.other_charge_unit_rates?.map(x => ({
      amount_type: x?.amount_type,
      fixed_amounts: x.fixed_amounts || 0,
      ratebase_amounts: x.ratebase_amounts || 0,
      title: x.title,
      extra_charges_no: 1,
      extra_charges_title: '',
      extra_charges_distribution_method: '',
      extra_charges_area: 0,
      extra_charges_rate: 0,
      extra_charges_disc_amt: 0,
      extra_charges_disc_per: 0,
      extra_charges_amt: 0,
      extra_charges_total: 0,
      extra_charges_base: 0,
    }));
    setExtraCharges(updatedData);
  }

  useEffect(() => {
    handleUpdateExtraCharges();
  }, [extraChargesList]);

  const [termsId, setTermsId] = useState(0);
  const [oclist, setOCList] = useState({
    other_charge_unit_rates: [],
  });

  const [_installmentsList, setInstallmentsList] = useState([]);

  const [baseAmount, setBaseAmount] = useState<number>();

  const [installmentId, setInstallmentId] = useState<number>(0);

  const [showInstall, setShowInstall] = useState(false);

  const toggleModal = () => setShow(!show);

  // unitInfo
  const unitInfoValues = useMemo(() => {
    return unitInfo?.booking_unit_sheet_towers_data?.find(e => e.project_main_units_id === unitId);
  }, [unitInfo?.booking_unit_sheet_towers_data]);

  // parkingInfo
  const unitParkingInfoValues = useMemo(() => {
    return unitParkingInfo?.all_parking_units?.filter(e => e.allotment_data === unitId.toString());
  }, [unitParkingInfo?.all_parking_units]);

  // customers options
  const customerOptions = useMemo(() => {
    return visitorList?.map(e => ({
      label: `${e.first_name} ${e.last_name} - [${e.phone}]`,
      value: e.id,
      details: e,
    }));
  }, [visitorList]);

  // t&c
  const termsOptions = useMemo(() => {
    return termsList?.map(e => ({
      label: e.title,
      value: e.id,
      details: e.description,
    }));
  }, [termsList]);

  // installment options
  const installmentOptions = useMemo(() => {
    return installmentsList?.payment_scheduled_master?.map(e => ({
      label: e.title,
      value: e.id,
    }));
  }, [installmentsList]);

  //BankLists Options
  const bankListOptions = useMemo(() => {
    return banksList?.map(x => ({
      label: x.title,
      value: x.id,
    }));
  }, [banksList]);
  // extra charges update, delete & update
  const handleUpdateExtraCharge = (index: number, field: string, value) => {
    setExtraCharges(prevExtraCharges => {
      const updatedExtraCharges = [...prevExtraCharges];
      updatedExtraCharges[index][field] = value;
      if (values.calculation_method === 'rate_base') {
        const calulatedAmt =
          unitAreaInfo?.super_build_up_area * updatedExtraCharges[index].ratebase_amounts;
        const discountAmt = updatedExtraCharges[index].extra_charges_disc_amt;
        const totalAmount = calulatedAmt - discountAmt;
        updatedExtraCharges[index].extra_charges_total = totalAmount;
      } else if (values.calculation_method === 'fixed_amount') {
        const calulatedAmt = updatedExtraCharges[index].fixed_amounts;
        const discountAmt = updatedExtraCharges[index].extra_charges_disc_amt;
        const totalAmount = calulatedAmt - discountAmt;
        updatedExtraCharges[index].extra_charges_total = totalAmount;
      }
      return updatedExtraCharges;
    });
  };
  const handleDeleteExtraCharge = (index: number) => {
    setExtraCharges(prevExtraCharges => {
      const updatedExtraCharges = [...prevExtraCharges];
      updatedExtraCharges.splice(index, 1);
      return updatedExtraCharges;
    });
  };

  const handleTotalExtraCharge = () => {
    let total = 0;
    extraCharges?.forEach(charge => {
      total += charge.extra_charges_total;
    });
    return total.toFixed(2);
  };

  // installment calculations

  useEffect(() => {
    if (installmentsInformation) {
      let updatedList =
        installmentsInformation?.payment_scheduled_details_master?.map(item => ({
          ...item,
          installment_basic_amt: 0,
          installment_otherchages_amt: 0,
          gst: 0,
          installment_amount: 0,
        })) || [];

      updatedList.push({
        installment_otherchages_amt: 0,
        installment_amount: 0,
        custom_payment_no: 0,
        title: 'Other Charges (Separatley)',
        installment_due_date: '',
        lastRow: 'true',
        percentage: 0,
      } as any);

      extraCharges?.forEach(extraCharge => {
        const { extra_charges_distribution_method, extra_charges_total } = extraCharge;
        const installmentLen = updatedList.length > 1 ? updatedList.length - 1 : 1;

        switch (extra_charges_distribution_method) {
          case 'Equally with all installments': {
            const equallyDistributedAmount = extra_charges_total / installmentLen;
            updatedList = updatedList.map((installment, index) => {
              if (index !== installmentLen && !installment?.lastRow) {
                installment.installment_otherchages_amt += parseFloat(
                  equallyDistributedAmount.toFixed(2),
                );
                return installment;
              }
              return installment;
            });
            break;
          }

          case 'Proportionately with all installment': {
            const proportionatelyDistributedWithAll = extra_charges_total / installmentLen;
            updatedList = updatedList.map((installment, index) => {
              if (index !== installmentLen && !installment?.lastRow) {
                installment.installment_otherchages_amt +=
                  (proportionatelyDistributedWithAll * installment.percentage) / 100;
              }
              return installment;
            });
            break;
          }

          case 'Proportionately with all installment(Except First)': {
            const proportionatelyDistributedAmount = extra_charges_total / (installmentLen - 1);
            updatedList = updatedList.map((installment, index) => {
              if (index !== 0 && index !== installmentLen && !installment?.lastRow) {
                installment.installment_otherchages_amt +=
                  (proportionatelyDistributedAmount * installment.percentage) / 100;
              }
              return installment;
            });
            break;
          }

          case 'Connect with last installment': {
            updatedList = updatedList.map((installment, index) => {
              if (index === installmentLen - 1 && !installment?.lastRow) {
                installment.installment_otherchages_amt += extra_charges_total;
              }
              return installment;
            });
            break;
          }

          case 'Dont connect with installment': {
            updatedList = updatedList.map(installment => {
              if (installment?.lastRow) {
                installment.installment_otherchages_amt += extra_charges_total;
              }
              return installment;
            });
            break;
          }

          default:
        }
      });

      oclist?.other_charge_unit_rates?.forEach(oclist => {
        const { other_charges_distribution_method, otherChargesTotal } = oclist;
        const installmentLen = updatedList.length > 1 ? updatedList.length - 1 : 1;

        switch (other_charges_distribution_method) {
          case 'Equally with all installments': {
            const equallyDistributedAmount = otherChargesTotal / installmentLen;
            updatedList = updatedList.map((installment, index) => {
              if (index !== installmentLen && !installment?.lastRow) {
                installment.installment_otherchages_amt += parseFloat(
                  equallyDistributedAmount.toFixed(2),
                );
                return installment;
              }
              return installment;
            });
            break;
          }

          case 'Proportionately with all installment': {
            const proportionatelyDistributedWithAll = otherChargesTotal / installmentLen;
            updatedList = updatedList.map((installment, index) => {
              if (index !== installmentLen && !installment?.lastRow) {
                installment.installment_otherchages_amt +=
                  (proportionatelyDistributedWithAll * installment.percentage) / 100;
              }
              return installment;
            });
            break;
          }

          case 'Proportionately with all installment(Except First)': {
            const proportionatelyDistributedAmount = otherChargesTotal / (installmentLen - 1);
            updatedList = updatedList.map((installment, index) => {
              if (index !== 0 && index !== installmentLen && !installment?.lastRow) {
                installment.installment_otherchages_amt +=
                  (proportionatelyDistributedAmount * installment.percentage) / 100;
              }
              return installment;
            });
            break;
          }

          case 'Connect with last installment': {
            updatedList = updatedList.map((installment, index) => {
              if (index === installmentLen - 1 && !installment?.lastRow) {
                installment.installment_otherchages_amt += parseFloat(otherChargesTotal);
              }
              return installment;
            });
            break;
          }

          case 'Dont connect with installment': {
            updatedList = updatedList.map(installment => {
              if (installment?.lastRow) {
                installment.installment_otherchages_amt += parseFloat(otherChargesTotal);
              }
              return installment;
            });
            break;
          }

          default:
        }
      });

      return setInstallmentsList(updatedList);
    }
  }, [oclist, extraCharges, installmentsInformation]);

  const extraChargeRow = (i, x) => {
    const extraBase = x.extra_charges_base === 0 ? 1 : x.extra_charges_base;

    const onChangeAmount = e => {
      const { valueAsNumber: amount } = e.target;

      const percent = ((amount / extraBase) * 100).toFixed(2) || 0;
      handleUpdateExtraCharge(i, 'extra_charges_disc_per', percent);
    };

    const onChangePercent = e => {
      const { valueAsNumber: percent } = e.target;

      const amount = ((extraBase * percent) / 100).toFixed(2) || 0;
      handleUpdateExtraCharge(i, 'extra_charges_disc_amt', amount);
    };

    return (
      <tr key={x.id}>
        <td>{i + 1}</td>
        <td>
          <input
            className="form-control mb-2"
            type="text"
            value={x?.extra_charges_title}
            onChange={e => handleUpdateExtraCharge(i, 'extra_charges_title', e.target.value)}
          />
        </td>
        <td>
          <select
            className="form-control"
            onChange={e => {
              handleUpdateExtraCharge(i, 'extra_charges_distribution_method', e.target.value);
            }}
          >
            <option disabled selected>
              Select Distribution Method
            </option>
            {DISTRIBUTION_METHOD?.map((e, index) => {
              return (
                <option key={index} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </td>
        <td>
          {values.calculation_method === 'rate_base' && (
            <input
              readOnly
              className="form-control mb-2"
              type="number"
              value={unitAreaInfo?.super_build_up_area}
            />
          )}
        </td>
        <td>
          <input
            className="form-control mb-2"
            type="number"
            value={
              values.calculation_method === 'rate_base'
                ? parseFloat(x.ratebase_amounts).toFixed(2) || 0
                : parseFloat(x.fixed_amounts) || 0
            }
            onChange={e => handleUpdateExtraCharge(i, 'ratebase_amounts', e.target.value)}
          />
        </td>
        <td>
          <span className="muted-text" style={{ fontSize: '12px' }}>
            Amt.
          </span>
          <input
            className="form-control mb-2"
            name="extra_charges_disc_amt"
            placeholder="Amount"
            type="number"
            value={x.extra_charges_disc_amt}
            onChange={e => {
              handleUpdateExtraCharge(i, 'extra_charges_disc_amt', e.target.value);
            }}
            onKeyUp={e => {
              handleUpdateExtraCharge(
                i,
                'extra_charges_base',
                values.calculation_method
                  ? unitAreaInfo?.super_build_up_area * x.ratebase_amounts
                  : x.fixed_amounts,
              );
              onChangeAmount(e);
              handleUpdateExtraCharge(
                i,
                'extra_charges_total',
                x.extra_charges_base - parseInt((e.target as any).value),
              );
            }}
          />
          <span className="muted-text" style={{ fontSize: '12px' }}>
            %
          </span>
          <input
            className="form-control"
            name="extra_charges_disc_per"
            placeholder="%"
            type="number"
            value={x.extra_charges_disc_per}
            onChange={e => {
              onChangePercent(e);
              handleUpdateExtraCharge(i, 'extra_charges_disc_per', e.target.value);
              handleUpdateExtraCharge(
                i,
                'extra_charges_base',
                values.calculation_method
                  ? unitAreaInfo?.super_build_up_area * x.ratebase_amounts
                  : x.fixed_amounts,
              );
            }}
            onKeyUp={() => {
              handleUpdateExtraCharge(
                i,
                'extra_charges_total',
                x.extra_charges_base - x.extra_charges_disc_amt,
              );
            }}
          />
        </td>
        <td>
          <input
            readOnly
            className="form-control mb-2"
            type="number"
            value={x.extra_charges_total}
          />
        </td>
        <td></td>
        <td>
          <button
            className="add-comp-btn m-0 acount-act-btn red-common"
            type="button"
            onClick={() => handleDeleteExtraCharge(i)}
          >
            <svg
              fill="none"
              height="10"
              viewBox="0 0 6 8"
              width="8"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.498698 6.91667C0.498698 7.375 0.873698 7.75 1.33203 7.75H4.66537C5.1237 7.75 5.4987 7.375 5.4987 6.91667V1.91667H0.498698V6.91667ZM5.91537 0.666667H4.45703L4.04036 0.25H1.95703L1.54036 0.666667H0.0820312V1.5H5.91537V0.666667Z"
                fill="#FF5D5D"
              ></path>
            </svg>
          </button>
        </td>
      </tr>
    );
  };

  const handleAddData = () => {
    setExtraCharges([
      ...extraCharges,
      {
        extra_charges_no: extraCharges.length + 1,
        extra_charges_title: '',
        extra_charges_distribution_method: '',
        extra_charges_area: 0,
        extra_charges_rate: 0,
        extra_charges_disc_amt: 0,
        extra_charges_disc_per: 0,
        extra_charges_amt: 0,
        extra_charges_base: 0,
        extra_charges_total: 0,
        ratebase_amounts: 0,
        fixed_amounts: 0,
      },
    ]);
  };

  const handleTotalOtherCharge = useCallback(() => {
    let total = 0;
    oclist?.other_charge_unit_rates?.forEach(charge => {
      total += parseFloat(charge?.otherChargesTotal) || 0;
    });
    return total.toFixed(2);
  }, [oclist?.other_charge_unit_rates]);

  const handleTotalOtherDiscountAmt = useCallback(() => {
    let total = 0;
    oclist?.other_charge_unit_rates?.forEach(charge => {
      total += parseFloat(charge?.other_charges_disc_amt) || 0;
    });
    return total.toFixed(2);
  }, [oclist]);

  const handleTotalPaymentCharge = () => {
    let total = 0;
    _installmentsList?.forEach(charge => {
      total += parseFloat(charge?.installment_amount) || 0;
    });
    return total.toFixed(2);
  };

  // Other Charges
  useEffect(() => {
    setOCList(otherChargesList);
  }, [otherChargesList]);

  const handlePaymentSchedule = (index, field, value) => {
    setInstallmentsList(prevList => {
      const newUnitRates = [...prevList];
      newUnitRates[index] = {
        ...newUnitRates[index],
        [field]: value,
      };

      const basicAmount = parseFloat(newUnitRates[index].installment_basic_amt) || 0;
      const otherChargesAmt = parseFloat(newUnitRates[index].installment_otherchages_amt) || 0;
      const gst_per = parseFloat(newUnitRates[index].gst) || 0;

      // Calculate the totalPaymentSchedule
      const gstAmount = (basicAmount + otherChargesAmt) * (gst_per / 100);
      const totalPaymentSchedule = basicAmount + otherChargesAmt + gstAmount;

      newUnitRates[index].installment_basic_amt = parseFloat(basicAmount.toFixed(2));

      newUnitRates[index].installment_amount = totalPaymentSchedule.toFixed(2);

      return newUnitRates;
    });
  };

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  // Api calls
  useEffect(() => {
    dispatch(getVisitorsList({ project_id: 18 }));
    dispatch(getUnitInfo({ project_id: 18, tower_id: 1 }));
    dispatch(getUnitParkingInfo({ project_id: 18 }));
    dispatch(getOtherChargesList({ project_id: 18, unit_id: unitId }));
    dispatch(getOtherExtraCharges({ project_id: 18, unit_id: unitId }));
    dispatch(getAreaInfo({ project_id: 18, project_main_types: 6, unit_id: unitId }));
    dispatch(getTermsnConditions({ project_id: 18 }));
    dispatch(getInstallmentOptions({ project_id: 18 }));
    dispatch(getBankList());
    dispatch(triggerTimer());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // installments details
  useEffect(() => {
    dispatch(
      getInstallmentDetails({
        project_id: 18,
        payment_scheduled_master_id: installmentId,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installmentId]);

  const initialValues = useMemo(() => {
    return {
      project_id: 18,
      unit_id: unitId,
      visitors_id: customerDetails?.id,
      unit_reserved_date: dayjs().format('YYYY-MM-DD'),
      parking_no: unitParkingInfoValues?.map(e => e.id).toString(),
      calculation_method: '',
      basic_rate_no: 1,
      basic_rate_description: 'Basic rate of unit',
      basic_rate_area: unitAreaInfo?.super_build_up_area || 0,
      basic_rate: unitAreaInfo?.rate_base_amt || 0,
      basic_rate_disc_amt: 0,
      basic_rate_disc_per: 0,
      basic_rate_basic_amount: 0,
      other_charges: [],
      other_charges_total: 0,
      other_charges_total_discount: 0,
      custom_payment_remark_id: 0,
      custom_payment_remark: '',
      extra_charges: [],
      gst_per: 0,
      gst_amt: 0,
      stampduty_per: 0,
      stampduty_amount: 0,
      reg_per: 0,
      reg_amount: 0,
      taxes_per: 0,
      taxes_amount: 0,
      is_loan: 'yes',
      loan_amt: 0,
      bank: 0,
      loan_remarks: '',
      installments: [],
    };
  }, [customerDetails?.id, unitInfoValues?.super_build_up_area, unitParkingInfoValues]);

  const handleSubmit = async values => {
    const {
      project_id,
      unit_id,
      visitors_id,
      unit_reserved_date,
      parking_no,
      calculation_method,
      basic_rate_no,
      basic_rate_description,
      basic_rate_area,
      basic_rate,
      basic_rate_disc_amt,
      basic_rate_disc_per,
      basic_rate_basic_amount,
      disc_remarks,
      gst_per,
      gst_amt,
      stampduty_per,
      stampduty_amount,
      reg_per,
      reg_amount,
      custom_payment_remark,
      bank,
      loan_amt,
    } = values;

    dispatch(
      addBooking({
        project_bookings_temp_id: 0,
        project_id,
        unit_id,
        visitors_id,
        unit_reserved_date,
        parking_no,
        calculation_method,
        basic_rate_no,
        basic_rate_description,
        basic_rate_area,
        basic_rate,
        basic_rate_disc_amt,
        basic_rate_disc_per,
        basic_rate_basic_amount,
        other_charges: oclist.other_charge_unit_rates,
        other_charges_total: parseInt(handleTotalOtherCharge()),
        sub_total_amt: basic_rate_basic_amount + parseFloat(handleTotalOtherCharge()),
        total_disc:
          parseFloat(handleTotalOtherDiscountAmt()) + parseFloat(values.basic_rate_disc_amt),
        disc_remarks: disc_remarks,
        gst_per,
        gst_amt,
        stampduty_per,
        stampduty_amount,
        reg_per,
        reg_amount,
        total_gove_tax: values.gst_amt + values.stampduty_amount + values.reg_amount,
        extra_charges: extraCharges,
        extra_charges_total: parseFloat(handleTotalExtraCharge()),
        property_final_amount:
          parseFloat(values.basic_rate_basic_amount) +
          parseFloat(handleTotalOtherCharge()) +
          parseFloat(values.gst_amt) +
          parseFloat(values.stampduty_amount) +
          parseFloat(values.reg_amount) +
          parseFloat(values.taxes_amount) +
          parseFloat(handleTotalExtraCharge()),
        is_loan: isToggle ? 'yes' : 'no',
        loan_amt,
        bank,
        loan_remarks: '',
        installments: _installmentsList,
        custom_payment_total_amount: 0,
        custom_payment_remark_id: termsId,
        custom_payment_remark,
      }),
    );
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const { values, setFieldValue, handleChange, handleBlur } = formik;

  const discountSyncedFields = useSyncedFields(
    baseAmount,
    'basic_rate_disc_amt',
    'basic_rate_disc_per',
    setFieldValue,
  );

  // const handleOCListChange = (index, field, value,) => {
  //   setOCList(prevList => {
  //     const newUnitRates = [...prevList.other_charge_unit_rates];
  //     newUnitRates[index] = {
  //       ...newUnitRates[index],
  //       [field]: value,
  //     };

  //     // Calculate the new amount for the current row Other Charges
  //     // const totalAmount = parseFloat(newUnitRates[index]?.oc_Base) || 0;
  //     // let discount = parseFloat(newUnitRates[index].other_charges_disc_amt) || 0;
  //     // let percentage = parseFloat(newUnitRates[index].other_charges_disc_per) || 0;

  //     // If the field being changed is 'area' or 'rate', recalculate the discount amount
  //     // if (field === 'area' || field === 'rate') {
  //     //   // Adjust percentage and discount if they exceed the limits
  //     //   if (field === 'area') {
  //     //     newUnitRates[index].area = value;
  //     //   } else {
  //     //     newUnitRates[index].rate = value;
  //     //   }

  //     //   // Calculate the new discount
  //     //   const calculatedDiscount = (totalAmount * percentage) / 100;
  //     //   discount = calculatedDiscount > totalAmount ? totalAmount : calculatedDiscount;

  //     //   // Calculate the new percentage based on the adjusted discount
  //     //   const calculatedPercentage = (discount / totalAmount) * 100;
  //     //   percentage = calculatedPercentage > 100 ? 100 : calculatedPercentage;
  //     // } else if (field === 'other_charges_disc_amt') {
  //     //   // Calculate the new percentage
  //     //   const calculatedPercentage = (discount / totalAmount) * 100;
  //     //   percentage = calculatedPercentage > 100 ? 100 : calculatedPercentage;
  //     //   // Calculate the new discount based on the adjusted percentage
  //     //   const calculatedDiscount = (totalAmount * percentage) / 100;
  //     //   discount = calculatedDiscount > totalAmount ? totalAmount : calculatedDiscount;
  //     // } else if (field === 'other_charges_disc_per') {
  //     //   // Calculate the new discount
  //     //   const calculatedDiscount = (totalAmount * percentage) / 100;
  //     //   discount = calculatedDiscount > totalAmount ? totalAmount : calculatedDiscount;

  //       // Calculate the new percentage based on the adjusted discount
  //       // const calculatedPercentage = (discount / totalAmount) * 100;
  //       // percentage = calculatedPercentage > 100 ? 100 : calculatedPercentage;
  //     // }

  //     // Calculate the new discounted amount Other Charges
  //     // const discountedAmount = totalAmount - discount;

  //     // newUnitRates[index].other_charges_disc_amt = discount.toFixed(2);
  //     // newUnitRates[index].other_charges_disc_per = percentage.toFixed(2);
  //     // newUnitRates[index].otherChargesTotal = discountedAmount.toFixed(2);

  //     return {
  //       ...prevList,
  //       other_charge_unit_rates: newUnitRates,
  //     };
  //   });
  // };
  const handleOCListChange = (index, field, value) => {
    setOCList(prevList => {
      const newUnitRates = [...prevList.other_charge_unit_rates];
      newUnitRates[index] = {
        ...newUnitRates[index],
        [field]: value,
      };
      if (values.calculation_method === 'rate_base') {
        const calulatedAmt =
          unitAreaInfo?.super_build_up_area * newUnitRates[index].ratebase_amounts;
        const discountAmt = newUnitRates[index].other_charges_disc_amt;
        const totalAmount = calulatedAmt - discountAmt;
        newUnitRates[index].otherChargesTotal = totalAmount;
      } else if (values.calculation_method === 'fixed_amount') {
        const calulatedAmt = newUnitRates[index].fixed_amounts;
        const discountAmt = newUnitRates[index].other_charges_disc_amt;
        const totalAmount = calulatedAmt - discountAmt;
        newUnitRates[index].otherChargesTotal = totalAmount;
      }
      return {
        ...prevList,
        other_charge_unit_rates: newUnitRates,
      };
    });
  };

  const OtherCharges = (i, x) => {
    const oc_Base =
      values.calculation_method === 'rate_base'
        ? unitAreaInfo?.super_build_up_area * x.ratebase_amounts
        : values.calculation_method === 'fixed_amount'
        ? x.fixed_amounts
        : 0;

    const discountOtherCharges = useSyncedFields(
      oc_Base,
      'other_charges_disc_amt',
      'other_charges_disc_per',
      (...params) => {
        handleOCListChange(i, ...params);
      },
    );

    return (
      <>
        <tr key={x.id}>
          <td>{x.id}</td>
          <td>{x.title}</td>
          <td>
            <select
              className="form-control"
              onChange={
                values.calculation_method === 'rate_base'
                  ? e => {
                      handleOCListChange(i, 'other_charges_distribution_method', e.target.value);
                      handleBaseAmount();
                    }
                  : e => {
                      handleOCListChange(i, 'other_charges_distribution_method', e.target.value);
                      handleFixedAmount();
                    }
              }
            >
              <option disabled selected>
                Select Distribution Method
              </option>
              {DISTRIBUTION_METHOD?.map((e, index) => {
                return (
                  <option key={index} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>
          </td>
          <td>
            {values.calculation_method === 'rate_base' && (
              <input
                readOnly
                className="form-control"
                type="number"
                value={unitAreaInfo?.super_build_up_area}
                onChange={e => handleOCListChange(i, 'area', e.target.value)}
              />
            )}
          </td>
          <td>
            <input
              readOnly
              className="form-control"
              type="number"
              value={
                values.calculation_method === 'rate_base'
                  ? x.ratebase_amounts.toFixed(2)
                  : x.fixed_amounts.toFixed(2)
              }
              onChange={e => {
                handleOCListChange(i, 'rate', e.target.value);
              }}
            />
          </td>
          <td>
            <span className="muted-text" style={{ fontSize: '12px' }}>
              Amt.
            </span>
            <input
              className="form-control mb-2"
              name="other_charges_disc_amt"
              placeholder="Amount"
              type="number"
              value={x.other_charges_disc_amt !== undefined ? x.other_charges_disc_amt : 0 + '.00'}
              onChange={e => {
                discountOtherCharges.onChangeAmount(e);
              }}
            />
            <span className="muted-text" style={{ fontSize: '12px' }}>
              %
            </span>
            <input
              className="form-control"
              name="other_charges_disc_per"
              placeholder="%"
              type="number"
              value={
                x?.other_charges_disc_per !== undefined
                  ? x.other_charges_disc_per.toFixed(2)
                  : 0 + '.00'
              }
              onChange={e => {
                discountOtherCharges.onChangePercent(e);
              }}
            />
          </td>
          <td>
            <input
              readOnly
              className="form-control"
              type="number"
              value={x.otherChargesTotal || 0}
            />
          </td>
        </tr>
      </>
    );
  };

  const PaymentSchedule = (i, e) => {
    // const calculatedAmount = (parseFloat(values.basic_rate_basic_amount) * e.percentage) / 100;

    return (
      <tr key={`${i}_${e.id}`}>
        <td>{i + 1}</td>
        <td>{e.title}</td>
        <td>
          <input
            className="form-control"
            type="date"
            value={e.date}
            onChange={x => {
              // handlePaymentSchedule(i, 'installment_basic_amt', calculatedAmount);
              handlePaymentSchedule(i, 'date', x.target.value);
            }}
          />
        </td>

        <td>
          {!e.lastRow && <input className="form-control" type="number" value={e.percentage} />}
        </td>
        <td>
          {!e.lastRow && (
            <input className="form-control" type="number" value={e.installment_basic_amt} />
          )}
        </td>
        <td>
          <input
            className="form-control"
            type="number"
            value={e.installment_otherchages_amt}
            onChange={e => {
              handlePaymentSchedule(i, 'installment_otherchages_amt', e.target.value);
            }}
          />
        </td>
        <td>
          {!e.lastRow && (
            <input
              className="form-control"
              max={100}
              type="number"
              value={e.gst}
              onChange={e => {
                handlePaymentSchedule(i, 'gst', e.target.value);
              }}
            />
          )}
        </td>
        <td>
          <input readOnly className="form-control" type="number" value={e.installment_amount} />
        </td>
      </tr>
    );
  };

  // govt Taxes
  const gstSyncedFields = useSyncedFields(
    parseFloat(values.basic_rate_basic_amount) + parseFloat(handleTotalOtherCharge()),
    'gst_amt',
    'gst_per',
    setFieldValue,
  );

  const stampDutySyncedFields = useSyncedFields(
    parseFloat(values.basic_rate_basic_amount) + parseFloat(handleTotalOtherCharge()),
    'stampduty_amount',
    'stampduty_per',
    setFieldValue,
  );

  const registrationSyncedFields = useSyncedFields(
    parseFloat(values.basic_rate_basic_amount) + parseFloat(handleTotalOtherCharge()),
    'reg_amount',
    'reg_per',
    setFieldValue,
  );

  useEffect(() => {
    const { basic_rate_area = 0, basic_rate = 0, calculation_method } = values;

    const basic_rate_total = basic_rate_area * basic_rate;
    setBaseAmount(calculation_method === 'rate_base' ? basic_rate_total : basic_rate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.basic_rate_area, values.basic_rate, values.calculation_method]);

  useEffect(() => {
    const { basic_rate_disc_amt = 0 } = values;
    setFieldValue(
      'basic_rate_basic_amount',
      parseFloat((baseAmount - basic_rate_disc_amt).toFixed(2)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseAmount, setFieldValue, values.basic_rate_disc_amt, values.basic_rate_disc_per]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      basic_rate:
        values.calculation_method === 'rate_base'
          ? unitAreaInfo?.rate_base_amt
          : unitAreaInfo?.fixed_amount || 0,
      basic_rate_disc_amt: 0,
      basic_rate_disc_per: 0,
      basic_rate_basic_amount: 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.calculation_method]);

  const Timer = ({ minutes, seconds }) => (
    <div className="booking-timer">
      <p>
        Time Left:{' '}
        <span id="minutesshow">
          {minutes} : {seconds}
        </span>
      </p>
    </div>
  );

  function handleInstallments() {
    setShowInstall(true);
    _installmentsList?.map((x, index) => {
      if (!x.lastRow) {
        const calculatedAmount = (
          (parseFloat(values.basic_rate_basic_amount) * x.percentage) /
          100
        ).toFixed(2);
        setInstallmentsList(prevList => {
          const newUnitRates = [...prevList];
          newUnitRates[index] = {
            ...newUnitRates[index],
            installment_basic_amt: calculatedAmount,
          };
          return newUnitRates;
        });
      }
    });
  }

  //This function will result in calculating the area*rate based on baseamount and reflect the value by default on amount
  function handleBaseAmount() {
    oclist?.other_charge_unit_rates?.map((x, index) => {
      const calculatedAmount = unitAreaInfo?.super_build_up_area * x.ratebase_amounts;
      setOCList(prevList => {
        const newUnitRates = [...prevList.other_charge_unit_rates];
        newUnitRates[index] = {
          ...newUnitRates[index],
          otherChargesTotal: calculatedAmount,
        };
        return { ...prevList, other_charge_unit_rates: newUnitRates };
      });
    });
  }

  //This function will result in calculating the area*rate based on fixedamount and reflect the value by default on amount
  function handleFixedAmount() {
    oclist?.other_charge_unit_rates?.map((x, index) => {
      const calculatedAmount = x.fixed_amounts;
      setOCList(prevList => {
        const newUnitRates = [...prevList.other_charge_unit_rates];
        newUnitRates[index] = {
          ...newUnitRates[index],
          otherChargesTotal: calculatedAmount,
        };
        return { ...prevList, other_charge_unit_rates: newUnitRates };
      });
    });
  }
  //This function will result in calculating the area*rate based on baseamount and reflect the value by default on amount
  function handleExtraBaseAmount() {
    setExtraCharges(prevList =>
      prevList.map(x => {
        const calculatedAmount = unitAreaInfo?.super_build_up_area * x.ratebase_amounts;
        return {
          ...x,
          extra_charges_total: calculatedAmount,
        };
      }),
    );
  }

  function handleExtraFixedAmount() {
    setExtraCharges(prevList =>
      prevList.map(x => {
        const calculatedAmount = x.fixed_amounts;
        return {
          ...x,
          extra_charges_total: calculatedAmount,
        };
      }),
    );
  }

  return (
    <>
      {/* top bar */}
      <div className="header-bar">
        <div className="page-header">
          <button className="header-back-btn">
            <svg
              fill="none"
              height="12"
              viewBox="0 0 18 12"
              width="18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 5H3.83L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H18V5Z"
                fill="#041D36"
              ></path>
            </svg>
          </button>
          <h2 className="mx-4">Booking Form</h2>
        </div>
        <div className="booking-form-header new-booking-header ml-auto px-2 py-3">
          <Countdown
            date={Date.now() + 1800000}
            renderer={props => <Timer {...props} />}
            onComplete={() => {
              // window.location.replace('https://google.com');
              // url to be redirect or use navigate to navigate back after submission or after timeout
            }}
            onStart={() =>
              localStorage.setItem('bookingTimer', JSON.stringify(dayjs().format('hh:mm:ss')))
            }
          />
        </div>
      </div>

      <hr />

      <section className="booking-form-sec pt-0 bookingFormUpdated">
        <div className="booking-form-row">
          <div className="booking-form-row-header">
            <h4>Customer Details</h4>
          </div>

          <Form onSubmit={formik.handleSubmit}>
            {/* 1st section */}
            <AddCustomerModal handleClose={toggleModal} show={show} />

            <div className="booking-form-box shwan-form ">
              <div className="booking-form-col-12">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>CUSTOMER DETAILS</h5>
                  <button
                    className="Btn btn-lightblue-primary lbps-btn mr-0"
                    type="button"
                    onClick={toggleModal}
                  >
                    Add Customer
                  </button>
                </div>

                <div className="form-row">
                  <div className="col-12">
                    <Select
                      closeMenuOnSelect={true}
                      options={customerOptions}
                      placeholder="Existing Customer"
                      styles={{
                        container: base => ({
                          ...base,
                          width: '31%',
                          marginTop: 10,
                          marginBottom: 50,
                        }),
                      }}
                      onChange={e => setCustomerDetails(e.details)}
                    />
                  </div>
                </div>

                {customerDetails ? (
                  <div className="form-row">
                    <div className="form-group col form-col-gap">
                      <label>Client Name</label>
                      <input
                        readOnly
                        className="form-control"
                        type="text"
                        value={`${customerDetails?.first_name} ${customerDetails?.last_name}`}
                      />
                    </div>
                    <div className="form-group col">
                      <label>Phone No</label>
                      <input
                        readOnly
                        className="form-control"
                        type="text"
                        value={customerDetails?.phone}
                      />
                    </div>
                    <div className="form-group col">
                      <label>Email ID</label>
                      <input
                        readOnly
                        className="form-control"
                        type="text"
                        value={customerDetails?.email || ''}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* 2nd section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>UNIT INFO</h5>

                <div className="form-row">
                  <div className="form-group col-sm-3 col-md-2 col-lg-3 mr-4 ">
                    <label>Unit Reservation Date</label>
                    <input
                      className="form-control"
                      name="unit_reserved_date"
                      type="date"
                      value={formik.values.unit_reserved_date}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="form-group col-sm-3 col-md-2 col-lg-3 mr-4 ">
                    <label htmlFor="inputPassword4">Unit Info</label>
                    <input
                      className="form-control"
                      readOnly={true}
                      type="text"
                      value={unitInfoValues?.title}
                    />
                  </div>
                  <div className="form-group col-sm-3 col-md-2 col-lg-3 mr-2">
                    <label htmlFor="inputPassword4">Super Buildup Area</label>
                    <input
                      className="form-control"
                      readOnly={true}
                      type="number"
                      value={unitAreaInfo?.super_build_up_area}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-sm-3 col-md-2 col-lg-3">
                    <label>Terrace Area</label>
                    <input className="form-control" readOnly={true} type="text" value={'pending'} />
                  </div>
                  <div className="form-group col-md-2col-sm-3 col-md-2 col-lg-3 ml-4">
                    <label>Car Parking No</label>
                    <input
                      className="form-control"
                      name="parking_no"
                      readOnly={true}
                      type="text"
                      value={formik.values.parking_no}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>RATE CALCULATION</h5>
                <div className="form-row ml-3">
                  <div className="form-group col-md-8 form-col-gap">
                    <div className="row w-100">
                      <p>
                        <b>Calculation Method : </b>
                      </p>
                      <Col md={2}>
                        <Form.Check
                          id="RateBased"
                          label="Rate Based"
                          name="calculation_method"
                          type="radio"
                          value={'rate_base'}
                          onChange={e => {
                            handleChange(e);
                            handleBaseAmount();
                            handleExtraBaseAmount();
                          }}
                        />
                      </Col>
                      <Col md={2}>
                        <Form.Check
                          id="fixedRate"
                          label="Fixed Amount"
                          name="calculation_method"
                          type="radio"
                          value={'fixed_amount'}
                          onChange={e => {
                            handleChange(e);
                            handleFixedAmount();
                            handleExtraFixedAmount();
                          }}
                        />
                      </Col>
                    </div>
                  </div>
                </div>

                {values.calculation_method === 'rate_base' ? (
                  <div>
                    {/* Rate Based */}
                    <table className="table">
                      <thead>
                        <th>Sr No</th>
                        <th>Description</th>

                        <th>Area</th>
                        <th>Rate</th>
                        <th>Discount</th>
                        <th>Basic Amount</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>Basic rate of unit</td>
                          <td>
                            <input
                              readOnly
                              className="form-control"
                              name="basic_rate_area"
                              type="number"
                              value={values?.basic_rate_area}
                              onBlur={handleBlur}
                            />
                          </td>
                          <td>
                            <input
                              readOnly
                              className="form-control"
                              name="basic_rate"
                              type="number"
                              value={values?.basic_rate}
                              onBlur={handleBlur}
                            />
                          </td>
                          <td>
                            <span className="muted-text" style={{ fontSize: '12px' }}>
                              Amt.
                            </span>
                            <input
                              className="form-control mb-2"
                              name="basic_rate_disc_amt"
                              placeholder="Amount"
                              type="number"
                              value={values.basic_rate_disc_amt.toFixed(2)}
                              onBlur={handleBlur}
                              onChange={discountSyncedFields.onChangeAmount}
                            />
                            <span className="muted-text" style={{ fontSize: '12px' }}>
                              %
                            </span>
                            <input
                              className="form-control"
                              name="basic_rate_disc_per"
                              placeholder="%"
                              type="number"
                              value={values.basic_rate_disc_per.toFixed(2)}
                              onBlur={handleBlur}
                              onChange={discountSyncedFields.onChangePercent}
                            />
                          </td>
                          <td>
                            <input
                              readOnly
                              className="form-control"
                              name="basic_rate_basic_amount"
                              type="number"
                              value={values.basic_rate_basic_amount.toFixed(2)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : values.calculation_method === 'fixed_amount' ? (
                  <div>
                    {/* Fixed Amount Based */}
                    <table className="table">
                      <thead>
                        <th>Sr No</th>
                        <th>Description</th>
                        <th>Rate</th>
                        <th>Discount</th>
                        <th>Basic Amount</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>Basic rate of unit</td>
                          <td>
                            <input
                              readOnly
                              className="form-control"
                              name="basic_rate"
                              placeholder="Amount"
                              type="number"
                              value={values.basic_rate}
                              onBlur={handleBlur}
                            />
                          </td>
                          <td>
                            <span className="muted-text" style={{ fontSize: '12px' }}>
                              Amt.
                            </span>
                            <input
                              className="form-control mb-2"
                              name="basic_rate_disc_amt"
                              placeholder="Amount"
                              type="number"
                              value={values.basic_rate_disc_amt}
                              onBlur={handleBlur}
                              onChange={discountSyncedFields.onChangeAmount}
                            />
                            <span className="muted-text" style={{ fontSize: '12px' }}>
                              %
                            </span>
                            <input
                              className="form-control"
                              name="basic_rate_disc_per"
                              placeholder="%"
                              type="number"
                              value={values.basic_rate_disc_per}
                              onBlur={handleBlur}
                              onChange={discountSyncedFields.onChangePercent}
                            />
                          </td>
                          <td>
                            <input
                              readOnly
                              className="form-control"
                              name="basic_rate_basic_amount"
                              type="number"
                              value={values.basic_rate_basic_amount}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : undefined}
              </div>
            </div>

            {/* 4th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>OTHER CHARGES</h5>

                <div>
                  <table className="table">
                    <thead>
                      <th>Sr No</th>
                      <th>Title</th>
                      <th>Distribution Method</th>
                      <th>{values.calculation_method === 'rate_base' && 'Area'}</th>
                      <th>Rate</th>
                      <th>Discount</th>
                      <th className="text-right">Amount</th>
                    </thead>
                    <tbody>
                      {values.calculation_method
                        ? oclist?.other_charge_unit_rates?.map((x, i) => OtherCharges(i, x))
                        : undefined}
                      <tr>
                        <td className="text-right font-weight-bold" colSpan={6}>
                          Other Charges Total
                        </td>
                        <td className="text-right">
                          ₹ {handleTotalOtherCharge()}
                          <input
                            className="d-none"
                            name="other_charges_total_discount"
                            type="number"
                            value={values.other_charges_total_discount}
                            onChange={handleChange}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 5th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-6">
                <h5>OVERALL DISCOUNT</h5>

                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label>Total Discount</label>
                    <input
                      readOnly
                      className="form-control"
                      type="number"
                      value={
                        parseFloat(handleTotalOtherDiscountAmt()) +
                        parseFloat(values.basic_rate_disc_amt)
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col">
                    <label>Discount Remark</label>
                    <textarea
                      className="form-control"
                      name="disc_remarks"
                      rows={2}
                      value={values.disc_remarks}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 6th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-6">
                <h5>GOVERNMENT TAXES</h5>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label style={{ display: 'flex', gap: '1rem' }}>
                      <span>Sub Total Amount </span>
                      <span className="muted-text"> (Basic Amt + Other Charges)</span>
                    </label>
                    <input
                      readOnly
                      className="form-control"
                      type="number"
                      value={
                        parseFloat(values.basic_rate_basic_amount) +
                        parseFloat(handleTotalOtherCharge())
                      }
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3 form-col-gap">
                    <label>GST</label>
                  </div>
                  <div className="form-group col-2  pr-4">
                    <label>%</label>
                    <input
                      className="form-control"
                      name="gst_per"
                      type="number"
                      value={values.gst_per}
                      onChange={gstSyncedFields.onChangePercent}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label>Amt</label>
                    <input
                      className="form-control"
                      name="gst_amt"
                      type="number"
                      value={values.gst_amt}
                      onChange={gstSyncedFields.onChangeAmount}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3 form-col-gap">
                    <label>Stamp Duty</label>
                  </div>
                  <div className="form-group col-2  pr-4">
                    <label>%</label>
                    <input
                      className="form-control"
                      name="stampduty_per"
                      type="number"
                      value={values.stampduty_per}
                      onChange={stampDutySyncedFields.onChangePercent}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label>Amt</label>
                    <input
                      className="form-control"
                      name="stampduty_amount"
                      type="number"
                      value={values.stampduty_amount}
                      onChange={stampDutySyncedFields.onChangeAmount}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3 form-col-gap">
                    <label>Registration</label>
                  </div>
                  <div className="form-group col-2  pr-4">
                    <label>%</label>
                    <input
                      className="form-control"
                      name="reg_per"
                      type="number"
                      value={values.reg_per}
                      onChange={registrationSyncedFields.onChangePercent}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label>Amt</label>
                    <input
                      className="form-control"
                      name="reg_amount"
                      type="number"
                      value={values.reg_amount}
                      onChange={registrationSyncedFields.onChangeAmount}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-3 form-col-gap">
                    <label>Taxes Total</label>
                  </div>
                  <div className="form-group col-5  pr-4">
                    {/* <label>₹ {values.gst_amt + values.stampduty_amount + values.reg_amount}</label> */}
                    <input
                      readOnly
                      className="form-control"
                      value={values.gst_amt + values.stampduty_amount + values.reg_amount}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 7th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>EXTRA CHARGES</h5>

                <div>
                  <table className="table">
                    <thead>
                      <th>Sr No</th>
                      <th>Title</th>
                      <th>Distribution Method</th>
                      <th>{values.calculation_method === 'rate_base' && 'Area'}</th>
                      <th>Rate</th>
                      <th>Discount</th>
                      <th className="text-right">Amount</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {values.calculation_method
                        ? extraCharges?.map((x, i) => extraChargeRow(i, x))
                        : undefined}
                      {/* total */}
                      <tr>
                        <td className="text-right font-weight-bold" colSpan={6}>
                          Extra Charges Total
                        </td>
                        <td className="font-weight-bold">₹ {handleTotalExtraCharge()}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row w-100 justify-content-end">
                    <button
                      className="Btn btn-lightblue-primary lbps-btn ml-auto mr-0"
                      type="button"
                      onClick={handleAddData}
                    >
                      Add More
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 8th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>SUMMARY</h5>

                <div className="row">
                  <div className="col-4">
                    <table className="table">
                      <tbody>
                        <tr>
                          <td>Basic Amount</td>
                          <td>
                            <span className="green-text" style={{ display: 'flex', gap: '2rem' }}>
                              <span> (+)</span>
                              <span> ₹ </span>
                              <span>{values.basic_rate_basic_amount.toFixed(2)}</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Other Charges Total</td>
                          <td>
                            <span className="green-text" style={{ display: 'flex', gap: '2rem' }}>
                              <span> (+)</span>
                              <span> ₹ </span>
                              <span> {handleTotalOtherCharge()} </span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Total Discount (Sale Deed Amount)</td>
                          <td>
                            <span className="red-text" style={{ display: 'flex', gap: '2rem' }}>
                              <span> (+)</span>
                              <span> ₹ </span>
                              <span>
                                {(
                                  parseFloat(handleTotalOtherDiscountAmt()) +
                                  parseFloat(values.basic_rate_disc_amt)
                                ).toFixed(2)}
                              </span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Government Taxes Total</td>
                          <td>
                            <span className="green-text" style={{ display: 'flex', gap: '2rem' }}>
                              <span> (+)</span>
                              <span> ₹ </span>
                              <span>
                                {(
                                  parseFloat(values.gst_amt) +
                                  parseFloat(values.stampduty_amount) +
                                  parseFloat(values.reg_amount) +
                                  parseFloat(values.taxes_amount)
                                ).toFixed(2)}
                              </span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Extra Charges</td>
                          <td>
                            <span className="green-text" style={{ display: 'flex', gap: '2rem' }}>
                              <span> (+)</span>
                              <span> ₹ </span>
                              <span> {handleTotalExtraCharge()} </span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="font-weight-bold">Property Final Amount</p>
                          </td>
                          <td>
                            <p
                              className="font-weight-bold green-text"
                              style={{ display: 'flex', gap: '1.9rem' }}
                            >
                              <span> (+)</span>
                              <span> ₹ </span>
                              <span>
                                {' '}
                                {(
                                  parseFloat(values.basic_rate_basic_amount) +
                                  parseFloat(handleTotalOtherCharge()) +
                                  parseFloat(values.gst_amt) +
                                  parseFloat(values.stampduty_amount) +
                                  parseFloat(values.reg_amount) +
                                  parseFloat(values.taxes_amount) +
                                  parseFloat(handleTotalExtraCharge())
                                ).toFixed(2)}
                              </span>
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* 9th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-6">
                <h5>LOAN DETAILS</h5>

                <div className="form-row">
                  <div className="col-6">
                    <label>Do you wish to take a loan?</label>
                    <div className="form-row">
                      <div className="col-6">
                        <div className="rd-grp form-check-inline">
                          <label className="rd-container check-yes">
                            Yes
                            <input
                              checked={!isToggle}
                              name="radio"
                              type="radio"
                              value={values.is_loan}
                              onChange={handleToggle}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <label className="rd-container check-no">
                            No
                            <input
                              checked={isToggle}
                              name="radio"
                              type="radio"
                              value={values.is_loan}
                              onChange={handleToggle}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {!isToggle && (
                  <>
                    <div className="form-row mt-3">
                      <div className="form-group col form-col-gap">
                        <label>Loan Amount</label>
                        <input
                          className="form-control"
                          id="loan_amt"
                          name="loan_amt"
                          type="number"
                          value={values.loan_amt}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group col">
                        <label>Bank</label>
                        <Select
                          closeMenuOnSelect={true}
                          name="bank"
                          options={bankListOptions}
                          placeholder="Banks List"
                          styles={{
                            container: base => ({
                              ...base,
                              width: '81%',
                              marginTop: 0,
                              marginBottom: 17,
                            }),
                          }}
                          onChange={e => setFieldValue('bank', e.value)}
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col">
                        <label>Remarks</label>
                        <textarea
                          className="form-control"
                          cols={20}
                          id="loan_remarks"
                          name="loan_remarks"
                          rows={10}
                          value={values.loan_remarks}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* 10th section  */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>PAYMENT SCHEDULE</h5>

                <div className="form-row">
                  <div className="col-6 ">
                    <label>Select Payment Installment</label>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <Select
                        closeMenuOnSelect={true}
                        options={installmentOptions}
                        placeholder="Select Payment Installment"
                        styles={{
                          container: base => ({
                            ...base,
                            marginTop: 10,
                            marginBottom: 20,
                            width: '25rem',
                          }),
                        }}
                        onChange={e => {
                          setInstallmentId(e.value);
                          setShowInstall(false);
                        }}
                      />
                      <button
                        className="Btn btn-lightblue-primary lbps-btn py-2"
                        id="butng"
                        type="button"
                        onClick={handleInstallments}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <table className="table">
                    <thead>
                      <th>Sr No</th>
                      <th>Installment Name</th>
                      <th>Due Date</th>
                      <th>%</th>
                      <th>Basic Amount</th>
                      <th>Other Charges Amount</th>
                      <th>GST %</th>
                      <th className="text-right">Installment Amount</th>
                    </thead>
                    <tbody>
                      {showInstall && _installmentsList?.map((e, i) => PaymentSchedule(i, e))}

                      {/* total */}
                      <tr>
                        <td className="text-right font-weight-bold" colSpan={7}>
                          Installments Total
                        </td>
                        <td className="text-right">₹ {handleTotalPaymentCharge()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* 11th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>TERMS & CONDITIONS</h5>

                <div className="form-row mb-4">
                  <div className="col-4">
                    <label>Select T&C Template</label>
                    <Select
                      closeMenuOnSelect={true}
                      options={termsOptions}
                      placeholder="Select Terms & Conditions"
                      styles={{
                        container: base => ({
                          ...base,
                          marginTop: 10,
                          marginBottom: 50,
                        }),
                      }}
                      onChange={e => {
                        setTermsId(e.value);
                        setFieldValue('custom_payment_remark', e.details.replace(HTML_REGEX, ''));
                      }}
                    />
                  </div>
                  <div className="col-10 px-0">
                    <textarea
                      className="form-control"
                      name="custom_payment_remark"
                      value={values.custom_payment_remark}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="booking-form-col-12">
                <div className="form-row mb-4">
                  <div className="bookingform-footer mt-5">
                    <button className="Btn btn-lightblue-primary" type="submit">
                      Save
                    </button>
                    <button
                      className="Btn btn-lightblue-primary lbps-btn"
                      data-dismiss="modal"
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default BookingForm;
