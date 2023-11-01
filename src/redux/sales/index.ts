import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as visitorService from 'services/sales';
import { processError } from 'utils/constant';
import { handleLoading, handleReject } from 'utils/reduxUtils';

import {
  AddBrokerParams,
  bookingApprovalListParams,
  bookingApprovedRejectParams,
  brokerDetailParams,
  CommonParams,
  CreateCustomerParams,
  FormFillingParams,
  getApprovalDetailsParams,
  GetProjectUnitParams,
  IBookingFormApproval,
  IBookingFormParams,
  IBookingOwnershipFlag,
  IBroker,
  IBrokerDetail,
  IExtraCharges,
  IInstallmentDetails,
  IInstallmentOptions,
  InstallmentParams,
  IOtherCharges,
  IOtherChargesParam,
  ISalesState,
  ITermsnConditions,
  IUnitAreaInfo,
  IUnitAreaInfoParam,
  IUnitInfo,
  IUnitParkingInfo,
  IUnitStatus,
  IVisitor,
  IVisitorDetail,
  UnitInfoParams,
  visitorDetailParams,
  VisitorParams,
} from './salesInterface';

export const getVisitorsList = createAsyncThunk<IVisitor[], VisitorParams>(
  'sales/getVisitorsList',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getVisitorsList(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getCustomersList = createAsyncThunk<IVisitor[], CommonParams>(
  'sales/getCustomersList',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getCustomersList(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getVisitorsDetail = createAsyncThunk<IVisitorDetail, visitorDetailParams>(
  'sales/getVisitorsDetails',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getVisitorDetail(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getBrokerList = createAsyncThunk<IBroker[], CommonParams>(
  'sales/getBrokerList',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getBrokerList(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getBrokerDetail = createAsyncThunk<IBrokerDetail, brokerDetailParams>(
  'sales/getBrokerDetail',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getBrokerDetail(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getApprovalUnitDetails = createAsyncThunk<
  IBookingFormApproval,
  getApprovalDetailsParams
>('sales/getApprovalUnitDetails', async (params, thunkApi) => {
  try {
    const { data: res } = await visitorService.getApprovalUnitDetails(params);
    return res.data;
  } catch (err) {
    const processedError = processError(err);
    console.log(err);
    return thunkApi.rejectWithValue({ error: processedError });
  }
});

export const getBookingApprovalList = createAsyncThunk(
  'sales/getBookingApprovalList',
  async (params: bookingApprovalListParams, thunkApi) => {
    try {
      const { data: res } = await visitorService.getBookingApprovalList(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const updateBookingStatus = createAsyncThunk(
  'sales/updateBookingStatus',
  async (params: bookingApprovedRejectParams, thunkApi) => {
    try {
      const { data: res } = await visitorService.updateBookingStatus(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const addCustomer = createAsyncThunk(
  'sales/addCustomer',
  async (params: CreateCustomerParams, thunkApi) => {
    try {
      const { data: res } = await visitorService.addCustomer(params);
      toast.success(res.msg);
      return res;
    } catch (err) {
      const processedError = processError(err);
      toast.error(Object?.values(err.data.msg).join(', '));
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const addBroker = createAsyncThunk(
  'sales/addBroker',
  async (params: AddBrokerParams, thunkApi) => {
    try {
      const { data: res } = await visitorService.addBroker(params);
      toast.success(res.msg);
      return res;
    } catch (err) {
      const processedError = processError(err);
      toast.error(Object?.values(err.data.msg).join(', '));
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getUnitInfo = createAsyncThunk<IUnitInfo, UnitInfoParams>(
  'sales/unitInfo',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getUnitInfo(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getAreaInfo = createAsyncThunk<IUnitAreaInfo, IUnitAreaInfoParam>(
  'sales/unitAreaInfo',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getAreaInfo(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getUnitParkingInfo = createAsyncThunk<IUnitParkingInfo, CommonParams>(
  'sales/unitParkingInfo',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getUnitParkingInfo(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const addBooking = createAsyncThunk(
  'sales/addBooking',
  async (params: IBookingFormParams, thunkApi) => {
    try {
      const { data: res } = await visitorService.addBooking(params);
      toast.success(res.msg);
      return res;
    } catch (err) {
      const processedError = processError(err);
      toast.error(Object?.values(err.data.msg).join(', '));
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getUnitBookingFormLIst = createAsyncThunk(
  'sales/addBooking',
  async (params: IBookingFormParams, thunkApi) => {
    try {
      const { data: res } = await visitorService.getApprovalUnitDetails(params);
      return res;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const updateFormFillingStatus = createAsyncThunk(
  'sales/updateFormFillingStatus',
  async (params: FormFillingParams, thunkApi) => {
    try {
      const { data: res } = await visitorService.updateFormFillingStatus(params);
      return res;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getOtherChargesList = createAsyncThunk<IOtherCharges, IOtherChargesParam>(
  'sales/getOtherChargesList',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getOtherCharges(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getOtherExtraCharges = createAsyncThunk<IExtraCharges, IOtherChargesParam>(
  'sales/getOtherExtraCharges',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getOtherExtraCharges(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getTermsnConditions = createAsyncThunk<ITermsnConditions[], CommonParams>(
  'sales/getTerms&Conditions',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getTermsnContions(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getInstallmentOptions = createAsyncThunk<IInstallmentOptions, CommonParams>(
  'sales/getInstallmentOptions',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getInstallmentOptions(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getInstallmentDetails = createAsyncThunk<IInstallmentDetails, InstallmentParams>(
  'sales/getInstallmentDetails',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getInstallmentData(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getProjectUnitStatus = createAsyncThunk<IUnitStatus[], GetProjectUnitParams>(
  'sales/projectUnitStatus',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getProjectUnitStatus(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getBookingFormOwnerFlag = createAsyncThunk<IBookingOwnershipFlag, CommonParams>(
  'sales/getBookingFormOwnerFlag',
  async (params, thunkApi) => {
    try {
      const { data: res } = await visitorService.getBookingFormOwnerFlag(params);
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

export const getBankList = createAsyncThunk('sales/getBankList', async () => {
  try {
    const { data: res } = await visitorService.getBankList();
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

const initialState: ISalesState = {
  loading: false,
  visitorList: [],
  customerList: [],
  brokerList: [],
  unitInfo: {} as IUnitInfo,
  unitParkingInfo: {} as IUnitParkingInfo,
  otherChargesList: {} as IOtherCharges,
  termsList: [],
  installmentsList: {} as IInstallmentOptions,
  installmentsInformation: {} as IInstallmentDetails,
  banksList: [],
  unitAreaInfo: {} as IUnitAreaInfo,
  extraChargesList: {} as IExtraCharges,
  projectUnitStatus: [],
  timer: false,
  visitorDetail: {} as IVisitorDetail,
  brokerDetail: undefined,
  bookingApprovalList: undefined,
  approvalBookingDetails: {} as IBookingFormApproval,
  ownership_validation_flag: undefined,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    triggerTimer: (state, action) => {
      state.timer = action.payload;
    },
  },
  extraReducers: builder => {
    // visitors list
    builder.addCase(getVisitorsList.rejected, handleReject);
    builder.addCase(getVisitorsList.pending, handleLoading);
    builder.addCase(getVisitorsList.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        visitorList: action?.payload,
      };
    });
    // customers list
    builder.addCase(getCustomersList.rejected, handleReject);
    builder.addCase(getCustomersList.pending, handleLoading);
    builder.addCase(getCustomersList.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        customerList: action?.payload,
      };
    });
    // broker list
    builder.addCase(getBrokerList.rejected, handleReject);
    builder.addCase(getBrokerList.pending, handleLoading);
    builder.addCase(getBrokerList.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        brokerList: action?.payload,
      };
    });
    // add visitor
    builder.addCase(addCustomer.rejected, handleReject);
    builder.addCase(addCustomer.pending, handleLoading);
    builder.addCase(addCustomer.fulfilled, state => {
      return {
        ...state,
        loading: false,
      };
    });
    // add broker
    builder.addCase(addBroker.rejected, handleReject);
    builder.addCase(addBroker.pending, handleLoading);
    builder.addCase(addBroker.fulfilled, state => {
      return {
        ...state,
        loading: false,
      };
    });
    // update form filling status
    builder.addCase(updateFormFillingStatus.rejected, handleReject);
    builder.addCase(updateFormFillingStatus.pending, handleLoading);
    builder.addCase(updateFormFillingStatus.fulfilled, state => {
      return {
        ...state,
      };
    });
    // Unit info
    builder.addCase(getUnitInfo.rejected, handleReject);
    builder.addCase(getUnitInfo.pending, handleLoading);
    builder.addCase(getUnitInfo.fulfilled, (state, action) => {
      return {
        ...state,
        unitInfo: action?.payload,
      };
    });
    // Unit Area info
    builder.addCase(getAreaInfo.rejected, handleReject);
    builder.addCase(getAreaInfo.pending, handleLoading);
    builder.addCase(getAreaInfo.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        unitAreaInfo: action?.payload,
      };
    });
    // Project Unit Status
    builder.addCase(getProjectUnitStatus.rejected, handleReject);
    builder.addCase(getProjectUnitStatus.pending, handleLoading);
    builder.addCase(getProjectUnitStatus.fulfilled, (state, action) => {
      return {
        ...state,
        projectUnitStatus: action?.payload,
      };
    });
    // Unit Parking info
    builder.addCase(getUnitParkingInfo.rejected, handleReject);
    builder.addCase(getUnitParkingInfo.pending, handleLoading);
    builder.addCase(getUnitParkingInfo.fulfilled, (state, action) => {
      return {
        ...state,
        unitParkingInfo: action?.payload,
      };
    });
    // Booking Form
    builder.addCase(addBooking.rejected, handleReject);
    builder.addCase(addBooking.pending, handleLoading);
    builder.addCase(addBooking.fulfilled, state => {
      return {
        ...state,
        timer: false,
        loading: false,
      };
    });
    // get other charges
    builder.addCase(getOtherChargesList.rejected, handleReject);
    builder.addCase(getOtherChargesList.pending, handleLoading);
    builder.addCase(getOtherChargesList.fulfilled, (state, action) => {
      return {
        ...state,
        otherChargesList: action?.payload,
      };
    });
    // get Extra charges
    builder.addCase(getOtherExtraCharges.rejected, handleReject);
    builder.addCase(getOtherExtraCharges.pending, handleLoading);
    builder.addCase(getOtherExtraCharges.fulfilled, (state, action) => {
      return {
        ...state,
        extraChargesList: action?.payload,
      };
    });
    // get terms and conditions
    builder.addCase(getTermsnConditions.rejected, handleReject);
    builder.addCase(getTermsnConditions.pending, handleLoading);
    builder.addCase(getTermsnConditions.fulfilled, (state, action) => {
      return {
        ...state,
        termsList: action?.payload,
      };
    });
    // get installments options
    builder.addCase(getInstallmentOptions.rejected, handleReject);
    builder.addCase(getInstallmentOptions.pending, handleLoading);
    builder.addCase(getInstallmentOptions.fulfilled, (state, action) => {
      return {
        ...state,
        installmentsList: action?.payload,
      };
    });
    // get installments details
    builder.addCase(getInstallmentDetails.rejected, handleReject);
    builder.addCase(getInstallmentDetails.pending, handleLoading);
    builder.addCase(getInstallmentDetails.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        installmentsInformation: action?.payload,
      };
    });
    // get banks List
    builder.addCase(getBankList.rejected, handleReject);
    builder.addCase(getBankList.pending, handleLoading);
    builder.addCase(getBankList.fulfilled, (state, action) => {
      return {
        ...state,
        banksList: action?.payload,
      };
    });
    // get Visitor details
    builder.addCase(getVisitorsDetail.rejected, handleReject);
    builder.addCase(getVisitorsDetail.pending, handleLoading);
    builder.addCase(getVisitorsDetail.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        visitorDetail: action?.payload,
      };
    });
    // get broker details
    builder.addCase(getBrokerDetail.rejected, handleReject);
    builder.addCase(getBrokerDetail.pending, handleLoading);
    builder.addCase(getBrokerDetail.fulfilled, (state, action) => {
      return {
        ...state,
        brokerDetail: action?.payload,
      };
    });
    // get approval list
    builder.addCase(getBookingApprovalList.rejected, handleReject);
    builder.addCase(getBookingApprovalList.pending, handleLoading);
    builder.addCase(getBookingApprovalList.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        bookingApprovalList: action?.payload.booking_form_list?.sort(
          (a, b) => b.bookingid - a.bookingid,
        ),
      };
    });
    // get approval booking details
    builder.addCase(getApprovalUnitDetails.rejected, handleReject);
    builder.addCase(getApprovalUnitDetails.pending, handleLoading);
    builder.addCase(getApprovalUnitDetails.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        approvalBookingDetails: action?.payload,
      };
    });
    // booking approve reject
    builder.addCase(updateBookingStatus.rejected, handleReject);
    builder.addCase(updateBookingStatus.pending, handleLoading);
    builder.addCase(updateBookingStatus.fulfilled, state => {
      return {
        ...state,
      };
    });
    // ownership validation flag
    builder.addCase(getBookingFormOwnerFlag.rejected, handleReject);
    builder.addCase(getBookingFormOwnerFlag.pending, handleLoading);
    builder.addCase(getBookingFormOwnerFlag.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        ownership_validation_flag: action?.payload,
      };
    });
  },
});
export const { triggerTimer } = salesSlice.actions;
export default salesSlice.reducer;
