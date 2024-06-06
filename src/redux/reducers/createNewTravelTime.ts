/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createTravelTime = createAsyncThunk(
  'createTravelTime',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(
        `/traveltime/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return data;
    } catch (error) {
      throw new Error('Create travelTime Error');
    }
  },
);

const createNewTravelTimeSlice = createSlice({
  name: 'createNewCity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTravelTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTravelTime.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTravelTime.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createNewTravelTimeSlice.reducer;
