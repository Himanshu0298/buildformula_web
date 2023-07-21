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
  errorMessage: string | null;
  visitors: [];
}
