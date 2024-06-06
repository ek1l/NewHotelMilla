import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteCountry = createAsyncThunk('deleteCountry', async (id) => {
  try {
    const { data } = await instanceApiDefault.delete(`/address/country/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Delete Country Error');
  }
});

const deleteCountrySlice = createSlice({
  name: 'deleteCountry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCountry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCountry.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteCountrySlice.reducer;
