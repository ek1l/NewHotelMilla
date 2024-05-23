import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: true,
};

const notifyEmailSendSlice = createSlice({
  name: 'notifyEmailSend',
  initialState,
  reducers: {
    notifyEmailSend: (state) => {
      state.active = !state.active;
    },
  },
});

export default notifyEmailSendSlice.reducer;
export const { notifyEmailSend } = notifyEmailSendSlice.actions;
