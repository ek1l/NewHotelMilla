/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
};

export const getAllPhotosGallery = createAsyncThunk(
  'getAllPhotosGallery',
  async () => {
    try {
      const { data } = await instanceApiDefault.get(`/galery`);
      return data;
    } catch (error) {
      throw new Error('Get All Photos Error');
    }
  },
);

const getAllPhotosGallerySlice = createSlice({
  name: 'getAllPhotosGallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPhotosGallery.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPhotosGallery.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllPhotosGallery.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getAllPhotosGallerySlice.reducer;
