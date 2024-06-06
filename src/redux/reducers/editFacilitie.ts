import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instanceApiDefault } from '../../api/apiDefault';

type InitialObjectState = {
  loading: boolean;
  idEditFacilitie: number;
};

const initialState: InitialObjectState = {
  loading: false,
  idEditFacilitie: 0,
};

export const editFacilitie = createAsyncThunk(
  'editFacilitie',
  async (idAndNameUpdate) => {
    try {
      const { data } = await instanceApiDefault.patch(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        `/facilities/${idAndNameUpdate.id}`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
      throw new Error('Edit Facilitie Error');
    }
  },
);

const editFacilitieSlice = createSlice({
  name: 'editFacilitie',
  initialState,
  reducers: {
    setIdEditFacilitie: (state, { payload }) => {
      state.idEditFacilitie = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editFacilitie.pending, (state) => {
        state.loading = true;
      })
      .addCase(editFacilitie.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editFacilitie.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default editFacilitieSlice.reducer;
export const { setIdEditFacilitie } = editFacilitieSlice.actions;
