import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteTravelTime = createAsyncThunk(
  'deleteTravelTime',
  async (id) => {
    try {
      const { data } = await instanceApiDefault.delete(`/traveltime/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Delete Travel Time Error');
    }
  },
);

const deleteTravelTimeSlice = createSlice({
  name: 'deleteTravelTime',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTravelTime.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTravelTime.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteTravelTime.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteTravelTimeSlice.reducer;
