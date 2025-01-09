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
  discount: '#ffffff',
  boxShadow: {
    default: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
  },
  ...fonts,
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#ffffff',
    },
    thirdary: {
      main: '#f06292', // Pink
    },
    text: {
      primary: '#212121',
      thirdary: '#757575', // For secondary text
      secondary: '#ffffff', // For white text  
      subtitle: '#B9BBBF', // For subtitle text
      cartSubTiltle: '#A2A3B1', // For cart subtitle text
    },
    hover: {
      primary: 'rgb(95, 95, 95,0.2)', // Green for the logo
      secondary: '#f5f5f5', // Green for buttons and links
      success: '#007b55', // Green for buttons and links
    },
    background: {
      default: '#EFF7FA',
      paper: '#ffffff',
    },
    divider: '#e0e0e0', // Divider color,
    outline: {
      primary: '#A2A3B1',
    },
  },
  components: {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: 0,
          fontFamily: 'inherit',
          color:'#000000'
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: 'inherit',
          color:'#000000'
        },
      },
    },
    MuiTableCell:{
      styleOverrides: {
        root: {
          fontSize: 'inherit',
          // borderBottom: 'none',
        },
      },
    }
  },
  typography: {
    fontFamily: "inherit",
    h1: { fontWeight: 500 },
    h2: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 300 },
    button: {
      fontWeight: 700,
      textTransform: 'uppercase',
      color: 'inherit',
      backgroundColor: '#007b55',
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
