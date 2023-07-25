export type CommonParams = {
  project_id: number;
};

export interface IVisitor {
  id: number;
  project_id: number;
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

export interface ISalesState {
  loading: boolean;
  visitorList: IVisitor[];
  unitInfo: IUnitInfo;
  unitParkingInfo: IUnitParkingInfo;
  otherChargesList: IOtherCharges;
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

export interface UnitInfoParams {
  project_id: number;
  tower_id: number;
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
  extra_charges: ExtraCharge[];
  extra_charges_total: number;
  property_final_amount: number;
  is_loan: string;
  loan_amt: number;
  bank: number;
  loan_remarks: string;
  installments: Installment[];
  custom_payment_total_amount: number;
  custom_payment_remark_id: number;
  custom_payment_remark: string;
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
  other_charge_unit_rates: IOtherChargesInfo[]
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
}

export interface IOtherChargesParam {
  project_id: number;
  unit_id: number;
}
