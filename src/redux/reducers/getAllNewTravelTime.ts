/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type DataObjectTravelTime = {
  id: number;
  travelTime: string;
};
type InitialObjectState = {
  loading: boolean;
  data: DataObjectTravelTime[];
};

const initialState: InitialObjectState = {
  loading: false,
  data: [],
};

export const getAllTravelTime = createAsyncThunk(
  'getAllTravelTime',
  async () => {
    try {
      const { data } = await instanceApiDefault.get(`/traveltime`);
      return data;
    } catch (error) {
      throw new Error('Get All TravelTime Error');
    }
  },
);

const getAllTravelTimeSlice = createSlice({
  name: 'getAllTravelTime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTravelTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTravelTime.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllTravelTime.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getAllTravelTimeSlice.reducer;
