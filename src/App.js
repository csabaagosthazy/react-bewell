import React, { useState } from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './context/RouterProvider';
import SplashScreen from './pages/SplashScreen';
import { getInitialLocale } from './utils/localeUtils';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <SplashScreen
          onFinish={() => setLoading(false)}
          language={getInitialLocale()}
        />
      )}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
