/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
};

export const getAllnews = createAsyncThunk('getAllnews', async () => {
  try {
    const { data } = await instanceApiDefault.get(`/news`);
    return data;
  } catch (error) {
    throw new Error('Get All News Error');
  }
});

const getAllnewsSlice = createSlice({
  name: 'getAllnews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllnews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllnews.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllnews.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getAllnewsSlice.reducer;
