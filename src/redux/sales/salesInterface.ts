export interface ISalesState {
  loading: boolean;
  visitorList: IVisitor[];
  brokerList: IBroker[];
  unitInfo: IUnitInfo;
  unitParkingInfo: IUnitParkingInfo;
  otherChargesList: IOtherCharges;
  termsList: ITermsnConditions[];
  installmentsList: IInstallmentOptions;
  installmentsInformation: IInstallmentDetails;
  banksList: IBanksList[];
  unitAreaInfo: IUnitAreaInfo;
  extraChargesList: IExtraCharges;
  projectUnitStatus: IUnitStatus[];
  visitorDetail: IVisitorDetail;
  brokerDetail: IBrokerDetail;
  bookingApprovalList: IBookingApprovalList;
  approvalBookingDetails: IBookingFormApproval;
  timer: boolean;
  ownership_validation_flag: IBookingOwnershipFlag;
}

export type IBookingOwnershipFlag = {
  booking_ownership: string;
};

export type CommonParams = {
  project_id: string;
};

export type visitorDetailParams = {
  project_id: string;
  visitor_id: number;
};

export type brokerDetailParams = {
  project_id: string;
  broker_id: number;
};

export type getApprovalDetailsParams = {
  project_id: string;
  project_bookings_temp_id: string;
  unit_id: string;
};

export type bookingApprovalListParams = {
  project_id: string;
};

export type VisitorParams = {
  project_id: string;
  filter_mode: string;
  role: string;
  page: string;
};

export type FormFillingParams = {
  project_id: string;
  unit_id: string;
};

export type GetProjectUnitParams = {
  project_id: string;
  project_type: string;
  project_tower: string;
  project_floor: string;
  id: string;
};

export type bookingApprovedRejectParams = {
  project_id: string;
  unit_id: number;
  project_bookings_temp_id: number;
  is_approved: string;
  rejected_remarks: string;
};

export type IUnitStatus = {
  id: number;
  project_id: number;
  project_list_id: number;
  project_type: number;
  project_tower: string;
  project_floor: string;
  project_unit: string;
  unit_for: string;
  project_bhk: number;
  status: number;
  user_id: number;
  booked_unit_user_id: any;
  created: string;
  tmp_booking_time_start: any;
  tmp_booking_time_end: any;
  modified: string;
  is_resale: string;
  resale_unit: any;
  project_main_units_id: number;
  cencel_unit_otp: any;
  isverified_cencel_unit_otp: string;
  unit_type: any;
  specific_type: any;
  no_of_bhk: any;
  premium_location: any;
  share_with_broker: any;
  booking_status: any;
};

export interface IBookingFormApproval {
  booking_form_list: IBookingApprovalDetails;
}

export interface IBookingApprovalDetails {
  id: number;
  project_id: number;
  unitid: number;
  visitors_id: number;
  broker_id: any;
  through_broker: string;
  brokerage: any;
  broker_remark: any;
  unit_reserved_date: string;
  parking_no: string;
  calculation_method: string;
  basic_rate_no: number;
  basic_rate_description: string;
  basic_rate_area: number;
  basic_rate: string;
  basic_rate_disc_amt: string;
  basic_rate_disc_per: string;
  basic_rate_basic_amount: string;
  other_charges_no: any;
  unit_other_charge_id: any;
  other_charges_title: any;
  other_charges_distribution_method: any;
  other_charges_area: any;
  other_charges_rate: any;
  other_charges_disc_amt: any;
  other_charges_disc_per: any;
  other_charges_amount: any;
  other_charges_total: string;
  sub_total_amt: string;
  total_disc: string;
  disc_remarks: any;
  gst_per: string;
  gst_amt: string;
  stampduty_per: string;
  stampduty_amount: string;
  reg_per: string;
  reg_amount: string;
  total_gove_tax: any;
  extra_charges_no: any;
  extra_charges_title: any;
  extra_charges_distribution_method: any;
  extra_charges_area: any;
  extra_charges_rate: any;
  extra_charges_disc_per: any;
  extra_charges_disc_amt: any;
  extra_charges_amt: any;
  extra_charges_total: string;
  property_final_amount: string;
  is_loan: any;
  loan_amt: string;
  bank: string;
  loan_remarks: any;
  custom_payment_no: any;
  custom_payment_installment: any;
  installment_due_date: any;
  installment_per: any;
  installment_basic_amt: any;
  installment_otherchages_amt: any;
  installment_amount: any;
  gst: any;
  custom_payment_total_amount: string;
  custom_payment_remark_id: number;
  custom_payment_remark: any;
  is_approved: string;
  approved_by: number;
  approved_datetime: string;
  rejected_remarks: string;
  user_id: any;
  broker_first_name: string;
  broker_last_name: string;
  broker_email: string;
  broker_phone: string;
  unit_info: string;
  extracharges: any[];
  othercharge: any[];
  ownership: any[];
  super_build_up_area: number;
  terracearea: number;
}

