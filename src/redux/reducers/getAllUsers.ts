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

export const getAllusers = createAsyncThunk(
  'getAllusers',
  async (): Promise<DataType[]> => {
    try {
      const { data } = await instanceApiDefault.get('user', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Get all Users Error');
    }
  },
);

const getAllusersSlice = createSlice({
  name: 'getAllUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllusers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllusers.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      })
      .addCase(getAllusers.rejected, (state) => {
        state.data = [];
        state.loading = false;
      });
  },
});

export default getAllusersSlice.reducer;
