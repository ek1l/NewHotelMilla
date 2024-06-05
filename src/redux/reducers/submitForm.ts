/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceSubmitFormAPI } from '../../api/apiSubmitForm';

type ObjectDataFormData = {
  email: string;
  message: string;
  name: string;
};

export const submitFormPost = createAsyncThunk(
  'SubmitForm/post',
  async (formData: ObjectDataFormData) => {
    try {
      const { data } = await instanceSubmitFormAPI.post(
        'leonardoduarteprogramador@gmail.com',
        formData,
      );

      return data;
    } catch (error) {
      throw new Error(`Sent email error! ${error}`);
    }
  },
);

type InitialStateObject = {
  dataSubmitForm: Array<any> | [];
  loading: boolean;
};

const initialState: InitialStateObject = {
  dataSubmitForm: [],
  loading: false,
};

const submitFormSlice = createSlice({
  name: 'submitForm',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFormPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitFormPost.fulfilled, (state, { payload }) => {
        state.dataSubmitForm = [payload];
        state.loading = false;
      })
      .addCase(submitFormPost.rejected, (state) => {
        state.dataSubmitForm = [];
        state.loading = false;
      });
  },
});

export default submitFormSlice.reducer;
