import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import {

    Typography,

    ListItemButton,
    ListItemIcon,

} from '@mui/material';

// import MuiDrawer from '@mui/material/Drawer';

import MailIcon from '@mui/icons-material/Mail';


export default function MenuButton({ open, label, selected, icon, }) {
    const listOpenSx = open ? { justifyContent: 'initial' } : { justifyContent: 'center' }
    const listItemIconSx = open ? { mr: 3 } : { mr: 'auto' }
    const listItemTextSx = open ? { opacity: 1, } : { opacity: 0 }
    const theme = useTheme();

    const sxState = selected ? { backgroundColor: 'rgba(0, 176, 116,0.15)', color: '#00B074', fontWeight: 'bold', }
        : { backgroundColor: 'transparent', color: '#464255', fontWeight: theme.fontWeight.medium, }
    return (
        <ListItemButton
            sx={[
                {

                    minHeight: 48,
                    px: 2.5,
                    ...sxState,
                    '&:hover': {
                        backgroundColor: 'rgba(0, 176, 116,0.15)',
                        color: '#00B074',
                        fontWeight: 'bold',
                    }
                },
                listOpenSx,
            ]}
        >
            <ListItemIcon
                sx={[
                    {
                        minWidth: 0,
                        justifyContent: 'center',
                        fontWeight: 'inherit',
                        color: 'inherit',
                    },
                    listItemIconSx,
                ]}
            >
                {icon || (<MailIcon />)}
            </ListItemIcon>
            {/* <ListItemText
          primary={text}
          // secondary="Jan 9, 2014"
          sx={{
            ...listItemTextSx,
            fontWeight: 'bold',
          }}
        /> */}
            <Typography sx={{ fontWeight: 'inherit', textDecoration: 'none', }}>
                {open ? label : ''}
            </Typography>
        </ListItemButton>
    )
}