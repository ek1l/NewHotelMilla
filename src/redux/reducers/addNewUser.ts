import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const addNewUserr = createAsyncThunk('addNewUser', async (formData) => {
  try {
    const { data } = await instanceApiDefault.post(`user/register`, formData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    return data;
  } catch (error) {
    throw new Error('Create  User Error');
  }
});

const addNewUserSlice = createSlice({
  name: 'adddNewUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewUserr.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewUserr.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewUserr.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default addNewUserSlice.reducer;
