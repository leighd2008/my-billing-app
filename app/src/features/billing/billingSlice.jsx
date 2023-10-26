import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from './billing.api';

const initialState = {
  chargeTypes: [],
  status: 'idle',
  error: null
}

export const fetchChargeTypes = createAsyncThunk('billing/fetchChargeTypes', async () => {
  const chargeTypes = await api.fetchChargeTypes();
  return chargeTypes
})

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    
  },
  extraReducers(builder) {
    builder
      .addCase(fetchChargeTypes.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchChargeTypes.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.chargeTypes = action.payload
      })
      .addCase(fetchChargeTypes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default billingSlice.reducer

export const selectChargeTypes = state => state.billing.chargeTypes