/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

const initialState: any = {
  idPhoto: 0,
  loading: false,
  data: [],
};

export const getOnePhoto = createAsyncThunk('getOnePhoto', async () => {
  try {
    const { data } = await instanceApiDefault.get(`/galery`);

    return data;
  } catch (error) {
    throw new Error('Get One Photo Error');
  }
});

const getOnePhotoSlice = createSlice({
  name: 'getOneFacilitie',
  initialState,
  reducers: {
    getIdPhoto: (state, { payload }) => {
      state.idPhoto = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOnePhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOnePhoto.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      })
      .addCase(getOnePhoto.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getOnePhotoSlice.reducer;

export const { getIdPhoto } = getOnePhotoSlice.actions;
