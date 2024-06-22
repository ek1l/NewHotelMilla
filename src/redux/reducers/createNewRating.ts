/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createNewRating = createAsyncThunk(
  'createNewRating',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(`/rating `, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Create Rating Error');
    }
  },
);

const createNewRatingSlice = createSlice({
  name: 'createNewRating',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewRating.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewRating.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createNewRatingSlice.reducer;
