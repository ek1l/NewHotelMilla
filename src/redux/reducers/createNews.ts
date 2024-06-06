/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createNews = createAsyncThunk(
  'createNews',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(`/news/create`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Create News Error');
    }
  },
);

const createNewsSlice = createSlice({
  name: 'createNews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNews.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNews.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createNewsSlice.reducer;
