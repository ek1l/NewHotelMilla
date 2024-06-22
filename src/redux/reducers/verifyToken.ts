/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type dataType = {
  valid: boolean;
  role: string;
};

type initialStateObjectType = {
  loading: boolean;
  data: [] | dataType[];
};

const initialState: initialStateObjectType = {
  loading: false,
  data: [],
};

export const verifyTokenUser = createAsyncThunk(
  'verifyToken',
  async (): Promise<any> => {
    try {
      const { data } = await instanceApiDefault.post(
        'auth/verifyToken',
        {
          token: localStorage.getItem('token'),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      if (data.role === 'admin' && data.valid === true) {
        return data;
      } else {
        localStorage.clear();
        throw new Error('Verify Token Failed');
      }
    } catch (error) {
      throw new Error('Verify Token Failed');
    }
  },
);

const verifyTokenSlice = createSlice({
  name: 'loginAdmin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyTokenUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyTokenUser.fulfilled, (state, { payload }) => {
        state.data = [payload];
        state.loading = false;
      })
      .addCase(verifyTokenUser.rejected, (state) => {
        state.data = [];
        state.loading = false;
      });
  },
});

export default verifyTokenSlice.reducer;
