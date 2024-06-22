import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteCity = createAsyncThunk('deleteCity', async (id) => {
  try {
    const { data } = await instanceApiDefault.delete(`/address/city/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Delete City Error');
  }
});

const deleteCitySlice = createSlice({
  name: 'deleteCountry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCity.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteCitySlice.reducer;
