import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  text: '',
};

const getTextparamsSlice = createSlice({
  name: 'getTextparamsSlice',
  initialState,
  reducers: {
    getTextParams(state, { payload }) {
      const params = state.text.toLowerCase().split('&');
      const paramName = payload.toLowerCase().split('=')[0];
      const paramValue = payload.toLowerCase().split('=')[1];

      if (paramName === 'city' && !paramValue) {
        return;
      }
      const existingParamIndex = params.findIndex((param) =>
        param.startsWith(`${paramName}=`),
      );

      if (existingParamIndex !== -1) {
        if (paramValue) {
          params[existingParamIndex] = `${paramName}=${paramValue}`;
        } else {
          params.splice(existingParamIndex, 1);
        }
      } else {
        params.push(`${paramName}=${paramValue}`);
      }

      state.text = params.join('&');
    },
    removeTextParam(state, { payload }) {
      const params = state.text.toLowerCase().split('&');
      const paramNameToRemove = payload.toLowerCase();
      const filteredParams = params.filter(
        (param) => !param.startsWith(`${paramNameToRemove}=`),
      );
      // Remove '&=undefined' from the filteredParams
      const finalParams = filteredParams.filter(
        (param) => param !== '&=undefined',
      );
      state.text = finalParams.join('&').toLowerCase();
    },
  },
});

export default getTextparamsSlice.reducer;
export const { getTextParams, removeTextParam } = getTextparamsSlice.actions;
