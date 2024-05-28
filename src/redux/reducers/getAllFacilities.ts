import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';
import { Draft } from 'immer';

type DataType = {
  id: number;
  icon: string;
  facility: string;
};

type InitialObjectState = {
  loading: boolean;
  data: [] | Draft<DataType>[];
};

const initialState: InitialObjectState = {
  loading: false,
  data: [],
};

export const getAllFacilities = createAsyncThunk(
  'getAllFacilities',
  async (): Promise<DataType[]> => {
    try {
      const { data } = await instanceApiDefault.get('facilities');
      return data;
    } catch (error) {
      throw new Error('Get all Facilities Error');
    }
  },
);

const getAllFacilitiesSlice = createSlice({
  name: 'getAllUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFacilities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllFacilities.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      })
      .addCase(getAllFacilities.rejected, (state) => {
        state.data = [];
        state.loading = false;
      });
  },
});

export default getAllFacilitiesSlice.reducer;
