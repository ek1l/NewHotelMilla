/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createNewSport = createAsyncThunk(
  'createNewSport',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(`/sport`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Create sport Error');
    }
  },
);

const createNewSportSlice = createSlice({
  name: 'createNewSport',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewSport.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewSport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewSport.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createNewSportSlice.reducer;
