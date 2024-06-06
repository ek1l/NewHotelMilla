/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

const initialState = {
  loading: false,
  idEditNews: 0,
};

export const editNews = createAsyncThunk('editNews', async (obj: any) => {
  try {
    const { data } = await instanceApiDefault.patch(
      `/news/${obj.id}`,
      obj.dataNews,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error('Edit News Error');
  }
});

const editNewsSlice = createSlice({
  name: 'editNews',
  initialState,
  reducers: {
    setIdEditNews: (state, { payload }) => {
      state.idEditNews = 0;
      state.idEditNews = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(editNews.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editNews.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default editNewsSlice.reducer;

export const { setIdEditNews } = editNewsSlice.actions;
