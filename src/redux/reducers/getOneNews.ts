/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
};

export const getOneNews = createAsyncThunk('getOneNews', async (id: any) => {
  try {
    const { data } = await instanceApiDefault.get(`/news/${id}`);
  
    return data;
  } catch (error) {
    throw new Error('Get One Hotel Error');
  }
});

const getOneNewsSlice = createSlice({
  name: 'getOneNews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneNews.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      })
      .addCase(getOneNews.rejected, (state) => {
        state.data = [];
        state.loading = false;
      });
  },
});

export default getOneNewsSlice.reducer;
