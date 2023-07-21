import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as visitorService from 'services/sales';
import { processError } from 'utils/constant';
import { handleLoading, handleReject } from 'utils/reduxUtils';

import { CommonParams, ISalesState, IVisitor } from './salesInterface';

export const getVisitorsList = createAsyncThunk<IVisitor[], CommonParams>(
  'getVisitorsList',
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

const initialState: ISalesState = {
  loading: false,
  visitorList: [],
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getVisitorsList.rejected, handleReject);
    builder.addCase(getVisitorsList.pending, handleLoading);
    builder.addCase(getVisitorsList.fulfilled, (state, action) => {
      return {
        ...state,
        visitorsList: action?.payload,
      };
    });
  },
});

export default salesSlice.reducer;
