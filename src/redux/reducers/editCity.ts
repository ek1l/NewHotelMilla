/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const editCity = createAsyncThunk(
  'editCity',
  async (idAndNameUpdate) => {
    try {
      const { data } = await instanceApiDefault.patch(
        // @ts-ignore
        `/address/city/${idAndNameUpdate.id}`,
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
      throw new Error('Edit City Error');
    }
  },
);

const editCitySlice = createSlice({
  name: 'editCity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(editCity.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCity.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default editCitySlice.reducer;
