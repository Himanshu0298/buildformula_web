import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import Loader from 'components/atoms/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getApprovalUnitDetails,
  getBookingApprovalList,
  getVisitorsDetail,
  updateBookingStatus,
} from 'redux/sales';
import { useAppDispatch, useAppSelector } from 'redux/store';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  rejected_remarks: Yup.string().required('Required'),
});

const ApproveBtn = styled(Button)`
  background: rgba(72, 114, 244, 0.1);
  color: #4872f4;
  margin: 5px 20px 0 10px;
  padding: 8px 30px;
  font-size: 16px;
  transition: background-color 0.3s;
  border-radius: 8px;
  box-shadow: none;
  &:hover {
    color: #fff;
    background-color: #4872f4;
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.1);
  }
`;

const RejectBtn = styled(Button)`
  background: rgba(255, 93, 93, 0.2);
  color: #ff5d5d;
  margin: 5px 20px 0 10px;
  padding: 8px 40px;
  font-size: 16px;
  transition: background-color 0.5s;
  border-radius: 8px;
  box-shadow: none;
  &:hover {
    background-color: #ff5d5d;
    color: #fff;
    box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CommonContainer = styled(Paper)`
  padding: 22px;
  margin-top: 20px;
  margin-left: 40px;
  margin-right: 40px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  box-shadow: none;
`;

const Heading = styled(Typography)`
  color: #4872f4;
  margin-bottom: 22px;
  font-size: 1.25rem;
  border-bottom: 0.5px solid #d7d3d373;
  padding-bottom: 12px;
`;

const Label = styled(Typography)`
  color: #adb0c1;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.6;
`;

const Value = styled(Typography)`
  font-size: 1.25rem;
  color: #041d36;
  margin-bottom: 8px;
