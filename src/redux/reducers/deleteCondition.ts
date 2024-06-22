import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteCondition = createAsyncThunk(
  'deleteCondition',
  async (id) => {
    try {
      const { data } = await instanceApiDefault.delete(`/condition/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Delete Conditions Error');
    }
  },
);

const deleteConditionSlice = createSlice({
  name: 'deleteCondition',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCondition.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCondition.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCondition.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteConditionSlice.reducer;
