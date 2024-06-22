/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const createConditions = createAsyncThunk(
  'createConditions',
  async (formData: any) => {
    try {
      const { data } = await instanceApiDefault.post(`/condition`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Create condition Error');
    }
  },
);

const createNewConditionSlice = createSlice({
  name: 'createNewCity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createConditions.pending, (state) => {
        state.loading = true;
      })
      .addCase(createConditions.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createConditions.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default createNewConditionSlice.reducer;