`;

const CustomerDetails = ({ customerData, brokerData }) => {
  const { first_name, last_name, email, phone } = customerData?.visitors || {};
  const throughBroker = brokerData?.booking_form_list?.through_broker === 'yes';

  if (!(first_name || last_name || email || phone || throughBroker)) {
    return null;
  }

  return (
    <CommonContainer elevation={0}>
      <Heading>CUSTOMER DETAILS</Heading>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Label>First Name</Label>
          <Value>{first_name}</Value>
        </Grid>
        <Grid item xs={3}>
          <Label>Last Name</Label>
          <Value>{last_name}</Value>
        </Grid>
        <Grid item xs={3}>
          <Label>Email</Label>
          <Value>{email}</Value>
        </Grid>
        <Grid item xs={3}>
          <Label>Phone</Label>
          <Value>{phone}</Value>
        </Grid>
        <Grid item xs={3}>
          <Label>Through Broker?</Label>
          <Value>{throughBroker ? 'Yes' : 'No'}</Value>
        </Grid>
      </Grid>
    </CommonContainer>
  );
};

const BrokerDetails = ({ brokerData }) => {
  const {
    broker_first_name,
    broker_last_name,
    broker_email,
    broker_phone,
    brokerage,
    broker_remark,
  } = brokerData?.booking_form_list || {};

  if (
    broker_first_name ||
    broker_last_name ||
    broker_email ||
    broker_phone ||
    brokerage ||
    broker_remark
  ) {
    return (
      <CommonContainer>
        <Heading>BROKER DETAILS</Heading>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Label>First Name</Label>
            <Value>{broker_first_name}</Value>
          </Grid>
          <Grid item xs={3}>
            <Label>Last Name</Label>
            <Value>{broker_last_name}</Value>
          </Grid>
          <Grid item xs={3}>
            <Label>Email</Label>
            <Value>{broker_email}</Value>
          </Grid>
          <Grid item xs={3}>
            <Label>Phone</Label>
            <Value>{broker_phone}</Value>
          </Grid>
          <Grid item xs={6}>
            <Label>Brokerage</Label>
            <Value>₹ {brokerage}</Value>
          </Grid>
          <Grid item xs={6}>
            <Label>Brokerage Remark</Label>
            <Value>{broker_remark}</Value>
          </Grid>
        </Grid>
      </CommonContainer>
    );
  }
  return null;
};

const OwnershipDetails = ({ ownerShipData }) => {
  const ownership = ownerShipData?.booking_form_list?.ownership || [];

  if (ownership.length === 0) {
    return null;
  }

  return (
    <CommonContainer>
      <Typography component="div" sx={{ color: '#4872f4', mb: 2 }} variant="h6">
        OWNERSHIP DETAILS
      </Typography>
      {ownership?.map((ownershipItem, index) => (
        <Grid key={index} container spacing={1}>
          <Grid item xs={2}>
            <Typography gutterBottom color="textSecondary" variant="h6">
              Sr.No
            </Typography>
            <Value>{index + 1}</Value>
          </Grid>
          <Grid item xs={2}>
            <Typography gutterBottom color="textSecondary" variant="h6">
              Name
            </Typography>
            <Value>{ownershipItem.ownership_customer_first_name}</Value>
          </Grid>
          <Grid item xs={2}>
            <Typography color="textSecondary" style={{ marginBottom: 20 }} variant="h6">
              Phone
            </Typography>
            <Value>+91{ownershipItem.ownership_customer_phone}</Value>
          </Grid>
          <Grid item xs={2}>
            <Typography color="textSecondary" variant="h6">
              Email
            </Typography>
            <Value>{ownershipItem.ownership_customer_email}</Value>
          </Grid>
          <Grid item xs={2}>
            <Typography color="textSecondary" variant="h6">
              Pan
            </Typography>
            <Value>{ownershipItem.ownership_customer_pan}</Value>
          </Grid>
          <Grid item xs={2}>
            <Typography color="textSecondary" variant="h6">
              Aadhar
            </Typography>
            <Value>{ownershipItem.ownership_customer_aadhar}</Value>
          </Grid>
        </Grid>
      ))}
    </CommonContainer>
  );
};

const UnitInfo = ({ unitInfoData }) => {
  const { unit_reserved_date, unit_info, super_build_up_area, terracearea, parking_no } =
    unitInfoData?.booking_form_list || {};

  if (!(unit_reserved_date || unit_info || super_build_up_area || terracearea || parking_no)) {
    return null;
  }

  return (
    <CommonContainer>
      <div>
        <Typography component="div" style={{ color: '#4872f4' }} sx={{ mb: 2 }} variant="h6">
          UNIT INFO
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Label>Unit Reservation Date</Label>
            <Value>{unit_reserved_date}</Value>
          </Grid>
          <Grid item xs={2}>
            <Label>Unit Info</Label>
            <Value>{unit_info}</Value>
          </Grid>
          <Grid item xs={2}>
            <Label>Super Buildup Area</Label>
            <Value>{super_build_up_area}</Value>
          </Grid>
          <Grid item xs={2}>
            <Label>Terrace Area</Label>
            <Value>{terracearea}</Value>
          </Grid>
          <Grid item xs={2}>
            <Label>Car Parking No</Label>
            <Value>{parking_no}</Value>
          </Grid>
        </Grid>
      </div>
    </CommonContainer>
  );
};

const CalculationMethod = ({ calcMethodData }) => {
  const {
    calculation_method,
    basic_rate,
    basic_rate_area,
    basic_rate_basic_amount,
    basic_rate_description,
    basic_rate_disc_amt,
    basic_rate_disc_per,
    basic_rate_no,
  } = calcMethodData?.booking_form_list || {};

  if (
    !(
      calculation_method ||
      basic_rate ||
      basic_rate_area ||
      basic_rate_basic_amount ||
      basic_rate_description ||
      basic_rate_disc_amt ||
      basic_rate_disc_per ||
      basic_rate_no
    )
  ) {
    return null;
  }
  return (
    <CommonContainer>
      <Heading>CALCULATION METHOD</Heading>

      <div>
        <Label>Calculation Method</Label>
        <Value>{calculation_method}</Value>
      </div>
      <div style={{ maxWidth: '100%' }}>
        <Divider />
      </div>
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={1}>
          <Label>Sr.No</Label>
          <Value>{basic_rate_no}</Value>
        </Grid>
        <Grid item xs={3}>
          <Label>Description</Label>
          <Value>{basic_rate_description}</Value>
        </Grid>
        <Grid item xs={2}>
          <Label>Area</Label>
          <Value>{basic_rate_area}</Value>
        </Grid>
        <Grid item xs={2}>
          <Label>Rate</Label>
          <Value>{basic_rate}</Value>
        </Grid>
        <Grid item style={{ display: 'flex', flexDirection: 'column' }} xs={2}>
          <Label>Discount Amt</Label>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Value>{basic_rate_disc_amt}</Value>
            <Typography color="#949DB8" style={{ marginLeft: 5 }} variant="body1">
              ({basic_rate_disc_per}%)
            </Typography>
          </div>
        </Grid>
        <Grid item xs={2}>
          <Label>Total Basic Amount</Label>
          <Value>{basic_rate_basic_amount}</Value>
        </Grid>
      </Grid>
    </CommonContainer>
  );
};

const OtherCharges = ({ otherChargesData }) => {
  const otherCharges = otherChargesData?.booking_form_list?.othercharge || [];

  const { other_charges_total } = otherChargesData?.booking_form_list || {};

  if (otherCharges.length === 0) {
    return null;
  }

  return (
    <CommonContainer>
      <div>
        <Typography component="div" style={{ color: '#4872f4' }} sx={{ mb: 2 }} variant="h6">
          OTHER CHARGES
        </Typography>

        {otherCharges.map((otherCharge, index) => (
          <div key={index}>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              <Grid item xs={1}>
                <Label>Sr.No</Label>
                <Value>{otherCharge.other_charges_no}</Value>
              </Grid>
              <Grid item xs={2}>
                <Label>Title</Label>
                <Value>{otherCharge.other_charges_title}</Value>
              </Grid>
              <Grid item xs={2}>
                <Label>Distribution Method</Label>
                <Value>{otherCharge.other_charges_distribution_method}</Value>
              </Grid>
              <Grid item xs={2}>
                <Label>Area</Label>
                <Value>{otherCharge.other_charges_area}</Value>
              </Grid>
              <Grid item xs={2}>
                <Label>Rate</Label>
                <Value>{otherCharge.other_charges_rate}</Value>
              </Grid>
              <Grid item style={{ display: 'flex', flexDirection: 'column' }} xs={2}>
                <Label>Discount Amt</Label>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Value>{otherCharge.other_charges_disc_amt}</Value>
                  <Typography color="grey" style={{ marginLeft: 5 }} variant="body1">
                    ({otherCharge.other_charges_disc_per}%)
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
                <Label>Amount</Label>
                <Value>{otherCharge.other_charges_amount}</Value>
              </Grid>
            </Grid>

            <div style={{ maxWidth: '100%' }}>
              <Divider />
            </div>
          </div>
        ))}

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div>
            <Typography align="center" color="#949DB8" sx={{ mt: 3 }} variant="body1">
              Other Charges Total
            </Typography>
          </div>
          <div>
            <Typography align="center" sx={{ ml: 2, mt: 3 }} variant="body1">
              ₹{other_charges_total}
            </Typography>
          </div>
          <div style={{ maxWidth: '100%' }}>
            <Divider />
          </div>
        </div>
      </div>
    </CommonContainer>
  );
};

const OverallDiscount = ({ overAllDiscountData }) => {
  const { disc_remarks, total_disc } = overAllDiscountData?.booking_form_list || {};

  if (!(disc_remarks || total_disc)) {
    return null;
  }
  return (
    <CommonContainer>
      <div>
        <Typography component="div" style={{ color: '#4872f4', marginBottom: 20 }} variant="h6">
          OVERALL DISCOUNT
        </Typography>

        <div>
          <Label>Total Discount</Label>
          <Value>{total_disc}</Value>
        </div>
        <div>
          <Label>Discount Remark</Label>
          <Value>{disc_remarks}</Value>
        </div>
      </div>
    </CommonContainer>
  );
};

const GovernmentTaxes = ({ govtTaxesData }) => {
  const {
    total_gove_tax,
    gst_amt,
    gst_per,
    stampduty_amount,
    stampduty_per,
    reg_amount,
    reg_per,
    sub_total_amt,
  } = govtTaxesData?.booking_form_list || {};

  if (
    !(
      total_gove_tax ||
      gst_amt ||
      gst_per ||
      stampduty_amount ||
      stampduty_per ||
      reg_amount ||
      reg_per ||
      sub_total_amt
    )
  ) {
    return null;
  }
  return (
    <CommonContainer>
      <div>
        <Typography component="div" style={{ color: '#4872f4', marginBottom: 20 }} variant="h6">
          GOVERNMENT TAXES
        </Typography>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Label>Sub Total and Amount</Label>
          <Typography color="#949DB8" style={{ marginLeft: 7, marginTop: 5 }} variant="body1">
            (Basic Amt + Other Charges)
          </Typography>
        </div>
        <Typography sx={{ mb: 2 }} variant="body1">
          {sub_total_amt}
        </Typography>
      </div>
      <div style={{ maxWidth: '100%' }}>
        <Divider />
      </div>

      <div>
        <Grid container spacing={1} sx={{ marginTop: 1 }}>
          <Grid item xs={2}>
            <Label>GST</Label>
          </Grid>
          <Grid item xs={2}>
            <Typography color="#949DB8" style={{ marginBottom: '20px' }} variant="h6">
              %
            </Typography>
            <Value>{gst_per}</Value>
          </Grid>
          <Grid item xs={2}>
            <Label>Amt</Label>
            <Value>RS.{gst_amt}</Value>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ marginTop: 1 }}>
          <Grid item xs={2}>
            <Label>Stamp Duty</Label>
          </Grid>
          <Grid item xs={2}>
            <Typography color="#949DB8" style={{ marginBottom: '20px' }} variant="h6">
              %
            </Typography>
            <Value>{stampduty_per}</Value>
          </Grid>
          <Grid item xs={2}>
            <Label>Amt</Label>
            <Value>RS.{stampduty_amount}</Value>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ marginTop: 1 }}>
          <Grid item xs={2}>
            <Label>Registration</Label>
          </Grid>
          <Grid item xs={2}>
            <Typography color="#949DB8" style={{ marginBottom: '20px' }} variant="h6">
              %
            </Typography>
            <Value>{reg_per}</Value>
          </Grid>
          <Grid item xs={2}>
            <Label>Amt</Label>
            <Value>RS.{reg_amount}</Value>
          </Grid>
        </Grid>
      </div>
      <div style={{ maxWidth: '100%' }}>
        <Divider />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <Typography align="center" color="#949DB8" sx={{ mb: 2, mt: 2 }} variant="h6">
            Total Taxes
          </Typography>
        </div>
        <div>
          <Typography align="center" sx={{ ml: 2, mb: 2, mt: 2 }} variant="body1">
            ₹{total_gove_tax}
          </Typography>
        </div>
      </div>
      <div style={{ maxWidth: '100%' }}>
        <Divider />
      </div>
    </CommonContainer>
  );
};

const ExtraCharges = ({ extraChargesData }) => {
  const extraCharges = extraChargesData?.booking_form_list?.extracharges || [];

  const { extra_charges_total } = extraChargesData?.booking_form_list || {};

  if (extraCharges.length === 0) {
    return null;
  }

  return (
    <CommonContainer>
      <Typography component="div" style={{ color: '#4872f4' }} sx={{ mb: 2 }} variant="h6">
        EXTRA CHARGES
      </Typography>

      {extraCharges.map((extraCharge, index) => (
        <div key={index}>
          <Grid key={index} container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={2}>
              <Label>Sr.No</Label>
              <Value>{extraCharge.extra_charges_no}</Value>
            </Grid>
            <Grid item xs={2}>
              <Label>Description</Label>
              <Value>{extraCharge.extra_charges_title}</Value>
            </Grid>
            <Grid item xs={2}>
              <Label>Distribution Method</Label>
              <Value>{extraCharge.extra_charges_distribution_method}</Value>
            </Grid>
            <Grid item xs={2}>
              <Label>Area</Label>
              <Value>{extraCharge.extra_charges_area}</Value>
            </Grid>
            <Grid item xs={2}>
              <Label>Rate</Label>
              <Value>{extraCharge.extra_charges_rate}</Value>
            </Grid>
            <Grid item style={{ display: 'flex', flexDirection: 'column' }} xs={2}>
              <Label>Discount Amt</Label>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Value>{extraCharge.extra_charges_disc_amt}</Value>
                <Typography color="#949DB8" style={{ marginLeft: 5 }} variant="body1">
                  ({extraCharge.extra_charges_disc_per}%)
                </Typography>
              </div>
            </Grid>
            <Grid item xs={2}>
              <Label>Amount</Label>
              <Value>{extraCharge.extra_charges_amt}</Value>
            </Grid>
          </Grid>
          <div>
            <div style={{ maxWidth: '100%' }}>
              <Divider />
            </div>
          </div>
        </div>
      ))}

      <div style={{ maxWidth: '100%' }}>
        <Divider />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <Typography align="center" color="#949DB8" sx={{ mt: 3 }} variant="body1">
            Extra Charges Total
          </Typography>
        </div>
        <div>
          {/* Calculate the total amount for extra charges here */}
          <Typography align="center" sx={{ ml: 2, mt: 3 }} variant="body1">
            ₹{extra_charges_total}
          </Typography>
        </div>
      </div>
    </CommonContainer>
  );
};

const Summary = ({ summaryData }) => {
  const {
    basic_rate_basic_amount,
    other_charges_total,
    total_disc,
    total_gove_tax,
    extra_charges_total,
    property_final_amount,
  } = summaryData?.booking_form_list || {};

  if (
    !(
      basic_rate_basic_amount ||
      other_charges_total ||
      total_disc ||
      total_gove_tax ||
      extra_charges_total ||
      property_final_amount
    )
  ) {
    return null;
  }
  return (
    <CommonContainer>
      <Typography component="div" style={{ color: '#4872f4', marginBottom: 20 }} variant="h6">
        SUMMARY
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item style={{ flex: 1 }} xs={2}>
          <Typography gutterBottom variant="body1">
            Basic Amount
          </Typography>
        </Grid>
        <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography color="#28a745" style={{ marginRight: 30 }} variant="body1">
              (+)
            </Typography>
            <Typography color="green" variant="body1">
              ₹
            </Typography>
            <Typography color="green" style={{ marginLeft: 20 }} variant="body1">
              {basic_rate_basic_amount}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <div style={{ maxWidth: '100%', marginTop: 10, marginBottom: 10 }}>
        <Divider />
      </div>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item style={{ flex: 1 }} xs={2}>
          <Typography gutterBottom variant="body1">
            Other Charges Total
          </Typography>
        </Grid>
        <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography color="#28a745" style={{ marginRight: 30 }} variant="body1">
              (+)
            </Typography>
            <Typography color="green" variant="body1">
              ₹
            </Typography>
            <Typography color="green" style={{ marginLeft: 20 }} variant="body1">
              {other_charges_total}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <div style={{ maxWidth: '100%', marginTop: 10, marginBottom: 10 }}>
        <Divider />
      </div>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item style={{ flex: 1 }} xs={2}>
          <Typography gutterBottom variant="body1">
            Total Discount
          </Typography>
        </Grid>
        <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography color="red" style={{ marginRight: 30 }} variant="body1">
              (-)
            </Typography>
            <Typography color="red" variant="body1">
              ₹
            </Typography>
            <Typography color="red" style={{ marginLeft: 20 }} variant="body1">
              {total_disc}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <div style={{ maxWidth: '100%', marginTop: 10, marginBottom: 10 }}>
        <Divider />
      </div>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item style={{ flex: 1 }} xs={2}>
          <Typography gutterBottom variant="body1">
            Government Taxes Total
          </Typography>
        </Grid>
        <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography color="#28a745" style={{ marginRight: 30 }} variant="body1">
              (+)
            </Typography>
            <Typography color="green" variant="body1">
              ₹
            </Typography>
            <Typography color="green" style={{ marginLeft: 20 }} variant="body1">
              {total_gove_tax}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <div style={{ maxWidth: '100%', marginTop: 10, marginBottom: 10 }}>
        <Divider />
      </div>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item style={{ flex: 1 }} xs={2}>
          <Typography gutterBottom variant="body1">
            Extra Charges
          </Typography>
        </Grid>
        <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography color="#28a745" style={{ marginRight: 30 }} variant="body1">
              (+)
            </Typography>
            <Typography color="green" variant="body1">
              ₹
            </Typography>
            <Typography color="green" style={{ marginLeft: 20 }} variant="body1">
              {extra_charges_total}
            </Typography>
          </div>
        </Grid>
      </Grid>

      <div style={{ maxWidth: '100%', marginTop: 10, marginBottom: 10 }}>
        <Divider />
      </div>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item style={{ flex: 1 }} xs={2}>
          <Typography gutterBottom variant="body1">
            Property Final Amount
          </Typography>
        </Grid>
        <Grid item style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Typography color="#28a745" style={{ marginRight: 30 }} variant="body1">
              (+)
            </Typography>
            <Typography color="green" variant="body1">
              ₹
            </Typography>
            <Typography color="green" style={{ marginLeft: 20 }} variant="body1">
              {property_final_amount}
            </Typography>
          </div>
        </Grid>
      </Grid>
      <div style={{ maxWidth: '100%', marginTop: 10, marginBottom: 10 }}>
        <Divider />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          maxWidth: '32.5%',
        }}
      >
        <div style={{ maxWidth: '100%', marginTop: 10, marginBottom: 10 }}>
          <Divider />
        </div>
      </div>
    </CommonContainer>
  );
};

const LoanDetail = ({ loanData }) => {
  const { is_loan, loan_amt, loan_remarks } = loanData?.booking_form_list || {};

  return (
    <CommonContainer>
      <Typography component="div" style={{ color: '#4872f4' }} sx={{ mb: 2 }} variant="h6">
        LOAN DETAILS
      </Typography>
      <div>
        <Label>Loan Taken</Label>
        <Value>{is_loan === 'yes' ? 'Yes' : 'No'}</Value>
        {is_loan === 'yes' && (
          <>
            <Label>Loan Amount</Label>
            <Value>{loan_amt}</Value>
            <Label>Loan Remark</Label>
            <Value>{loan_remarks}</Value>
          </>
        )}
      </div>
    </CommonContainer>
  );
};

const TermsandCondition = ({ TearmsAndConditionData }) => {
  const { custom_payment_remark } = TearmsAndConditionData?.booking_form_list || {};

  if (!custom_payment_remark) {
    return null;
  }

  return (
    <CommonContainer>
      <div>
        <Typography component="div" style={{ color: '#4872f4' }} sx={{ mb: 2 }} variant="h6">
          TERMS & CONDITION
        </Typography>
        <Typography gutterBottom variant="h6">
          {custom_payment_remark}
        </Typography>
      </div>
    </CommonContainer>
  );
};

const BookingPreview = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const { bookingid: project_bookings_temp_id, unitid: unit_id, project_id } = location.state || {};
  const { approvalBookingDetails, visitorDetail, loading } = useAppSelector(s => s.sales);

  const visitor_id = approvalBookingDetails?.booking_form_list?.visitors_id || 0;
  const [isRejectDialogVisible, setRejectDialogVisible] = useState(false);

  // const [rejectedRemarks, setRejectedRemarks] = useState<IbookingApprovedReject>();

  const toggleRejectDialog = () => {
    setRejectDialogVisible(prevVisible => !prevVisible);
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(
      getApprovalUnitDetails({
        project_id,
        project_bookings_temp_id,
        unit_id,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(
      getVisitorsDetail({
        visitor_id,
        project_id,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitor_id]);

  const formStatus = approvalBookingDetails?.booking_form_list?.is_approved;

  const handleStatusUpdate = async (status, rejected_remarks = '') => {
    await dispatch(
      updateBookingStatus({
        project_id,
        unit_id,
        project_bookings_temp_id,
        is_approved: status,
        rejected_remarks,
      }),
    );

    await dispatch(
      getBookingApprovalList({
        project_id,
      }),
    );

    await toggleRejectDialog();
    await navigate(-1);
  };

  const handleFormSubmit = (values, setSubmitting, status) => {
    const { rejected_remarks } = values || {};
    setTimeout(async () => {
      await handleStatusUpdate(status, rejected_remarks);

      await setSubmitting(false);
    }, 400);
  };

  return (
    <>
      <Loader loading={loading} />
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, marginLeft: 40 }}>
        <IconButton style={{ backgroundColor: '#e5eafa', color: '#4872f4' }} onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          component="h2"
          style={{ marginLeft: 12, marginBottom: 5, marginTop: 10, paddingLeft: 10 }}
          variant="h4"
        >
          Booking Preview
        </Typography>
      </div>
      {/* Section 1: Customer Details */}
      <CustomerDetails brokerData={approvalBookingDetails} customerData={visitorDetail} />

      {/* Section 2: Broker Details */}
      <BrokerDetails brokerData={approvalBookingDetails} />

      {/* Section 3: Ownership Details */}
      <OwnershipDetails ownerShipData={approvalBookingDetails} />

      {/* Section 4: Unit Info */}
      <UnitInfo unitInfoData={approvalBookingDetails} />

      {/* Section 5: Calculation Method */}
      <CalculationMethod calcMethodData={approvalBookingDetails} />

      {/* Section 6: Other Charges */}
      <OtherCharges otherChargesData={approvalBookingDetails} />

      {/* Section 7: Overall Discount */}
      <OverallDiscount overAllDiscountData={approvalBookingDetails} />

      {/* Section 8: Government Taxes */}
      <GovernmentTaxes govtTaxesData={approvalBookingDetails} />

      {/* Section 9: Extra Charges */}
      <ExtraCharges extraChargesData={approvalBookingDetails} />

      {/* Section 12: Summary */}
      <Summary summaryData={approvalBookingDetails} />

      {/* Section 10: Loan Details */}
      <LoanDetail loanData={approvalBookingDetails} />

      {/* Section 11: Terms And Condition */}
      <TermsandCondition TearmsAndConditionData={approvalBookingDetails} />

      {formStatus === 'pending' ? (
        <div style={styles.btnWrapper}>
          <div>
            <ApproveBtn variant="contained" onClick={() => handleStatusUpdate('approved')}>
              Approve
            </ApproveBtn>
          </div>
          <div>
            <RejectBtn variant="contained" onClick={toggleRejectDialog}>
              Reject
            </RejectBtn>
          </div>
        </div>
      ) : null}
      {isRejectDialogVisible ? (
        <Dialog open={isRejectDialogVisible} onClose={toggleRejectDialog}>
          <DialogTitle className="pb-0">Reject Booking Form</DialogTitle>
          <DialogContent>
            <Formik
              enableReinitialize
              initialValues={{ rejected_remarks: '' }}
              validateOnBlur={false}
              validateOnChange={false}
              validationSchema={schema}
              onSubmit={(values, { setSubmitting }) =>
                handleFormSubmit(values, setSubmitting, 'rejected')
              }
            >
              {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className="my-3"
                    label="Reject Remarks"
                    name="rejected_remarks"
                    placeholder="Enter Remarks"
                    value={values.rejected_remarks}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <Box className="mt-2">
                    <RejectBtn
                      className="ml-0"
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                    >
                      Reject
                    </RejectBtn>
                    <ApproveBtn variant="contained" onClick={toggleRejectDialog}>
                      Cancel
                    </ApproveBtn>
                  </Box>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};

const styles = {
  btnWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '20px 30px',
  },
};

export default BookingPreview;
