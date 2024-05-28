import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

interface IIData {
  id: number;
  condition: string;
}
type InitialObjectState = {
  loading: boolean;
  data: [] | IIData[];
};

const initialState: InitialObjectState = {
  loading: false,
  data: [],
};

export const getAllCondition = createAsyncThunk('getAllCondition', async () => {
  try {
    const { data } = await instanceApiDefault.get(`/conditions`);
    return data;
  } catch (error) {
    throw new Error('Get All Conditions  Error');
  }
});

const getAllConditionSlice = createSlice({
  name: 'getAllCondition',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCondition.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCondition.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllCondition.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getAllConditionSlice.reducer;
