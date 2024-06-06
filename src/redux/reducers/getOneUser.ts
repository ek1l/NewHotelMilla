/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';
import { Draft } from 'immer';

type DataType = {
  email: string;
  id: number;
  username: string;
  role: string;
};

type InitialObjectState = {
  loading: boolean;
  data: [] | Draft<DataType>[];
};

const initialState: InitialObjectState = {
  loading: false,
  data: [],
};

export const getOneUserId = createAsyncThunk('getOneUser', async (id) => {
  try {
    const { data } = await instanceApiDefault.get(`user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(data);
    const user = data.filter((user: { id: any }) => user.id === id);
    return user;
  } catch (error) {
    throw new Error('Get One User Error');
  }
});

const getOneUserSlice = createSlice({
  name: 'getAllUsers',
  initialState,
  reducers: {
    getUserClear(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneUserId.fulfilled, (state, { payload }) => {
        state.data = [];
        state.data = payload;
        state.loading = false;
      })
      .addCase(getOneUserId.rejected, (state) => {
        state.data = [];
        state.loading = false;
      });
  },
});

export default getOneUserSlice.reducer;

export const { getUserClear } = getOneUserSlice.actions;
