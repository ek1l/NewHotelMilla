import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

const initialState = {
  loading: false,
  idHotel: 0,
};

export const editHotel = createAsyncThunk('editHotel', async (objToSend) => {
  try {
    const { data } = await instanceApiDefault.patch(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `/hotels/${objToSend.id}`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      objToSend.data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error('Edit hotel Error');
  }
});

const editHotelSlice = createSlice({
  name: 'editHotel',
  initialState,
  reducers: {
    setIdHotelZero: (state) => {
      state.idHotel = 0;
    },
    setIdHotel: (state, { payload }) => {
      state.idHotel = 0;
      state.idHotel = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editHotel.pending, (state) => {
        state.loading = true;
      })
      .addCase(editHotel.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editHotel.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default editHotelSlice.reducer;
export const { setIdHotel, setIdHotelZero } = editHotelSlice.actions;
