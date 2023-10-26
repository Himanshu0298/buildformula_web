import { config, instance } from './init';

const params = config({ multipart: false });

export const getVisitorsList = data => {
  return instance.post('/visitors/get_lists', data, params);
};

export const addCustomer = data => {
  return instance.post('/visitors/add', data, params);
};

export const getUnitInfo = data => {
  return instance.post('/areaSheet/booking_unitSheet_tower_list', data, params);
};

export const getAreaInfo = data => {
  return instance.post('/getUnitAreasheetInfo', data, params);
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
export const getOtherExtraCharges = data => {
  return instance.post('/unit_bookingform_extra_other_charges', data, params);
};

export const getTermsnContions = data => {
  return instance.post('/booking_terms_conditions', data, params);
};

export const getInstallmentOptions = data => {
  return instance.post('/payment_scheduled_master_list', data, params);
};

export const getInstallmentData = data => {
  return instance.post('/payment_scheduled_details_master', data, params);
};

export const getBankList = () => {
  return instance.get('/get_banks', params);
};

export const updateFormFillingStatus = data => {
  return instance.post('/update_unit_filling', data, params);
};

export const getProjectUnitStatus = data => {
  return instance.post('/get_locked_units', data, params);
};

export const getBrokerList = data => {
  return instance.post('/list_brokers', data, params);
};

export const addBroker = data => {
  return instance.post('/add_broker', data, params);
};

//booking approval and preview
export const getBrokerDetail = data => {
  return instance.post('/broker_details', data, params);
};

export const getVisitorDetail = data => {
  return instance.post('/visitors/details', data, params);
};

export const getApprovalUnitDetails = data => {
  return instance.post('/unit_booking_form_list', data, params);
};

export const getBookingApprovalList = data => {
  return instance.post('/booking_all_form_list', data, params);
};

export const updateBookingStatus = data => {
  return instance.post('/booking_form_apporved_reject', data, params);
};

export const getBookingFormOwnerFlag = data => {
  return instance.post('/booking_form_settings/get_booking_ownership_status', data, params);
};
