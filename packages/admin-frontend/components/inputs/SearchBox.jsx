import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import {
  Box,
  Autocomplete,
  TextField,
  InputAdornment,
  CssBaseline, Stack,
  InputBase,
  MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  FilledInput,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import {
  Dashboard,
} from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';

export const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#FDFDFD',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  right: 0,
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  background: 'pink',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const options = ["Option 1", "Option 2", "Option 3"];

export function SearchAutocomplete() {
  return (
    <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        // disableClearable
        options={options}
        sx={{
          width: '60%',
          bgcolor: 'white',
          borderRadius: '10px',
          border: 'none',
        }}
        clearIcon={
          <IconButton>
            <ClearIcon sx={{ color: '#A4A4A4',}}/>
          </IconButton>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder='Search here'
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton>
                                    <SearchIcon sx={{
                    color: '#A4A4A4',
                  }}/>
                </IconButton>
                ),
                ...params.InputProps,
              },
            }} sx={{
              border: 'none',
            }}
          />
        )}
      />
  );
}