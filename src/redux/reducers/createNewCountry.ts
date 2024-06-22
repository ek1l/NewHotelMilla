/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createNewCountry = createAsyncThunk(
  'createNewCountry',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(
        `/address/country`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return data;
    } catch (error) {
      throw new Error('Create Country Error');
    }
  },
);

const createNewCountrySlice = createSlice({
  name: 'editUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewCountry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewCountry.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createNewCountrySlice.reducer;
