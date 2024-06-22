import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteHotel = createAsyncThunk('deleteHotel', async (id) => {
  try {
    const { data } = await instanceApiDefault.delete(`/hotel/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Delete Hotel Error');
  }
});

const deleteHotelSlice = createSlice({
  name: 'deleteHotel',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteHotel.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteHotel.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteHotelSlice.reducer;
