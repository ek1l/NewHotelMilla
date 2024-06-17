/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createNewSlider = createAsyncThunk(
  'createNewSlider',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(
        `/slider/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return data;
    } catch (error) {
      throw new Error('Create News Error');
    }
  },
);

const createNewSliderSlice = createSlice({
  name: 'createNewSlider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewSlider.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewSlider.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewSlider.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createNewSliderSlice.reducer;
