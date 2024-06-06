import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
};

const initialState: InitialObjectState = {
  loading: false,
};

export const deletePlayer = createAsyncThunk('deletePlayer', async (id) => {
  try {
    const { data } = await instanceApiDefault.delete(`/team/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return data;
  } catch (error) {
    throw new Error('Delete Player Error');
  }
});

const deletePlayerTeamSlice = createSlice({
  name: 'deletePlayer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePlayer.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlayer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePlayer.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default deletePlayerTeamSlice.reducer;
