/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createHotel = createAsyncThunk(
  'createHotel',
  async (formData: any) => {
    try {
      console.log(formData);
      const { data } = await instanceApiDefault.post(`/hotel`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return data;
    } catch (error) {
      throw new Error('Create Hotel Error');
    }
  },
);

const createHotelsSlice = createSlice({
  name: 'createHotel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(createHotel.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createHotel.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createHotelsSlice.reducer;
