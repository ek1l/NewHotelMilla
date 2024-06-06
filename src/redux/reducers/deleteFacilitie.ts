import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteFacilities = createAsyncThunk(
  'deleteFacilities',
  async (id) => {
    try {
      const { data } = await instanceApiDefault.delete(`/facilities/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Delete Facilities Error');
    }
  },
);

const deleteFacilitiesSlice = createSlice({
  name: 'deleteFacilities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteFacilities.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteFacilities.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteFacilities.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteFacilitiesSlice.reducer;
