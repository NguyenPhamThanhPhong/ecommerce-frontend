// pages/_app.js
import NonLoginLayout from '@components/AuthenticatedLayout';
// import { darkTheme, lightTheme } from './theme';
import { Button,ThemeProvider, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { theme, GlobalStyles } from '../styles/GlobalStyles';


function MyApp(params) {
  const noLayoutRoutes = ['/login', '/register', '/auth']; // Add your login-related routes here

  // const [isDarkMode, setIsDarkMode] = useState(false);

  const { Component, pageProps, router } = params;


  const isNoLayout = noLayoutRoutes.includes(router.pathname);

  // If the page is a login-related page, don't wrap it in the layout
  if (isNoLayout) {
    return <Component {...pageProps} />;
  }

  // For non-login pages, wrap with the layout
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <NonLoginLayout>
      {/* <Button onClick={() => setIsDarkMode(!isDarkMode)}>
        Toggle Theme
      </Button> */}
        <Component {...pageProps} />
      </NonLoginLayout>
    </ThemeProvider>
  );
}

export default MyApp;
