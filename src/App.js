import React, { useState, useMemo } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './context/RouterProvider';
import SplashScreen from './pages/SplashScreen';
import { getInitialLocale } from './utils/localeUtils';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const [loading, setLoading] = useState(true);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading && (
        <SplashScreen
          onFinish={() => setLoading(false)}
          language={getInitialLocale()}
        />
      )}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
