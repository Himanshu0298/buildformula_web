import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as visitorService from 'services/sales';
import { processError } from 'utils/constant';
import { handleLoading, handleReject } from 'utils/reduxUtils';

import {
  CommonParams,
  CreateCustomerParams,
  IBookingFormParams,
  ISalesState,
  IUnitInfo,
  IUnitParkingInfo,
  IVisitor,
  UnitInfoParams,
} from './salesInterface';

export const getVisitorsList = createAsyncThunk<IVisitor[], CommonParams>(
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
      return res.data;
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
      return res.data;
    } catch (err) {
      const processedError = processError(err);
      console.log(err);
      return thunkApi.rejectWithValue({ error: processedError });
    }
  },
);

const initialState: ISalesState = {
  loading: false,
  visitorList: [],
  unitInfo: {} as IUnitInfo,
  unitParkingInfo: {} as IUnitParkingInfo,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
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
    builder.addCase(addCustomer.fulfilled, state => {
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
      };
    });
  },
});

export default salesSlice.reducer;
