/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
};

export const sendEmailMailChimp = createAsyncThunk(
  'sendEmailMailChimp',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(`/email/`, formData);
      return data;
    } catch (error) {
      throw new Error('Send email error');
    }
  },
);

const sendEmailMailChimpSlice = createSlice({
  name: 'sendEmailMailChimp',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmailMailChimp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendEmailMailChimp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendEmailMailChimp.rejected, (state) => {
        state.data = [];
        state.loading = false;
      });
  },
});

export default sendEmailMailChimpSlice.reducer;
