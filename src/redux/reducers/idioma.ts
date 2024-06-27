/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  english: false,
  dutch: true,
};

const changeIdiomaSlice = createSlice({
  name: 'changeIdioma',
  initialState,
  reducers: {
    setEnglish: (state) => {
      state.english = true;
      state.dutch = false;
      localStorage.setItem('language', 'english');
    },
    setDutch: (state) => {
      state.english = false;
      state.dutch = true;
      localStorage.setItem('language', 'dutch');
    },
    alternateIdioma: (state:any) => {
      console.log(state.english);
      console.log(state.dutch);
      if (state.english) {
        state.english = false;
        state.dutch = true;
        localStorage.setItem('language', 'dutch');
      } else {
        state.english = true;
        state.dutch = false;
        localStorage.setItem('language', 'english');
      }
    },
  },
});

export default changeIdiomaSlice.reducer;

export const { setEnglish, setDutch, alternateIdioma } =
  changeIdiomaSlice.actions;
