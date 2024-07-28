import { useEffect } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { THEME_MODE } from "./utils/Constants";
import AppRoutes from "./routes/AppRoutes";
import { useAppSelector } from "./store";
import "./App.scss";

function App() {
  const themeMode = useAppSelector((state) => state.userPreferences?.theme);

  const theme = createTheme({
    palette: {
      mode: themeMode === THEME_MODE.light ? 'light' : 'dark',
      text: {
        primary: themeMode === THEME_MODE.light ? '#000000' : '#ffffffb3',
      },
    },
  });

  useEffect(() => {
    if (themeMode) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(themeMode);
    }
  }, [themeMode]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={themeMode} />
    </ThemeProvider>
  );
}

export default App;
