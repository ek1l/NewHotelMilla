/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
  idUserEdit: number;
};

const initialState: InitialObjectState = {
  loading: false,
  idUserEdit: 0,
};

export const editUser = createAsyncThunk(
  'editUser',
  async (formDataAndId: any) => {
    try {
      const { data } = await instanceApiDefault.patch(
        `user/${formDataAndId.id}`,
        formDataAndId.formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return data;
    } catch (error) {
      throw new Error('Edit User Error');
    }
  },
);

const editUserSlice = createSlice({
  name: 'editUser',
  initialState,
  reducers: {
    getIdUserEdit(state, { payload }) {
      state.idUserEdit = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default editUserSlice.reducer;

export const { getIdUserEdit } = editUserSlice.actions;