export interface IBookingApprovalList {
  booking_form_list: IBookingApprovalListData[];
}

export interface IBookingApprovalListData {
  bookingid: number;
  unitid: number;
  unit_reserved_date: string;
  status: string;
  approved_by: string;
  evaluated_by: string;
  bookedby: string;
  unit_info: string;
}

export interface IBroker {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  phone2: any;
  company_name: string;
  company_addres: string;
  pan: string;
  gst: string;
  rera_registration_no: string;
  remarks: string;
  project_id: number;
  status: number;
  created: string;
  dealsClosed: number;
}

export interface IBrokerDetail {
  broker_id: number;
}

export interface IVisitor {
  id: number;
  project_id: string;
  user_id: number;
  first_name: string;
  last_name: string;
  email: any;
  mobile_code: string;
  phone: string;
  phone_2: string;
  Inquiry_date: string;
  occupation: number;
  other_occupation: any;
  source_type: any;
  other_source_type: any;
  current_locality: any;
  budget_from: number;
  budget_to: number;
  cast_type: any;
  project_status_type: any;
  source_type_sub_category: any;
  follow_up_date: any;
  follow_up_time: any;
  assign_to: number;
  priority: string;
  remarks: any;
  inquiry_for: number;
  bhk: number;
  inquiry_status_id: number;
  brokers_id: any;
  dob: any;
  anniversary_date: any;
  address: any;
  created: string;
  modified: any;
  status: number;
  import_from_excel: number;
  customer_ref_no: string;
  is_verifiy: number;
  budgetrange_id: number;
  title: string;
  inquiry_for_title: any;
  master_cast_type_title: any;
  master_project_status_title: any;
  source_type_sub_category_title: any;
  mobile_code_data: any;
  brokers_data: any;
  assign_to_data: IAssignToData;
  interested_properties: any[];
}

export interface IVisitorDetail {
  visitor_id: number;
  // first_name: number;
  // last_name: string;
  // email: string
  // phone: string
}

export interface IOwnerShip {
  id: number;
  ownership_customer_first_name: string;
  ownership_customer_phone: string;
  ownership_customer_address?: string;
  ownership_customer_email: string;
  ownership_customer_age?: string;
  ownership_customer_occupation?: string;
  ownership_customer_alternate_contact?: string;
  ownership_customer_pan: string;
  ownership_customer_aadhar: string;
}

export interface IAssignToData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_otp: string;
  email_verified: string;
  password: string;
  birthdate: any;
  image: any;
  gender: string;
  phone: string;
  address: any;
  pincode: any;
  city_id: any;
  state_id: any;
  is_active: number;
  default_role_id: number;
  remember_token: any;
  created_at: string;
  updated_at: any;
  otp: string;
  otp_verified: string;
  alternate_phone: any;
  occupation: any;
  pan_number: any;
  adhar_number: any;
  pan_image: any;
  fcm_token: string;
  adhar_image: any;
  profile_url: any;
  age: any;
  terms: number;
  token: string;
}

export interface CreateCustomerParams {
  project_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  inquiry_for: number;
  priority: string;
  occupation: number;
  other_occupation: number;
  budget_from: number;
  budget_to: number;
}

export interface AddBrokerParams {
  project_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  company_name?: string;
  company_addres?: string;
  pan?: string;
  gst?: string;
  rera_registration_no?: string;
  remarks?: string;
}

export interface UnitInfoParams {
  project_id: string;
  tower_id: string;
}

export interface IUnitTowerInfo {
  project_tower: number;
  tower_title: string;
  project_type: number;
}

export interface IUnitInfoData {
  title: string;
  tower_id: string;
  project_id: number;
  project_main_units_id: number;
  super_build_up_area: number;
  build_up_area: number;
  carpet: number;
  unit: number;
}

export interface IUnitInfo {
  project_tower_data: IUnitTowerInfo[];
  booking_unit_sheet_towers_data: IUnitInfoData[];
}

export interface IUnitParkingInfoData {
  id: number;
  project_main_unit_id: number;
  user_id: number;
  last_modified: string;
  allotment_data: string;
  project_id: number;
}

