import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as visitorService from 'services/sales';
import { processError } from 'utils/constant';
import { handleLoading, handleReject } from 'utils/reduxUtils';

import {
  CommonParams,
  CreateCustomerParams,
  FormFillingParams,
  IBookingFormParams,
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
  IVisitor,
  UnitInfoParams,
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

export const addCustomer = createAsyncThunk(
  'sales/addCustomer',
  async (params: CreateCustomerParams, thunkApi) => {
    try {
      const { data: res } = await visitorService.addCustomer(params);
      return res;
    } catch (err) {
      const processedError = processError(err);
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

export const getBankList = createAsyncThunk('sales/getBankList', async () => {
  try {
    const { data: res } = await visitorService.getBankList();
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

const initialState: ISalesState = {
  msg: '',
  loading: false,
  visitorList: [],
  unitInfo: {} as IUnitInfo,
  unitParkingInfo: {} as IUnitParkingInfo,
  otherChargesList: {} as IOtherCharges,
  termsList: [],
  installmentsList: {} as IInstallmentOptions,
  installmentsInformation: {} as IInstallmentDetails,
  banksList: [],
  timer: false,
  unitAreaInfo: {} as IUnitAreaInfo,
  extraChargesList: {} as IExtraCharges,
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
        visitorList: action?.payload,
      };
    });
    // add visitor
    builder.addCase(addCustomer.rejected, handleReject);
    builder.addCase(addCustomer.pending, handleLoading);
    builder.addCase(addCustomer.fulfilled, (state, action) => {
      toast.success(action.payload.msg);
      return {
        ...state,
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
        unitAreaInfo: action?.payload,
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
    builder.addCase(addBooking.fulfilled, (state, action) => {
      toast.success(action.payload.msg);
      return {
        ...state,
        timer: false,
        msg: action.payload.msg,
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
  },
});
export const { triggerTimer } = salesSlice.actions;
export default salesSlice.reducer;
