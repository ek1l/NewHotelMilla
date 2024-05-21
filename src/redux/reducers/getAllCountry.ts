import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';
interface IIDataCities {
  id: number;
  name: string;
  countryId: number;
}

interface IIData {
  id: number;
  name: string;
  cities: IIDataCities[];
}

type InitialObjectState = {
  loading: boolean;
  data: [] | IIData[];
};

const initialState: InitialObjectState = {
  loading: false,
  data: [],
};

export const getAllCountry = createAsyncThunk(
  'getAllCountry',
  async (): Promise<IIData[]> => {
    try {
      const { data } = await instanceApiDefault.get(`/address/country/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return data;
    } catch (error) {
      throw new Error('Get All Country  Error');
    }
  },
);

const getAllCountrySlice = createSlice({
  name: 'getAllCountry',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCountry.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllCountry.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getAllCountrySlice.reducer;
