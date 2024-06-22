import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deleteSport = createAsyncThunk('deleteSport', async (id) => {
  try {
    const { data } = await instanceApiDefault.delete(`/sport/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Delete Sport Error');
  }
});

const deleteSportSlice = createSlice({
  name: 'deleteSport',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSport.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSport.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteSport.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deleteSportSlice.reducer;
