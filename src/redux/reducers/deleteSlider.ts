/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteSlider = createAsyncThunk(
  'deleteSlider',
  async (id: any) => {
    try {
      const { data } = await instanceApiDefault.delete(`/slider/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Delete Rating Error');
    }
  },
);

const deleteSliderSlice = createSlice({
  name: 'deleteSlider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSlider.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSlider.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteSlider.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteSliderSlice.reducer;
