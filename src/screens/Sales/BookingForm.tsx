/* eslint-disable react/no-unescaped-entities */
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useSyncedFields } from 'hooks/useDiscountCalculator';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import {
  getBankList,
  getInstallmentDetails,
  getInstallmentOptions,
  getOtherChargesList,
  getTermsnConditions,
  getUnitInfo,
  getUnitParkingInfo,
  getVisitorsList,
} from 'redux/sales';
import { ExtraCharge, IVisitor } from 'redux/sales/salesInterface';
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
  } = useAppSelector(s => s.sales);

  const [show, setShow] = useState(false);

  const [customerDetails, setCustomerDetails] = useState<IVisitor>();

  const [isToggle, setIsToggle] = useState(true);

  const [extraCharges, setExtraCharges] = useState<ExtraCharge[]>([
    {
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
    },
  ]);

  const [oclist, setOCList] = useState({
    other_charge_unit_rates: [],
  });

  const [_installmentsList, setInstallmentsList] = useState([]);

  const [baseAmount, setBaseAmount] = useState<number>();

  const [terms, setTerms] = useState<string>();

  const [installmentId, setInstallmentId] = useState<number>(0);

  const [installments, setInstallments] = useState([]);

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
    extraCharges.forEach(charge => {
      total += charge.extra_charges_total;
    });
    return total.toFixed(2);
  };

  const [installments1, setInstallments1] = useState([
    {
      custom_payment_no: 1,
      installment_amount: parseInt('100'),
      gst: 4,
      percent: 12,
    },
    {
      custom_payment_no: 2,
      installment_amount: parseInt('200'),
      gst: 4,
      percent: 12,
    },
    {
      custom_payment_no: 3,
      installment_amount: parseInt('501'),
      gst: 4,
      percent: 12,
    },
    {
      custom_payment_no: 4,
      installment_amount: parseInt('0'),
      gst: 4,
      percent: 12,
    },
  ]); // Your installments data

  const updateInstallments = () => {
    const updatedInstallments = [...installments1];

    extraCharges.forEach(extraCharge => {
      const { extra_charges_distribution_method, extra_charges_total } = extraCharge;

      switch (extra_charges_distribution_method) {
        case 'Equally with all installments':
          // eslint-disable-next-line no-case-declarations
          const equallyDistributedAmount = extra_charges_total / (installments1.length - 1);
          updatedInstallments.forEach((installment, index) => {
            const lastIndex = installments1.length - 1;
            if (index !== lastIndex) {
              installment.installment_amount += equallyDistributedAmount;
            }
          });
          break;

        case 'Proportionately with all installment':
          // eslint-disable-next-line no-case-declarations
          const proportionatelyDistributedWithAll =
            extra_charges_total / (installments1.length - 1);
          updatedInstallments.forEach((installment, index) => {
            const lastIndex = installments1.length - 1;
            if (index !== lastIndex) {
              installment.installment_amount +=
                (proportionatelyDistributedWithAll * installment.percent) / 100;
            }
          });
          break;

        case 'Proportionately with all installment(Except First)':
          // eslint-disable-next-line no-case-declarations
          const proportionatelyDistributedAmount = extra_charges_total / (installments1.length - 1);
          updatedInstallments.forEach((installment, index) => {
            const lastIndex = installments1.length - 1;
            if (index !== 0 && index !== lastIndex) {
              installment.installment_amount +=
                (proportionatelyDistributedAmount * installment.percent) / 100;
            }
          });
          break;

        case 'Connect with last installment':
          // eslint-disable-next-line no-case-declarations
          const lastIndex = installments1.length - 2;
          updatedInstallments[lastIndex].installment_amount += extra_charges_total;
          break;

        default:
          // For other cases, directly add the amount to the total of all installments
          // eslint-disable-next-line no-case-declarations
          const last_index = installments1.length - 1;
          updatedInstallments[last_index].installment_amount += extra_charges_total;
          break;
      }
    });

    setInstallments(updatedInstallments);
  };

  const extraChargeRow = (i, x) => {
    const onChangeAmount = e => {
      const { valueAsNumber: amount } = e.target;

      const percent = ((amount / x.extra_charges_base) * 100).toFixed(2);
      handleUpdateExtraCharge(i, 'extra_charges_disc_per', percent);
    };

    const onChangePercent = e => {
      const { valueAsNumber: percent } = e.target;

      const amount = ((x.extra_charges_base * percent) / 100).toFixed(2);
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
            onChange={e =>
              handleUpdateExtraCharge(i, 'extra_charges_distribution_method', e.target.value)
            }
          >
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
          <input
            className="form-control mb-2"
            type="number"
            value={x.extra_charges_area}
            onChange={e => handleUpdateExtraCharge(i, 'extra_charges_area', e.target.value)}
          />
        </td>
        <td>
          <input
            className="form-control mb-2"
            type="number"
            value={x.extra_charges_rate}
            onChange={e => {
              handleUpdateExtraCharge(
                i,
                'extra_charges_base',
                x.extra_charges_area * e.target.valueAsNumber,
              );
              handleUpdateExtraCharge(
                i,
                'extra_charges_total',
                x.extra_charges_area * e.target.valueAsNumber,
              );
              handleUpdateExtraCharge(i, 'extra_charges_rate', e.target.value);
            }}
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
              onChangeAmount(e);
              handleUpdateExtraCharge(i, 'extra_charges_disc_amt', e.target.value);
            }}
            onKeyUp={e =>
              handleUpdateExtraCharge(
                i,
                'extra_charges_total',
                x.extra_charges_base - parseInt(e.target.value),
              )
            }
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
  }, [oclist?.other_charge_unit_rates]);

  const handleTotalPaymentCharge = () => {
    let total = 0;
    _installmentsList?.payment_scheduled_details_master?.forEach(charge => {
      total += parseFloat(charge?.totalPaymentSchedule) || 0;
    });
    return total.toFixed(2);
  };

  // Other Charges
  useEffect(() => { 
    setOCList(otherChargesList);
  }, [otherChargesList]);

  // Installments
  function handleUpdate () {
    const updatedList = installmentsInformation?.payment_scheduled_details_master?.map(item=>({
      ...item,
      basic_rate_basic_amount:0,
      otherChargesAmt:0,
      gst_per:0,
    }))
    setInstallmentsList(updatedList);
  }
  useEffect(() => {
    handleUpdate()
  }, [installmentsInformation]);
  const handleOCListChange = (index, field, value) => {
    setOCList(prevList => {
      const newUnitRates = [...prevList.other_charge_unit_rates];
      newUnitRates[index] = {
        ...newUnitRates[index],
        [field]: value,
      };

      // Calculate the new amount for the current row Other Charges
      const area = parseFloat(newUnitRates[index].area) || 0;
      const rate = parseFloat(newUnitRates[index].rate) || 0;
      let discount = parseFloat(newUnitRates[index].other_charges_disc_amt) || 0;
      let percentage = parseFloat(newUnitRates[index].other_charges_disc_per) || 0;

      // Calculate the total amount
      const totalAmount = area * rate;

      // Adjust percentage and discount if they exceed the limits
      if (field === 'other_charges_disc_amt') {
        // Calculate the new percentage
        const calculatedPercentage = (discount / totalAmount) * 100;
        percentage = calculatedPercentage > 100 ? 100 : calculatedPercentage;
        // Calculate the new discount based on the adjusted percentage
        const calculatedDiscount = (totalAmount * percentage) / 100;
        discount = calculatedDiscount > totalAmount ? totalAmount : calculatedDiscount;
      } else if (field === 'other_charges_disc_per') {
        // Calculate the new discount
        const calculatedDiscount = (totalAmount * percentage) / 100;
        discount = calculatedDiscount > totalAmount ? totalAmount : calculatedDiscount;

        // Calculate the new percentage based on the adjusted discount
        const calculatedPercentage = (discount / totalAmount) * 100;
        percentage = calculatedPercentage > 100 ? 100 : calculatedPercentage;
      }

      // Calculate the new discounted amount Other Charges
      const discountedAmount = totalAmount - discount;

      newUnitRates[index].other_charges_disc_amt = discount.toFixed(2);
      newUnitRates[index].other_charges_disc_per = percentage.toFixed(2);
      newUnitRates[index].otherChargesTotal = discountedAmount.toFixed(2);

      return {
        ...prevList,
        other_charge_unit_rates: newUnitRates,
      };
    });
  };

  const handlePaymentSchedule = (index, field, value) => {
    setInstallmentsList(prevList => {
      const newUnitRates = [...prevList];
      newUnitRates[index] = {
        ...newUnitRates[index],
        [field]: value,
      };
      let basicAmount = parseFloat(newUnitRates[index].basic_rate_basic_amount) || 0;
      let otherChargesAmt = parseFloat(newUnitRates[index].otherChargesAmt) || 0;
      let gst_per = parseFloat(newUnitRates[index].gst_per) || 0;
  
      // Calculate the totalPaymentSchedule
      const gstAmount = (basicAmount + otherChargesAmt) + (gst_per / 100);
      const totalPaymentSchedule = gstAmount;
  
      newUnitRates[index].basic_rate_basic_amount = parseFloat(basicAmount.toFixed(2));

      newUnitRates[index].totalPaymentSchedule = totalPaymentSchedule.toFixed(2);
  
      return newUnitRates
        
    });
  };
  
  

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  // Api calls
  useEffect(() => {
    dispatch(
      getVisitorsList({
        project_id: 18,
      }),
    );
    dispatch(getUnitInfo({ project_id: 18, tower_id: 1 }));
    dispatch(getUnitParkingInfo({ project_id: 18 }));
    dispatch(
      getOtherChargesList({
        project_id: 18,
        unit_id: unitId,
      }),
    );
    dispatch(
      getTermsnConditions({
        project_id: 18,
      }),
    );
    dispatch(
      getInstallmentOptions({
        project_id: 18,
      }),
    );
    dispatch(getBankList());
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
      basic_rate_area: unitInfoValues?.super_build_up_area || 0,
      basic_rate: 0,
      basic_rate_disc_amt: 0,
      basic_rate_disc_per: 0,
      basic_rate_basic_amount: 0,
      other_charges: [],
      other_charges_total: handleTotalOtherCharge(),
      other_charges_total_discount: handleTotalOtherDiscountAmt(),
      custom_payment_remark_id: 0,
      custom_payment_remark: terms || '',
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
  }, [
    customerDetails?.id,
    handleTotalOtherCharge,
    handleTotalOtherDiscountAmt,
    terms,
    unitInfoValues?.super_build_up_area,
    unitParkingInfoValues,
  ]);

  const handleSubmit = values => {
    // const {
    //   project_id,
    //   unit_id,
    //   visitors_id,
    //   unit_reserved_date,
    //   parking_no,
    //   calculation_method,
    //   basic_rate_no,
    //   basic_rate_description,
    //   basic_rate_area,
    //   basic_rate,
    //   basic_rate_disc_amt,
    //   basic_rate_disc_per,
    //   basic_rate_basic_amount,
    // } = values;
    
    console.log('🚀 ~ file: BookingForm.tsx:93 ~ handleSubmit ~ values:', values, _installmentsList);

    // dispatch(
    //   addBooking({
    //     project_bookings_temp_id: 0,
    //     project_id,
    //     unit_id,
    //     visitors_id,
    //     unit_reserved_date,
    //     parking_no,
    //     calculation_method,
    //     basic_rate_no,
    //     basic_rate_description,
    //     basic_rate_area,
    //     basic_rate,
    //     basic_rate_disc_amt,
    //     basic_rate_disc_per,
    //     basic_rate_basic_amount,
    //     other_charges: [],
    //     other_charges_total: 0,
    //     sub_total_amt: 0,
    //     total_disc: 0,
    //     disc_remarks: '',
    //     gst_per: 0,
    //     gst_amt: 0,
    //     stampduty_per: 0,
    //     stampduty_amount: 0,
    //     reg_per: 0,
    //     reg_amount: 0,
    //     total_gove_tax: '',
    //     extra_charges: rows,
    //     extra_charges_total: 0,
    //     property_final_amount: 0,
    //     is_loan: '',
    //     loan_amt: 0,
    //     bank: 0,
    //     loan_remarks: '',
    //     installments: [],
    //     custom_payment_total_amount: 0,
    //     custom_payment_remark_id: 0,
    //     custom_payment_remark: '',
    //   }),
    // );
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

  const OtherCharges = (i, x) => {
    const discountOtherCharges = useSyncedFields(
      baseAmount,
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
          <td></td>
          <td>
            <select
              className="form-control"
              onChange={e =>
                handleOCListChange(i, 'other_charges_distribution_method', e.target.value)
              }
            >
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
            <input
              className="form-control"
              type="number"
              value={x.area}
              onChange={e => handleOCListChange(i, 'area', e.target.value)}
            />
          </td>
          <td>
            <input
              className="form-control"
              type="number"
              value={x.rate}
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
              value={x.other_charges_disc_amt}
              onChange={e => {
                discountOtherCharges.onChangeAmount(e);
                handleOCListChange(i, 'other_charges_disc_amt', e.target.value);
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
              value={x.other_charges_disc_per}
              onChange={e => {
                discountOtherCharges.onChangePercent(e);
                handleOCListChange(i, 'other_charges_disc_per', e.target.value);
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

    const calculatedAmount = parseFloat(values.basic_rate_basic_amount) * e.percentage/100

    return (
      <tr key={`${i}_${e.id}`}>
        <td onClick={updateInstallments}>{i + 1}</td>
        <td>{e.title}</td>
        <td>
          <input
            className="form-control"
            type="date"
            value={e.date}
            onChange={x => {
              handlePaymentSchedule(i, 'basic_rate_basic_amount', calculatedAmount);
              handlePaymentSchedule(i, 'date', x.target.value);
            }}
          />
        </td>
        <td>
          <input className="form-control" type="number" value={e.percentage} />
        </td>
        <td>
          <input
            className="form-control"
            type="number"
            value={e.basic_rate_basic_amount}
            value={parseFloat(values.basic_rate_basic_amount)}
            onChange={updateInstallments}
          />
          
        </td>
        <td>
          <input
            className="form-control"
            type="number"
            value={e.otherChargesAmt}
            onChange={e => {
              handlePaymentSchedule(i, 'otherChargesAmt', e.target.value);
            }}
          />
        </td>
        <td>
          <input
            className="form-control"
            type="number"
            value={e.gst_per}
            onChange={e => {
              handlePaymentSchedule(i, 'gst_per', e.target.value);
            }}
          />
        </td>
        <td>
          <input readOnly className="form-control" type="number" value={e.totalPaymentSchedule} />
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

  const taxesTotalSyncedFields = useSyncedFields(
    parseFloat(values.basic_rate_basic_amount) + parseFloat(handleTotalOtherCharge()),
    'taxes_amount',
    'taxes_per',
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
      parseInt((baseAmount - basic_rate_disc_amt).toFixed(2)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseAmount, setFieldValue, values.basic_rate_disc_amt, values.basic_rate_disc_per]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      basic_rate: 0,
      basic_rate_disc_amt: 0,
      basic_rate_disc_per: 0,
      basic_rate_basic_amount: 0,
    });
    setBaseAmount(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.calculation_method]);

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
        {/* <div className="booking-form-header new-booking-header ml-auto px-2 py-3">
          <div className="booking-timer">
            <p>
              Time Left: <span>27 : 29</span>
            </p>
          </div>
        </div> */}
      </div>

      <hr />

      <section className="booking-form-sec pt-0">
        <div className="booking-form-row">
          <div className="booking-form-row-header">
            <h4>Customer Details</h4>
          </div>

          <Form onSubmit={formik.handleSubmit}>
            {/* 1st section */}
            <AddCustomerModal handleClose={toggleModal} show={show} />

            <div className="booking-form-box shwan-form">
              <div className="booking-form-col-12">
                <div className="d-flex align-items-center justify-content-between">
                  <h5>CUSTOMER DETAILS</h5>
                  <button className="Btn btn-lightblue-primary lbps-btn mr-0" onClick={toggleModal}>
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
                        value={`${customerDetails.first_name} ${customerDetails.last_name}`}
                      />
                    </div>
                    <div className="form-group col">
                      <label>Phone No</label>
                      <input
                        readOnly
                        className="form-control"
                        type="text"
                        value={customerDetails.phone}
                      />
                    </div>
                    <div className="form-group col">
                      <label>Email ID</label>
                      <input
                        readOnly
                        className="form-control"
                        type="text"
                        value={customerDetails.email || ''}
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
                  <div className="form-group col form-col-gap">
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
                  <div className="form-group col">
                    <label htmlFor="inputPassword4">Unit Info</label>
                    <input
                      className="form-control"
                      readOnly={true}
                      type="text"
                      value={unitInfoValues?.title}
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="inputPassword4">Super Buildup Area</label>
                    <input
                      className="form-control"
                      readOnly={true}
                      type="number"
                      value={unitInfoValues?.super_build_up_area}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col form-col-gap">
                      <label>Terrace Area</label>
                      <input
                        className="form-control"
                        readOnly={true}
                        type="text"
                        value={'pending'}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col">
                      <label>Car Parking No</label>
                      <input
                        className="form-control"
                        name="parking_no"
                        readOnly={true}
                        type="number"
                        value={formik.values.parking_no}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3rd section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-12">
                <h5>RATE CALCULATION</h5>
                <div className="form-row ml-3">
                  <div className="form-group col form-col-gap">
                    <div className="row w-100">
                      <p>
                        <b>Calculation Method</b>
                      </p>
                      <Col md={2}>
                        <Form.Check
                          id="RateBased"
                          label="Rate Based"
                          name="calculation_method"
                          type="radio"
                          value={'rate_base'}
                          onChange={handleChange}
                        />
                      </Col>
                      <Col md={2}>
                        <Form.Check
                          id="fixedRate"
                          label="Fixed Amount"
                          name="calculation_method"
                          type="radio"
                          value={'fixed_amount'}
                          onChange={handleChange}
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
                              className="form-control"
                              name="basic_rate_area"
                              type="number"
                              value={values.basic_rate_area}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              className="form-control"
                              name="basic_rate"
                              type="number"
                              value={values.basic_rate}
                              onBlur={handleBlur}
                              onChange={handleChange}
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
                              className="form-control"
                              name="basic_rate"
                              placeholder="Amount"
                              type="number"
                              value={values.basic_rate}
                              onBlur={handleBlur}
                              onChange={handleChange}
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
                              onChange={
                                handleChange
                              }
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
                      <th>Area</th>
                      <th>Rate</th>
                      <th>Discount</th>
                      <th className="text-right">Amount</th>
                    </thead>
                    <tbody>
                      {oclist?.other_charge_unit_rates?.map((x, i) => OtherCharges(i, x))}
                      <tr>
                        <td className="text-right font-weight-bold" colSpan={6}>
                          Other Charges Total
                        </td>
                        <td className="text-right">
                          ₹{' '}
                          <input
                            className="border-0 font-weight-bold"
                            name="other_charges_total"
                            type="number"
                            value={values.other_charges_total}
                            onChange={handleChange}
                          />
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
                  <div className="form-group col form-col-gap">
                    <label>
                      Sub Total Amount{' '}
                      <span className="muted-text">(Basic Amt + Other Charges)</span>
                    </label>
                    <input
                      readOnly
                      className="form-control"
                      type="number"
                      value={
                        parseFloat(values.basic_rate_basic_amount) +
                        parseFloat(values.other_charges_total)
                      }
                    />
                  </div>
                  <div className="form-group col">
                    <label>Total Discount</label>
                    <input
                      readOnly
                      className="form-control"
                      type="number"
                      value={
                        parseFloat(values.other_charges_total_discount) +
                        parseFloat(values.basic_rate_disc_amt)
                      }
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col">
                    <label>Discount Remark</label>
                    <textarea className="form-control" rows={2} />
                  </div>
                </div>
              </div>
            </div>

            {/* 6th section */}
            <div className="booking-form-box shwan-form mt-4">
              <div className="booking-form-col-6">
                <h5>GOVERNMENT TAXES</h5>

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
                  <div className="form-group col-2  pr-4">
                    <label>%</label>
                    <input
                      className="form-control"
                      name="taxes_per"
                      type="number"
                      value={values.taxes_per}
                      onChange={taxesTotalSyncedFields.onChangePercent}
                    />
                  </div>
                  <div className="form-group col-3">
                    <label>Amt</label>
                    <input
                      className="form-control"
                      name="taxes_amount"
                      type="number"
                      value={values.taxes_amount}
                      onChange={taxesTotalSyncedFields.onChangeAmount}
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
                      <th>Area</th>
                      <th>Rate</th>
                      <th>Discount</th>
                      <th className="text-right">Amount</th>
                      <th></th>
                    </thead>
                    <tbody>
                      {extraCharges?.map((x, i) => extraChargeRow(i, x))}
                      {/* total */}
                      <tr>
                        <td className="text-right font-weight-bold" colSpan={6}>
                          Extra Charges Total
                        </td>
                        <td className="font-weight-bold">₹ {handleTotalExtraCharge()}</td>
                        <td></td>
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
                            <span className="green-text">
                              (+) ₹ {values.basic_rate_basic_amount.toFixed(2)}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Other Charges Total</td>
                          <td>
                            <span className="green-text">(+) ₹ {values.other_charges_total}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>Total Discount (Sale Deed Amount)</td>
                          <td>
                            <span className="red-text">
                              (-) ₹{' '}
                              {(
                                parseFloat(values.other_charges_total_discount) +
                                parseFloat(values.basic_rate_disc_amt)
                              ).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Government Taxes Total</td>
                          <td>
                            <span className="green-text">
                              (+) ₹{' '}
                              {parseFloat(values.gst_amt) +
                                parseFloat(values.stampduty_amount) +
                                parseFloat(values.reg_amount) +
                                parseFloat(values.taxes_amount)}{' '}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Extra Charges</td>
                          <td>
                            <span className="green-text">(+) ₹ {handleTotalExtraCharge()}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p className="font-weight-bold">Property Final Amount</p>
                          </td>
                          <td>
                            <p className="font-weight-bold green-text">
                              (=) ₹{' '}
                              {parseFloat(values.basic_rate_basic_amount) +
                                parseFloat(values.other_charges_total) +
                                parseFloat(values.gst_amt) +
                                parseFloat(values.stampduty_amount) +
                                parseFloat(values.reg_amount) +
                                parseFloat(values.taxes_amount) +
                                parseFloat(handleTotalExtraCharge())}
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
                              checked={isToggle}
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
                              checked={!isToggle}
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

                {isToggle && (
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
                  <div className="col-4">
                    <label>Select Payment Installment</label>
                    <Select
                      closeMenuOnSelect={true}
                      options={installmentOptions}
                      placeholder="Select Payment Installment"
                      styles={{
                        container: base => ({
                          ...base,
                          marginTop: 10,
                          marginBottom: 20,
                        }),
                      }}
                      onChange={e => setInstallmentId(e.value)}
                    />
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
                      {_installmentsList?.map((e, i) =>
                        PaymentSchedule(i, e),
                      )}

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
                      onChange={e => setTerms(e.details.replace(HTML_REGEX, ''))}
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
