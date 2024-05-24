/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type DataObjectSports = {
  id: number;
  name: string;
  photo: string;
  role: string;
};

type InitialObjectState = {
  loading: boolean;
  data: DataObjectSports[];
};

const initialState: InitialObjectState = {
  loading: false,
  data: [],
};

export const getAllPlayers = createAsyncThunk('getAllPlayers', async () => {
  try {
    const { data } = await instanceApiDefault.get(`/team`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Get All Players Error');
  }
});

const getAllPlayersSlice = createSlice({
  name: 'getAllPlayers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlayers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlayers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllPlayers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getAllPlayersSlice.reducer;
