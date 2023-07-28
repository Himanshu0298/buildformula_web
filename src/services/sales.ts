import { config, instance } from './init';

const params = config({ multipart: false });
// export default function useSalesServices() {

//   return {
//     getVisitorsList: data => {
//       return instance.post('/visitors/get_lists', data, params);
//     },
//     addVisitor: data => {
//       return instance.post('/visitors/add', data, params);
//     },
//     getAssignToData: data => {
//       return instance.post('/project/user/list', data, params);
//     },
//     createBooking: data => {
//       return instance.post('/save_booking_new', data, params);
//     },
//     confirmBookingOTP: data => {
//       return instance.post('/booking_confirm_via_otp', data, params);
//     },
//     resendBookingOTP: data => {
//       return instance.post('/resend_booking_otp', data, params);
//     },
//     setBookingOTPStatus: data => {
//       return instance.post('/booking_form_settings/set_booking_otp_status', data, params);
//     },
//     getBookingFormOTPStatus: data => {
//       return instance.post('/booking_form_settings/get_booking_otp_status', data, params);
//     },
//     getBankList: data => {
//       return instance.get('get_banks', data, config());
//     },
//   };
// }

export const getVisitorsList = (data: any) => {
  return instance.post('/visitors/get_lists', data, params);
};

export const addCustomer = data => {
  return instance.post('/visitors/add', data, params);
};

export const getUnitInfo = data => {
  return instance.post('/areaSheet/booking_unitSheet_tower_list', data, params);
};

export const getUnitParkingInfo = data => {
  return instance.post('/parking/list_parking_design', data, params);
};

export const addBooking = data => {
  return instance.post('/new_booking_form', data, params);
};

export const getOtherCharges = data => {
  return instance.post('/unit_bookingform_other_charges', data, params);
};

export const getTermsnContions = data => {
  return instance.post('/booking_terms_conditions', data, params);
};


export const getInstallmentOptions = data => {
  return instance.post('/payment_scheduled_master_list', data, params);
};

export const getInstallmentData = data => {
  return instance.post('/payment_scheduled_details_master', data, params);
}

export const getBankList = () => {
  return instance.get('/get_banks', params);

};