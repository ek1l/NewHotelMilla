/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
};

export const getAllSlider = createAsyncThunk('getAllSlider', async () => {
  try {
    const { data } = await instanceApiDefault.get(`/slider`);
    return data;
  } catch (error) {
    throw new Error('Get All Ratings Error');
  }
});

const getAllSliderSlice = createSlice({
  name: 'getAllSlider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSlider.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSlider.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllSlider.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getAllSliderSlice.reducer;
