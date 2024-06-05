import { createSlice } from '@reduxjs/toolkit';

interface IInitialStateObjModel {
  toggleModal: boolean;
}

const initialState: IInitialStateObjModel = {
  toggleModal: false,
};

const toggleModalSlice = createSlice({
  name: 'toggleModal',
  initialState,
  reducers: {
    toggleModalFunction: (state) => {
      state.toggleModal = !state.toggleModal;
    },
  },
});

export default toggleModalSlice.reducer;
export const { toggleModalFunction } = toggleModalSlice.actions;
