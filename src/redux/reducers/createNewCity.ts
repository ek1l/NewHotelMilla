/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createCity = createAsyncThunk(
  'createCity',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(
        `/address/city`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return data;
    } catch (error) {
      throw new Error('Create City Error');
    }
  },
);

const createNewCitySlice = createSlice({
  name: 'createNewCity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCity.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createNewCitySlice.reducer;
