import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';
import { Draft } from 'immer';

type DataType = {
  name: string;
  icon: string;
};

type InitialObjectState = {
  loading: boolean;
  data: [] | Draft<DataType>[];
};

const initialState: InitialObjectState = {
  loading: false,
  data: [],
};

export const getOneFacilitie = createAsyncThunk('getOneUser', async (id) => {
  try {
    const { data } = await instanceApiDefault.get(`/facilities/`);
    const facilitie = data.filter(
      (facility: { id: void }) => facility.id === id,
    );
    return facilitie;
  } catch (error) {
    throw new Error('Get One Facilitie Error');
  }
});

const getOneFacilitieSlice = createSlice({
  name: 'getOneFacilitie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneFacilitie.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneFacilitie.fulfilled, (state, { payload }) => {
        state.data = [];
        state.data = payload;
        state.loading = false;
      })
      .addCase(getOneFacilitie.rejected, (state) => {
        state.data = [];
        state.loading = false;
      });
  },
});

export default getOneFacilitieSlice.reducer;
