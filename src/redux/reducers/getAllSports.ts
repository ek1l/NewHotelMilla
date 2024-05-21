/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type DataObjectSports = {
  id: number;
  sport: string;
};
type InitialObjectState = {
  loading: boolean;
  data: DataObjectSports[];
};

const initialState: InitialObjectState = {
  loading: false,
  data: [],
};

export const getAllSports = createAsyncThunk('getAllSports', async () => {
  try {
    const { data } = await instanceApiDefault.get(`/sports`);
    return data;
  } catch (error) {
    throw new Error('Get All Sports Error');
  }
});

const getAllSportsSlice = createSlice({
  name: 'getAllSports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSports.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSports.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllSports.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getAllSportsSlice.reducer;
