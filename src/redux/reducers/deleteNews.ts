import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteNews = createAsyncThunk('deleteNews', async (id) => {
  try {
    const { data } = await instanceApiDefault.delete(`/news/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Delete News Error');
  }
});

const deleteNewsSlice = createSlice({
  name: 'deleteNews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNews.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteNews.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteNewsSlice.reducer;
