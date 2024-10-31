// styles/GlobalStyles.js
'use client';
import { createGlobalStyle } from 'styled-components';

// theme.js
import { createTheme } from '@mui/material/styles';


export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black color for buttons and text
    },
    secondary: {
      main: '#f5f5f5', // Light gray for backgrounds
    },
    text: {
      primary: '#000000', // Dark gray for general text
      secondary: '#f5f5f5', // Lighter gray for less prominent text
    },
    hover:{
      primary: 'rgb(95, 95, 95,0.2)', // Green for the logo
      secondary:  '#f5f5f5', // Green for buttons and links
      success: '#007b55', // Green for buttons and links
    },
    background: {
      default: '#f9f9f9', // Very light gray background for the main content area
      paper: '#ffffff', // White for cards and paper elements
    },
    info: {
      main: '#007b55', // Green for "In Stock" and similar tags
    },
    divider: '#e0e0e0', // Divider color,
    appbar: {
      background: '#FFFFFF',
      primary: '#000000',
    }
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: { 
      fontSize: '2rem',
      fontWeight: 700,
      color: '#000000',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#000000',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#000000',
    },
    subtitle1: {
      fontSize: '1rem',
      color: '#333333', // Dark gray for subtitles
    },
    body1: {
      fontSize: '0.875rem',
      color: '#555555', // Standard body text color
    },
    button: {
      fontWeight: 700,
      textTransform: 'uppercase',
      color: '#000000',
      backgroundColor: '#007b55',
    },
  },
  spacing: 8,
  MuiButton: {
    styleOverrides: {
      root: {
        textAlign: 'center',
        borderRadius: '4px',
        padding: '8px 16px',
        fontSize: '1rem',
        color: '#007b55', // Text color
      },
      contained: {
        backgroundColor: '#000000',
        color: '#ffffff', // Text color for contained variant
        '&:hover': {
          backgroundColor: '#333333',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          padding: '16px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '8px',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#e0e0e0',
          margin: '16px 0',
        },
      },
    },
  },
});

export default theme;

    // background-color: ${({ theme }) => {
    //   console.log(theme);
    //   return 'red';
    // }};
    // color: ${({ theme }) => 'red'};

export const GlobalStyles = createGlobalStyle`
  body {

    transition: background-color 0.3s ease;
  }
`;
