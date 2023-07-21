import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useAppDispatch } from 'redux/store';
import * as visitorService from 'services/sales';
import { processError } from 'utils/constant';
import { handleLoading, handleReject } from 'utils/reduxUtils';

import { CommonParams, IVisitor } from './salesInterface';

const getVisitorsList = createAsyncThunk<IVisitor[], CommonParams>(
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

const initialState = {
  loading: false,
  visitorsList: [],
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
        loadingCustomerData: false,
        customerData: action?.payload,
      };
    });
  },
});

export const useSalesActions = () => {
  const dispatch = useAppDispatch();

  return {
    getVisitorsList: (params: CommonParams) => dispatch(getVisitorsList(params)),
  };
};

export default salesSlice.reducer;
