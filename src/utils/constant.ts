import { isString } from 'lodash';
import React from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'http://192.168.20.131/';
// export const SITE_URL = 'https://3e1c-1-22-140-88.ngrok-free.app';
// export const SITE_URL = 'http://110.227.208.185/';
// export const SITE_URL = 'https://portal.buildformula.com';
export const BASE_API_URL = `${SITE_URL}/api/`;

export const PHONE_REGEX =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const HTML_REGEX = /(<([^>]+)>)/gi;

export const PAN_REGEX =
  /^([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([a-zA-Z]([0-9]([0-9]([0-9]([0-9]([a-zA-Z])?)?)?)?)?)?)?)?)?)?$/;
export const GST_REGEX = /[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[1-9A-Z]{1}$/;

export const MAX_TOWERS = 26;
export const MAX_FLOORS = 100;
export const MAX_UNITS = { 1: 99, 2: 99, 3: 99, 4: 1000, 5: 1000 };
export const MAX_BUNGALOW_UNITS = 99;

export const DEFAULT_STRUCTURE = {
  1: { towerCount: undefined, towers: {} },
  2: { towerCount: undefined, towers: {} },
  3: { towerCount: undefined, towers: {} },
  4: { unitCount: undefined, units: {} },
  5: { unitCount: undefined, units: {} },
};

export const STRUCTURE_TYPE_LABELS = {
  2: 'Shops',
  3: 'Offices',
  1: 'Apartments',
  4: 'Bungalows',
  5: 'Plots',
};

export const APP_BOTTOM_TAB_HEIGHT = 50;

export const BHK_OPTIONS = [
  { type: 1, color: 'rgba(244,175,72)' },
  { type: 2, color: 'rgba(134, 134, 134)' },
  { type: 3, color: 'rgba(72, 161, 244)' },
  { type: 4, color: 'rgba(149, 100, 100)' },
  { type: 5, color: 'rgba(168, 72, 244)' },
  { type: 6, color: 'rgba(0, 205, 205)' },
  { type: 7, color: 'rgba(99, 149, 104)' },
];

export const DOCUMENT_CHARGE_LIMIT = 20000;

export const MODIFY_REQUEST_STATUS = {
  pending: { label: 'PENDING APPROVAL', color: '#F4AF48' },
  approved: { label: 'APPROVED', color: '#07CA03' },
  rejected: { label: 'REJECTED', color: '#FF5D5D' },
  cancel_by_customer: { label: 'CANCEL BY CUSTOMER', color: '#041D36' },
  confirmed_by_customer: { label: 'CONFIRMED BY CUSTOMER', color: '#041D36' },
};

export const PR_REQUEST_STATUS = {
  1: { label: 'Pending', color: '#F4AF48' },
  2: { label: 'Approved', color: '#07CA03' },
  3: { label: 'Rejected', color: '#FF5D5D' },
};
export const PR_REQUEST_DETAILS_STATUS = {
  1: {
    label: 'PR Approved',
    color: '#07CA03',
    icon: 'check-circle',
    2: { label: 'Rejected PR', color: '#FF5D5D', icon: 'cancel' },
  },
};
export const STORE_KEEPER_STATUS = {
  pending: { label: 'Pending', color: '#F4AF48' },
  approved: { label: 'Approved', color: '#07CA03' },
  issued: { label: 'Issued', color: '#07CA03', icon: 'storefront-outline' },
  inspected: { label: 'Inspected', color: '#07CA03' },
};

export const STORE_KEEPER_DETAILS_STATUS = {
  1: { label: 'Approved', color: '#4872F4' },
  2: { label: 'Rejected', color: '#FF5D5D' },
};

export const STRUCTURE_TYPE = { PLOT: 5, BUNGALOW: 4 };

export const DEFAULT_ADMIN_PERMISSIONS = {
  admin: 1,
  approval: 1,
  editor: 1,
  view: 1,
  none: 0,
};

export function getFileName(string) {
  if (string?.includes('/')) {
    const splits = string?.split('/');
    return splits[splits.length - 1];
  }

  return string;
}

export const DEFAULT_PROJECT_FILTERS = {
  projectNames: '',
  developerNames: '',
  area: '',
  status: '',
  premium: '',
  possession: '',
  rera: '',
  projectType: '',
  restrictedUser: '',
  projectStatus: '',
  projectQuality: '',
  bhk: '',
  category: '',
  towers: '',
  units: '',
  bungalows: '',
  plots: '',
  owners: '',
  security: '',
};

export function getUniqueOptions(options) {
  const uniqueData = options?.filter((obj, index) => {
    return index === options?.findIndex(o => obj.label === o.label || obj.value === o.value);
  });

  return uniqueData;
}

export function processError(error: any) {
  console.trace('-----> error.response', error);
  return error?.message?.message || error?.message || isString(error)
    ? error
    : 'An error occurred. Please try again.';
}

export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const DISTRIBUTION_METHOD = [
  'Equally with all installments',
  'Proportionately with all installment',
  'Proportionately with all installment(Except First)',
  'Connect with last installment',
  'Dont connect with installment',
];
