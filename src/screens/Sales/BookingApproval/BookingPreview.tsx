import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
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
import { HTML_REGEX } from 'utils/constant';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  // rejected_remarks: Yup.string().required('Required'),
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
  font-size: 1.1rem;
  color: #041d36;
  margin-bottom: 8px;
`;

const TotalRow = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #4872f4;
  color: #fff;
  padding: 5px;
  border-radius: 6px;
  gap: 10px;
  .totalTitle {
    color: #fff;
    font-size: 18px;
  }
  .totalAmount {
    color: #fff;
    font-weight: 600;
    font-size: 18px;
  }
`;

const CustomerDetails = ({ customerData, brokerData }) => {
  const { first_name, last_name, email, phone } = customerData?.visitors || {};
  const throughBroker = brokerData?.booking_form_list?.through_broker === 'yes';

  return (
    <CommonContainer elevation={0}>
      <Heading>CUSTOMER DETAILS</Heading>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Label>First Name</Label>
          <Value>{first_name || '-'}</Value>
        </Grid>
        <Grid item xs={3}>
          <Label>Last Name</Label>
          <Value>{last_name || '-'}</Value>
        </Grid>
        <Grid item xs={3}>
          <Label>Email</Label>
          <Value>{email || '-'}</Value>
        </Grid>
        <Grid item xs={3}>
          <Label>Phone</Label>
          <Value>{phone || '-'}</Value>
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

  return (
    <CommonContainer>
      <Heading>BROKER DETAILS</Heading>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Label>First Name</Label>
          <Value>{broker_first_name || '-'}</Value>
        </Grid>
        <Grid item xs={3}>
          <Label>Last Name</Label>
          <Value>{broker_last_name || '-'}</Value>
        </Grid>
        <Grid item xs={3}>
          <Label>Email</Label>
          <Value>{broker_email || '-'}</Value>
        </Grid>
        <Grid item xs={3}>
          <Label>Phone</Label>
          <Value>{broker_phone || '-'}</Value>
        </Grid>
        <Grid item xs={6}>
          <Label>Brokerage</Label>
          <Value>₹ {brokerage || '-'}</Value>
        </Grid>
        <Grid item xs={6}>
          <Label>Brokerage Remark</Label>
          <Value>{broker_remark || '-'}</Value>
        </Grid>
      </Grid>
    </CommonContainer>
  );
};

const OwnershipDetails = ({ ownerShipData }) => {
  const ownership = ownerShipData?.booking_form_list?.ownership || [];

  if (ownership.length === 0) {
    return null;
  }

  return (
    <CommonContainer>
      <Heading>OWNERSHIP DETAILS</Heading>
      {ownership?.map((ownershipItem, index) => {
        const {
          ownership_customer_first_name,
          ownership_customer_phone,
          ownership_customer_email,
          ownership_customer_pan,
          ownership_customer_aadhar,
        } = ownershipItem || {};

        return (
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
              <Value>{ownership_customer_first_name || '-'}</Value>
            </Grid>
            <Grid item xs={2}>
              <Typography color="textSecondary" style={{ marginBottom: 20 }} variant="h6">
                Phone
              </Typography>
              <Value>+91{ownership_customer_phone || '-'}</Value>
            </Grid>
            <Grid item xs={2}>
              <Typography color="textSecondary" variant="h6">
                Email
              </Typography>
              <Value>{ownership_customer_email || '-'}</Value>
            </Grid>
            <Grid item xs={2}>
              <Typography color="textSecondary" variant="h6">
                Pan
              </Typography>
              <Value>{ownership_customer_pan || '-'}</Value>
            </Grid>
            <Grid item xs={2}>
              <Typography color="textSecondary" variant="h6">
                Aadhar
              </Typography>
              <Value>{ownership_customer_aadhar || '-'}</Value>
            </Grid>
          </Grid>
        );
      })}
    </CommonContainer>
  );
};

const UnitInfo = ({ unitInfoData }) => {
  const { unit_reserved_date, unit_info, super_build_up_area, terracearea, parking_no } =
    unitInfoData?.booking_form_list || {};

  return (
    <CommonContainer>
      <Heading>UNIT INFO</Heading>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Label>Unit Reservation Date</Label>
          <Value>{unit_reserved_date}</Value>
        </Grid>
        <Grid item xs={2}>
          <Label>Unit Info</Label>
          <Value>{unit_info?.replace(HTML_REGEX, '')}</Value>
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

  const calculationMethod = calculation_method === 'fixied_amt' ? 'Fixed Amount' : 'Rate Based'

  const _basic_rate_area = calculation_method === 'fixied_amt' ? '-' : basic_rate_area;

  return (
    <CommonContainer>
      <Heading>CALCULATION METHOD</Heading>

      <div>
        <Label>Calculation Method</Label>
        <Value>{calculationMethod}</Value>
      </div>
      <div style={{ maxWidth: '100%' }}>
        <Divider />
      </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Label>Sr.No</Label>
            </TableCell>
            <TableCell>
              <Label>Description</Label>
            </TableCell>
            <TableCell>
              <Label>Area</Label>
            </TableCell>
            <TableCell>
              <Label>Rate</Label>
            </TableCell>
            <TableCell>
              <Label>Discount Amt</Label>
            </TableCell>
            <TableCell>
              <Label>Total Basic Amount</Label>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Value>{basic_rate_no}</Value>
            </TableCell>
            <TableCell>
              <Value>{basic_rate_description}</Value>
            </TableCell>
            <TableCell>
              <Value>{_basic_rate_area}</Value>
            </TableCell>
            <TableCell>
              <Value>{basic_rate}</Value>
            </TableCell>
            <TableCell>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Value>{basic_rate_disc_amt}</Value>
                <Typography color="#949DB8" style={{ marginLeft: 5 }} variant="body1">
                  ({basic_rate_disc_per}%)
                </Typography>
              </div>
            </TableCell>
            <TableCell>
              <Value>{basic_rate_basic_amount}</Value>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CommonContainer>
  );
};

const OtherCharges = ({ otherChargesData }) => {
  const otherCharges = otherChargesData?.booking_form_list?.othercharge || [];

  const { other_charges_total } = otherChargesData?.booking_form_list || {};

  return (
    <CommonContainer>
      <Heading>OTHER CHARGES</Heading>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Label>Sr.No</Label>
            </TableCell>
            <TableCell>
              <Label>Title</Label>
            </TableCell>
            <TableCell>
              <Label>Distribution Method</Label>
            </TableCell>
            <TableCell>
              <Label>Area</Label>
            </TableCell>
            <TableCell>
              <Label>Rate</Label>
            </TableCell>
            <TableCell>
              <Label>Discount Amt</Label>
            </TableCell>
            <TableCell>
              <Label>Total Amount</Label>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {otherCharges?.map(otherCharge => {
            const {
              other_charges_no,
              other_charges_title,
              other_charges_distribution_method,
              other_charges_area,
              other_charges_rate,
              other_charges_disc_amt,
              other_charges_disc_per,
              other_charges_amount,
            } = otherCharge || {};

            return (
              <TableRow key={other_charges_no}>
                <TableCell>
                  <Value>{other_charges_no}</Value>
                </TableCell>
                <TableCell>
                  <Value>{other_charges_title}</Value>
                </TableCell>
                <TableCell>
                  <Value>{other_charges_distribution_method}</Value>
                </TableCell>
                <TableCell>
                  <Value>{other_charges_area}</Value>
                </TableCell>
                <TableCell>
                  <Value>₹ {other_charges_rate}</Value>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Value>₹ {other_charges_disc_amt}</Value>
                    <Typography color="#949DB8" style={{ marginLeft: 5 }} variant="body1">
                      ({other_charges_disc_per} %)
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <Value>₹ {other_charges_amount}</Value>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <TotalRow>
        <Typography className="totalTitle">Other Charges Total</Typography>
        <Typography className="totalAmount"> ₹ {other_charges_total}</Typography>
      </TotalRow>
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
          <Value>₹ {total_disc}</Value>
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

  return (
    <CommonContainer>
      <Heading>GOVERNMENT TAXES</Heading>
      <Box className="d-flex flex-row align-item-center">
        <Label>Sub Total and Amount</Label>
        <Typography className="ml-2" color="#949DB8" variant="caption">
          (Basic Amt + Other Charges)
        </Typography>
      </Box>
      <Value>₹ {sub_total_amt}</Value>

      <Grid container spacing={1} sx={{ marginTop: 1 }}>
        <Grid item xs={1}>
          <Label>&nbsp;</Label>
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
          <Value>₹ {gst_amt}</Value>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ marginTop: 1 }}>
        <Grid item xs={1}>
          <Label>&nbsp;</Label>
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
          <Value>₹ {stampduty_amount}</Value>
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ marginTop: 1 }}>
        <Grid item xs={1}>
          <Label>&nbsp;</Label>
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
          <Value>₹ {reg_amount}</Value>
        </Grid>
      </Grid>

      <TotalRow>
        <Typography className="totalTitle">Total Taxes</Typography>
        <Typography className="totalAmount"> ₹ {total_gove_tax}</Typography>
      </TotalRow>
    </CommonContainer>
  );
};

const ExtraCharges = ({ extraChargesData }) => {
  const extraCharges = extraChargesData?.booking_form_list?.extracharges || [];

  const { extra_charges_total } = extraChargesData?.booking_form_list || {};

  return (
    <CommonContainer>
      <Heading>EXTRA CHARGES</Heading>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Label>Sr.No</Label>
            </TableCell>
            <TableCell>
              <Label>Title</Label>
            </TableCell>
            <TableCell>
              <Label>Distribution Method</Label>
            </TableCell>
            <TableCell>
              <Label>Area</Label>
            </TableCell>
            <TableCell>
              <Label>Rate</Label>
            </TableCell>
            <TableCell>
              <Label>Discount Amt</Label>
            </TableCell>
            <TableCell>
              <Label>Total Amount</Label>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {extraCharges?.map(otherCharge => {
            const {
              extra_charges_no,
              extra_charges_title,
              extra_charges_distribution_method,
              extra_charges_area,
              extra_charges_rate,
              extra_charges_disc_amt,
              extra_charges_disc_per,
              extra_charges_amt,
            } = otherCharge || {};

            return (
              <TableRow key={extra_charges_no}>
                <TableCell>
                  <Value>{extra_charges_no}</Value>
                </TableCell>
                <TableCell>
                  <Value>{extra_charges_title}</Value>
                </TableCell>
                <TableCell>
                  <Value>{extra_charges_distribution_method}</Value>
                </TableCell>
                <TableCell>
                  <Value>{extra_charges_area}</Value>
                </TableCell>
                <TableCell>
                  <Value>₹ {extra_charges_rate}</Value>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Value>₹ {extra_charges_disc_amt}</Value>
                    <Typography color="#949DB8" style={{ marginLeft: 5 }} variant="body1">
                      ({extra_charges_disc_per} %)
                    </Typography>
                  </div>
                </TableCell>
                <TableCell>
                  <Value>₹ {extra_charges_amt}</Value>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <TotalRow>
        <Typography className="totalTitle">Extra Charges Total</Typography>
        <Typography className="totalAmount"> ₹ {extra_charges_total}</Typography>
      </TotalRow>
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

  return (
    <CommonContainer>
      <Heading>SUMMARY</Heading>

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
    </CommonContainer>
  );
};

const LoanDetail = ({ loanData }) => {
  const { is_loan, loan_amt, loan_remarks, bank } = loanData?.booking_form_list || {};

  return (
    <CommonContainer>
      <Heading>LOAN DETAILS</Heading>

      <Label>Loan Taken</Label>
      <Value>{is_loan === 'yes' ? 'Yes' : 'No'}</Value>
      {is_loan === 'yes' && (
        <>
          <Label>Loan Amount</Label>
          <Value>{loan_amt}</Value>

          <Label>Bank</Label>
          <Value>{bank}</Value>

          <Label>Loan Remark</Label>
          <Value>{loan_remarks}</Value>
        </>
      )}
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
      <Heading>TERMS & CONDITION</Heading>
      <Typography gutterBottom variant="h6">
        {custom_payment_remark}
      </Typography>
    </CommonContainer>
  );
};

const BookingPreview = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isRejectDialogVisible, setRejectDialogVisible] = useState(false);

  const location = useLocation();
  const { bookingid: project_bookings_temp_id, unitid: unit_id, project_id } = location.state || {};
  const { approvalBookingDetails, visitorDetail, loading } = useAppSelector(s => s.sales);

  const visitor_id = approvalBookingDetails?.booking_form_list?.visitors_id || 0;
  const isBroker = approvalBookingDetails?.booking_form_list?.through_broker === 'yes';

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
      {isBroker ? <BrokerDetails brokerData={approvalBookingDetails} /> : undefined}

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
