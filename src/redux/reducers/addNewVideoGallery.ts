import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const addNewVideoGallery = createAsyncThunk(
  'addNewVideoGallery',
  async (formData) => {
    try {
      const { data } = await instanceApiDefault.post(
        `galery/create/movie`,
        formData,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        },
      );
      return data;
    } catch (error) {
      throw new Error('Add new Video Error');
    }
  },
);

const addNewVideoGallerySlice = createSlice({
  name: 'addNewVideoGallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewVideoGallery.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewVideoGallery.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewVideoGallery.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default addNewVideoGallerySlice.reducer;
