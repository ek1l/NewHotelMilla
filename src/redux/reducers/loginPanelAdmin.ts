/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type dataType = {
  user: string;
};

type initialStateObjectType = {
  loading: boolean;
  data: [] | dataType[];
};

const initialState: initialStateObjectType = {
  loading: false,
  data: [],
};

export const loginAdminUser = createAsyncThunk(
  'loginAdminuser',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post('auth/login', formData);
 
      if (data.token && data.role === 'admin') {
        localStorage.setItem('token', data.token);
        return data;
      } else {
        localStorage.clear();
        throw new Error('Login error');
      }
    } catch (error) {
      throw new Error('Login error');
    }
  },
);

const loginAdminSlice = createSlice({
  name: 'loginAdmin',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = [];
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdminUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAdminUser.fulfilled, (state, { payload }) => {
        state.data = [payload];
        state.loading = false;
      })
      .addCase(loginAdminUser.rejected, (state) => {
        state.data = [];
        state.loading = false;
      });
  },
});

export default loginAdminSlice.reducer;

export const { logout } = loginAdminSlice.actions;
