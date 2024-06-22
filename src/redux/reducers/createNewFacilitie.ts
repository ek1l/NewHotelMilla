/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createNewFacilitie = createAsyncThunk(
  'createNewFacilitie',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(`/facility`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Create Facilitie Error');
    }
  },
);

const createNewFacilitieSlice = createSlice({
  name: 'createNewFacilitie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewFacilitie.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewFacilitie.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewFacilitie.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createNewFacilitieSlice.reducer;