export interface IUnitParkingInfo {
  all_parking_units: IUnitParkingInfoData[];
  parking_file: any;
}

export interface IBookingFormParams {
  project_bookings_temp_id: number;
  project_id: number;
  unit_id: number;
  visitors_id: number;
  unit_reserved_date: string;
  parking_no: string;
  calculation_method: string;
  basic_rate_no: number;
  basic_rate_description: string;
  basic_rate_area: number;
  basic_rate: number;
  basic_rate_disc_amt: number;
  basic_rate_disc_per: number;
  basic_rate_basic_amount: number;
  other_charges: OtherCharge[];
  other_charges_total: number;
  sub_total_amt: number;
  total_disc: number;
  disc_remarks: string;
  gst_per: number;
  gst_amt: number;
  stampduty_per: number;
  stampduty_amount: number;
  reg_per: number;
  reg_amount: number;
  total_gove_tax: string;
  extra_charges: unknown;
  broker_id: number;
  through_broker: string;
  brokerage: string;
  broker_remark: string;
  extra_charges_total: number;
  property_final_amount: number;
  is_loan: string;
  loan_amt: number;
  bank: number;
  loan_remarks: string;
  installments?: Installment[];
  custom_payment_total_amount: number;
  custom_payment_remark_id: number;
  custom_payment_remark: string;
  ownership: IOwnerShip[];
}

export interface OtherCharge {
  unit_other_charge_id: number;
  other_charges_no: number;
  other_charges_title: string;
  other_charges_distribution_method: string;
  other_charges_area: number;
  other_charges_rate: number;
  other_charges_disc_amt: number;
  other_charges_disc_per: number;
  other_charges_amount: number;
}

export interface ExtraCharge {
  extra_charges_no: number;
  extra_charges_title: string;
  extra_charges_distribution_method: string;
  extra_charges_area: number;
  extra_charges_rate: number;
  extra_charges_disc_per: number;
  extra_charges_disc_amt: number;
  extra_charges_amt: number;
  extra_charges_total: number;
  extra_charges_base: number;
}

export interface Installment {
  custom_payment_no: number;
  custom_payment_installment: string;
  installment_due_date: string;
  installment_per: number;
  installment_basic_amt: number;
  installment_otherchages_amt: number;
  installment_amount: number;
  gst: number;
}

export interface IOtherCharges {
  other_charge_unit_rates: IOtherChargesInfo[];
}

export interface IOtherChargesInfo {
  id: number;
  project_id: number;
  unit_id: number;
  other_charge_field_id: number;
  ratebase_amounts: string;
  fixed_amounts: string;
  created_at: string;
  updated_at: any;
  title: any;
  amount_type: string;
}

export interface IOtherChargesParam {
  project_id: string;
  unit_id: string;
}

export interface IUnitAreaInfoParam {
  project_id: string;
  project_main_types: number;
  unit_id: string;
}

export interface IUnitAreaInfo {
  id: number;
  tower_id: number;
  project_id: number;
  project_main_units_id: number;
  super_build_up_area: number;
  build_up_area: number;
  carpet: number;
  area_unit: number;
  rate_base_amt: number;
  fixed_amount: any;
  last_updated: string;
  user_id: number;
  terracearea: number;
}

export interface ITermsnConditions {
  id: number;
  project_id: number;
  title: string;
  description: string;
  status: number;
  created: string;
}

export interface IInstallmentOptions {
  payment_scheduled_master: IPaymentInfo[];
}

export interface IPaymentInfo {
  id: number;
  project_id: number;
  title: string;
  status: number;
  created: string;
}

export interface InstallmentParams {
  project_id: number;
  payment_scheduled_master_id: number;
}

export interface IInstallmentDetails {
  payment_scheduled_details_master: IInstallmentInfo[];
}

export interface IInstallmentInfo {
  custom_payment_no?: number;
  project_id?: number;
  payment_scheduled_master_id?: number;
  custom_payment_installment: string;
  installment_per?: number;
  installment_due_date: string;
  installment_basic_amt?: number;
  installment_otherchages_amt: number;
  gst?: number;
  installment_amount: number;
  percentage: number;
  lastRow?: string;
}

export interface IBanksList {
  id: number;
  title: string;
}

export interface IExtraCharges {
  other_charge_unit_rates: IExtraChargesData[];
}

export interface IExtraChargesData {
  id: number;
  project_id: number;
  unit_id: number;
  amount_type: string;
  other_charge_field_id: number;
  ratebase_amounts: number;
  fixed_amounts: number;
  type: string;
  created_at: string;
  updated_at: any;
  title: string;
  area: string;
}
