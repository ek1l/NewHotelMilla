import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteRating = createAsyncThunk('deleteRating', async (id) => {
  try {
    const { data } = await instanceApiDefault.delete(`/rating/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Delete Rating Error');
  }
});

const deleteRatingSlice = createSlice({
  name: 'deleteRating',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRating.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteRating.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteRatingSlice.reducer;
