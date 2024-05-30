import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
};

export const getOneHotel = createAsyncThunk(
  'getOneHotel',
  async (id: string) => {
    try {
      const { data } = await instanceApiDefault.get(`/hotels/${id}`);
      return data;
    } catch (error) {
      throw new Error('Get One Hotel Error');
    }
  },
);

const getOneHotelSlice = createSlice({
  name: 'getOneHotel',
  initialState,
  reducers: {
    resetHotelData: (state) => {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneHotel.pending, (state) => {
        state.data = [];
        state.loading = true;
      })
      .addCase(getOneHotel.fulfilled, (state, { payload }) => {
        state.data = [];
        state.data = payload;
        state.loading = false;
      })
      .addCase(getOneHotel.rejected, (state) => {
        state.data = [];
        state.loading = false;
      });
  },
});

export default getOneHotelSlice.reducer;

export const { resetHotelData } = getOneHotelSlice.actions;
