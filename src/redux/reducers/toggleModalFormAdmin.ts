import { createSlice } from '@reduxjs/toolkit';

interface IInitialStateObjModel {
  toggleModalAdmin: boolean;
}
const initialState: IInitialStateObjModel = {
  toggleModalAdmin: false,
};

const toggleModalAdminSlice = createSlice({
  name: 'toggleModalAdmin',
  initialState,
  reducers: {
    toggleModalAdminFunction: (state) => {
      state.toggleModalAdmin = !state.toggleModalAdmin;
    },
  },
});

export default toggleModalAdminSlice.reducer;
export const { toggleModalAdminFunction } = toggleModalAdminSlice.actions;
