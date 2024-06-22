/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createNewPhotoGalery = createAsyncThunk(
  'createNewPhotoGalery',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(`/galery`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Create Photo Galery Error');
    }
  },
);

const createNewPhotoGalerySlice = createSlice({
  name: 'createNewPhotoGalery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewPhotoGalery.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewPhotoGalery.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createNewPhotoGalery.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createNewPhotoGalerySlice.reducer;
