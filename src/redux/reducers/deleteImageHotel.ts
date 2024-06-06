import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteImageHotel = createAsyncThunk(
  'deleteImageHotel',
  async (id) => {
    try {
      const { data } = await instanceApiDefault.delete(`/hotels/image/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Delete Image Hotel Error');
    }
  },
);

const deleteImageHotelSlice = createSlice({
  name: 'deleteImageHotel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteImageHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteImageHotel.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteImageHotel.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteImageHotelSlice.reducer;
