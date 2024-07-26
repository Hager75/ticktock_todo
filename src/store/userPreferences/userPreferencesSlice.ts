import { createSlice } from '@reduxjs/toolkit';

import { THEME_MODE } from '../../utils/Constants';

const initialState = {
    theme: localStorage.getItem('theme') || THEME_MODE.light,
    language: localStorage.getItem('language') || 'en',
};

const userPreferencesSlice = createSlice({
    name: 'userPreferences',
    initialState,
    reducers: {
      toggleTheme: (state) => {
          state.theme = state.theme === THEME_MODE.light ? THEME_MODE.dark : THEME_MODE.light;
          localStorage.setItem('theme', state.theme);
          document.documentElement.classList.remove(THEME_MODE.light,THEME_MODE.dark);
          document.documentElement.classList.add(state.theme);
      },
      setLanguage: (state, action) => {
        state.language = action.payload;
        localStorage.setItem('language', state.language);
      },
    },
  });
  
export const { toggleTheme, setLanguage } = userPreferencesSlice.actions;
export default userPreferencesSlice.reducer;