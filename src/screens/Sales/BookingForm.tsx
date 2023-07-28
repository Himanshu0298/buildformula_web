/* eslint-disable react/no-unescaped-entities */
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import { useSyncedFields } from 'hooks/useDiscountCalculator';
import { useEffect, useMemo, useState } from 'react';
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

const BookingForm = () => {
  const dispatch = useAppDispatch();
  const { visitorList, unitInfo, unitParkingInfo, otherChargesList, termsList, installmentsList, installmentsInformation,banksList } = useAppSelector(
    s => s.sales,
  );

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
  const [_installmentsList, setInstallmentsList] = useState({
    payment_scheduled_details_master: [],
  });
  const [baseAmount, setBaseAmount] = useState<number>();
  const [terms, setTerms] = useState<string>();
  const [installmentId, setInstallmentId] = useState<number>(0);
  const toggleModal = () => setShow(!show);
  const unitId = 28;

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
  const bankListOptions = useMemo(()=>{
    return banksList?.map(x=>({
      label:x.title,
      value:x.id
    }))
  },[banksList])
  
  // extra charges update & delete
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

  const [installments, setInstallments] = useState([installmentsList?.payment_scheduled_master]);

  const updateInstallments = () => {
    const updatedInstallments = [...installments];

    extraCharges.forEach(extraCharge => {
      const { extra_charges_distribution_method, extra_charges_amt } = extraCharge;

      switch (extra_charges_distribution_method) {
        case 'Equally with all installments':
          // eslint-disable-next-line no-case-declarations
          const equallyDistributedAmount = extra_charges_amt / installments.length;
          updatedInstallments.forEach(installment => {
            installment.installment_amount += equallyDistributedAmount;
          });
          break;

        case 'Proportionately with all installment(Except First)':
          // eslint-disable-next-line no-case-declarations
          const proportionatelyDistributedAmount = extra_charges_amt / (installments.length - 1);
          updatedInstallments.forEach((installment, index) => {
            if (index !== 0) {
              installment.installment_amount += proportionatelyDistributedAmount;
            }
          });
          console.log('2', proportionatelyDistributedAmount);
          break;

        case 'Connect with last installment':
          // eslint-disable-next-line no-case-declarations
          const lastIndex = installments.length - 1;
          updatedInstallments[lastIndex].installment_amount += extra_charges_amt;
          console.log('3', extra_charges_amt);
          break;

        default:
          // For other cases, directly add the amount to the total of all installments
          updatedInstallments.forEach(installment => {
            installment.installment_amount += extra_charges_amt;
          });
          console.log('4', extra_charges_amt);
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
      <tr>
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
            onKeyUp={e => {
              handleUpdateExtraCharge(
                i,
                'extra_charges_total',
                x.extra_charges_base - e.target.value,
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
            }}
            onKeyUp={e => {
              handleUpdateExtraCharge(
                i,
                'extra_charges_total',
                x.extra_charges_base - x.extra_charges_disc_amt,
              );
            }}
          />
        </td>
        <td>
          <input className="form-control mb-2" type="number" value={x.extra_charges_total} />
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

  const handleTotalOtherCharge = () => {
    let total = 0;
    oclist?.other_charge_unit_rates?.forEach(charge => {
      total += parseFloat(charge?.otherChargesTotal) || 0;
    });
    return total.toFixed(2);
  };

  // Other Charges
  useEffect(() => {
    setOCList(otherChargesList);
  }, [otherChargesList]);
  // Installments
  useEffect(() => {
    setInstallmentsList(installmentsInformation);
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

  // Api calls
  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  useEffect(() => {
    dispatch(
      getVisitorsList({
        project_id: 18,
      }),
    );
    dispatch(
      getUnitInfo({
        project_id: 18,
        tower_id: 1,
      }),
    );
    dispatch(
      getUnitParkingInfo({
        project_id: 18,
      }),
    );
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
  }, []);
  // installments details
  useEffect(() => {
    dispatch(
      getInstallmentDetails({
        project_id: 18,
        payment_scheduled_master_id: installmentId,
      }),
    );
  }, [installmentId]);

  const initialValues = {
    project_id: 18,
    unit_id: 28,
    visitors_id: customerDetails?.id,
    unit_reserved_date: dayjs().format('YYYY-MM-DD'),
    parking_no: unitParkingInfoValues?.map(e => e.id).toString(),
    calculation_method: '',
    basic_rate_no: 1,
    basic_rate_description: 'Basic rate of unit',
    basic_rate_area: unitInfoValues?.super_build_up_area || 0,
    basic_rate: undefined,
    basic_rate_disc_amt: 0,
    basic_rate_disc_per: 0,
    basic_rate_basic_amount: undefined,
    other_charges: oclist.other_charge_unit_rates,
    custom_payment_remark_id: 0,
    custom_payment_remark: terms || '',
    extra_charges: extraCharges,
    gst_per: 0,
    gst_amt: undefined,
    stampduty_per: undefined,
    stampduty_amount: undefined,
    reg_per: undefined,
    reg_amount: undefined,
    taxes_per: undefined,
    taxes_amount: undefined,
    is_loan: isToggle ? 'yes' : 'no',
    loan_amt: undefined,
    bank: 0,
    loan_remarks: undefined,
    installments: _installmentsList.payment_scheduled_details_master,
  };

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
    console.log('🚀 ~ file: BookingForm.tsx:93 ~ handleSubmit ~ values:', values);
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

  const newbaseAmount = 500000;

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

  // govt Taxes
  const gstSyncedFields = useSyncedFields(newbaseAmount, 'gst_amt', 'gst_per', setFieldValue);

  const stampDutySyncedFields = useSyncedFields(
    newbaseAmount,
    'stampduty_amount',
    'stampduty_per',
    setFieldValue,
  );

  const registrationSyncedFields = useSyncedFields(
    newbaseAmount,
    'reg_amount',
    'reg_per',
    setFieldValue,
  );

  const taxesTotalSyncedFields = useSyncedFields(
    newbaseAmount,
    'taxes_amount',
    'taxes_per',
    setFieldValue,
  );

  useEffect(() => {
    const { basic_rate_area = 0, basic_rate = 0 } = values;

    const basic_rate_total = basic_rate_area * basic_rate;
    setBaseAmount(basic_rate_total);
  }, [values]);

  useEffect(() => {
    const { basic_rate_disc_amt = 0 } = values;
    setFieldValue('basic_rate_basic_amount', (baseAmount - basic_rate_disc_amt).toFixed(2));
  }, [baseAmount, setFieldValue, values, values.basic_rate_disc_amt, values.basic_rate_disc_per]);

  useEffect(() => {
    formik.setValues({
      ...formik.values,
      basic_rate: 0,
      basic_rate_disc_amt: 0,
      basic_rate_disc_per: 0,
      basic_rate_basic_amount: 0,
    });
  }, [values.calculation_method]);

  return (
    <>
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
                {formik.values.calculation_method === 'rate_base' ? (
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
                ) : formik.values.calculation_method === 'fixed_amount' ? (
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
                              onChange={handleChange}
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
                              onChange={handleChange}
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
                        <td className="text-right">₹ {handleTotalOtherCharge()}</td>
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
                    <label>Sub Total Amount (Basic Amt + Other Charges)</label>
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
                  <div className="form-group col">
                    <label>Total Discount</label>
                    <input className="form-control" type="text" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col">
                    <label>Discount Remark</label>
                    <textarea className="form-control" rows={3} />
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
                          Other Charges Total
                        </td>
                        <td className="text-right">₹ {handleTotalExtraCharge()}</td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="row w-100 justify-content-end">
                    <button
                      className="Btn btn-lightblue-primary lbps-btn ml-auto mr-0"
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
                          <td>5000000</td>
                        </tr>
                        <tr>
                          <td>Other Charges Total</td>
                          <td>5000000</td>
                        </tr>
                        <tr>
                          <td>Total Discount (Sale Deed Amount)</td>
                          <td>5000000</td>
                        </tr>
                        <tr>
                          <td>Government Taxes Total</td>
                          <td>5000000</td>
                        </tr>
                        <tr>
                          <td>Extra Charges</td>
                          <td>5000000</td>
                        </tr>
                        <tr>
                          <td>Property Final Amount</td>
                          <td>5000000</td>
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
              <input className="form-control" type="number" value={values.loan_amt} id='loan_amt' name='loan_amt' onChange={handleChange} />
            </div>
            <div className="form-group col">
              <label>Bank</label>
              <Select
                      closeMenuOnSelect={true}
                      options={bankListOptions}
                      name='bank'
                      placeholder="Banks List"
                      styles={{
                        container: base => ({
                          ...base,
                          width: '81%',
                          marginTop: 0,
                          marginBottom: 17,
                        
                        }),
                      }}
                      onChange={(e)=>setFieldValue('bank',e.value)}
                    />
            </div>

            {/* 10th section */}
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
                      <th>GST</th>
                      <th className="text-right">Installment Amount</th>
                    </thead>
                    <tbody>
                      {_installmentsList?.payment_scheduled_details_master?.map((e, i) => {
                        return (
                          <tr key={`${i}_${e.id}`}>
                            <td onClick={updateInstallments}>01</td>
                            <td>{e.title}</td>
                            <td>
                              <input className="form-control" type="date" />
                            </td>
                            <td>
                              <input className="form-control" type="text" value={e.percentage} />
                            </td>
                            <td>
                              <input className="form-control" type="text" />
                            </td>
                            <td>
                              <input className="form-control" type="text" />
                            </td>
                            <td>
                              <input className="form-control" type="text" />
                            </td>
                            <td>
                              <input readOnly className="form-control" type="text" />
                            </td>
                          </tr>
                        );
                      })}
                      {/* total */}
                      <tr>
                        <td className="text-right font-weight-bold" colSpan={7}>
                          Installments Total
                        </td>
                        <td className="text-right">₹ 10000000</td>
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
