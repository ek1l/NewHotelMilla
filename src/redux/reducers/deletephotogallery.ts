import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deletePhotoGalery = createAsyncThunk(
  'deletePhotoGalery',
  async (id) => {
    try {
      const { data } = await instanceApiDefault.delete(`/galery/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Delete Photo Error');
    }
  },
);

const deletePhotoGalerySlice = createSlice({
  name: 'deletePhotoGalery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePhotoGalery.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePhotoGalery.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePhotoGalery.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deletePhotoGalerySlice.reducer;
