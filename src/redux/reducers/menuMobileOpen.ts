import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

export const mobileMenuOpenSlice = createSlice({
  name: 'mobileMenuOpen',
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.open = !state.open;
    },
  },
});

export default mobileMenuOpenSlice.reducer;
export const { toggleMenu } = mobileMenuOpenSlice.actions;
