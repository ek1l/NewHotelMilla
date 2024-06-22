/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type DataObjectSports = {
  id: number;
  rating: string;
};
type InitialObjectState = {
  loading: boolean;
  data: DataObjectSports[];
};

const initialState: InitialObjectState = {
  loading: false,
  data: [],
};

export const getAllRatings = createAsyncThunk('getAllRatings', async () => {
  try {
    const { data } = await instanceApiDefault.get(`rating`);
    return data;
  } catch (error) {
    throw new Error('Get All Ratings Error');
  }
});

const getAllRatingsSlice = createSlice({
  name: 'getAllRatings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRatings.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRatings.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllRatings.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getAllRatingsSlice.reducer;
