/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

const initialState = {
  loading: false,
  data: [],
};

export const getAllhotels = createAsyncThunk('getAllhotels', async () => {
  try {
    const { data } = await instanceApiDefault.get(`/hotel`);
    return data;
  } catch (error) {
    throw new Error('Get all Hotels Error');
  }
});

export const getAllhotelsParams = createAsyncThunk(
  'getAllhotelsParams',
  async (parametro: string) => {
    const parameter = parametro.replace(`${parametro[0]}`, '');
    console.log(parametro);
    try {
      const { data } = await instanceApiDefault.get(`/hotel?${parameter} `);
      return data;
    } catch (error) {
      throw new Error('Get  Hotels Params Error');
    }
  },
);

export const getHotelFilter = createAsyncThunk(
  'getHotelFilter',
  async (filter: string) => {
    try {
      const { data } = await instanceApiDefault.get(`/hotel`);
      const lowercaseFilter = filter.toLowerCase();
      const filterData = data.filter((hotel: any) => {
        const sportMatch = hotel.sport.some(
          (sport: any) => sport.sport.toLowerCase() === lowercaseFilter,
        );
        return sportMatch;
      });
      return filterData;
    } catch (error) {
      throw new Error('Get Hotels Filter Error');
    }
  },
);

const getAllhotelsSlice = createSlice({
  name: 'getAllhotels',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllhotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllhotels.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllhotels.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllhotelsParams.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllhotelsParams.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getAllhotelsParams.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getHotelFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHotelFilter.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(getHotelFilter.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default getAllhotelsSlice.reducer;
