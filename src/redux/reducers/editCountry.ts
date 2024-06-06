/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const editCountry = createAsyncThunk(
  'editCountry',
  async (idAndNameUpdate) => {
    try {
      const { data } = await instanceApiDefault.patch(
        // @ts-ignore
        `/address/country/${idAndNameUpdate.id}`,
        // @ts-ignore
        idAndNameUpdate.value,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      return data;
    } catch (error) {
      throw new Error('Edit Country Error');
    }
  },
);

const editCountrySlice = createSlice({
  name: 'editCountry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCountry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCountry.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default editCountrySlice.reducer;
