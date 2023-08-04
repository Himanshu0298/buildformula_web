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
