import { createSlice } from '@reduxjs/toolkit';
const lang = localStorage.getItem('language');
const initialState = {
  language: lang || 'en',
  rtl: lang
    ? lang === 'en'
      ? false
      : true
    : (localStorage.setItem('language', 'en'), false),
};

const languageSlice = createSlice({
  name: 'languageSlice',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    changeRtl: (state, action) => {
      state.rtl = action.payload;
    },
  },
});

export const { changeLanguage, changeRtl } = languageSlice.actions;
export default languageSlice.reducer;
