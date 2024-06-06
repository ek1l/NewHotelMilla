import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteUser = createAsyncThunk('deleteUser', async (id) => {
  try {
    const { data } = await instanceApiDefault.delete(`user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Delete User Error');
  }
});

const deleteUserSlice = createSlice({
  name: 'deleteUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteUserSlice.reducer;
