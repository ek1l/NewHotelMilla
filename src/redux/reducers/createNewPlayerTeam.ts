/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createNewPlayer = createAsyncThunk(
  'createNewPlayer',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(`/team/create`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Create Player Error');
    }
  },
);

const createNewPlayerSlice = createSlice({
  name: 'createNewPlayer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewPlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewPlayer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewPlayer.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createNewPlayerSlice.reducer;
