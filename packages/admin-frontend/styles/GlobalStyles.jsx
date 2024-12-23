// styles/GlobalStyles.js
'use client';
import { createGlobalStyle } from 'styled-components';

// theme.js
import { createTheme } from '@mui/material/styles';

const fonts={
  fontWeight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900
  },
  fontFamily: {
    roboto: 'Roboto, sans-serif',
    publicSans: 'Public Sans, sans-serif',
    montserrat: 'Montserrat, sans-serif',
    lato: 'Lato, sans-serif',
    inter: 'Inter, sans-serif',
    barlow: 'Barlow, sans-serif',
  },
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#17c6b1', // Green
      
    },
    secondary: {
      main: '#42a5f5', // Blue
    },
    thirdary: {
      main: '#f06292', // Pink
    },
    background: {
      default: '#f9f9f9', // Light Gray
      paper: '#ffffff',  // White
    },
    error: {
      main: '#ef5350', // Red
    },
    warning: {
      main: '#ffa726', // Orange
    },
    success: {
      main: '#66bb6a', // Green
      secondary: '#00B074'
    },
    text: {
      primary: '#2f2f2f', // Dark gray text
      secondary: '#6f6f6f', // Lighter gray text
      thirdary: '#667085',
    },
  },
  ...fonts,
  typography: {
    fontFamily: 'Roboto, Inter, Arial, sans-serif',
    h1: { fontWeight: 500 },
    h2: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 300 },
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
      },
    }},
    MuiTypography:{
      styleOverrides:{
        root:{
          fontFamily: 'inherit',
        }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none', // Disable uppercase text
        },
      },
    },
  },
});


export default theme;


export const GlobalStyles = createGlobalStyle`
  body {

    transition: background-color 0.3s ease;
  }
`;
