import {
    Box, Typography,
    FormControl, InputLabel, Select,
    MenuItem, Checkbox, FormGroup, FormControlLabel,
    Slider, Divider, Avatar, Stack, Card, TextField,
    InputAdornment,
    ClickAwayListener
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




export function FilterLabel({ children, mt, fontSize, mr }) {
    const theme = useTheme();
    if (mt === undefined) mt = 2;
    fontSize = fontSize || '14px';
    mr = mr || 0;

    return (
        <Typography variant="subtitle1" sx={{
            fontSize: fontSize,
            mr: mr,
            mt: mt, fontWeight: theme.fontWeight.medium
        }}>
            {children}
        </Typography>
    );
}

export function FilterPrice({ width }) {
    const inputBackground = 'rgba(173, 216, 230,0.2)';
    const labelFontsize = '19px';


    return (
        <Stack display="flex" gap={1} mt={1} direction='row'>
            <FormControlLabel
                sx={{
                    marginLeft: -1,

                    '& .MuiFormControlLabel-label': {
                        fontSize: labelFontsize,
                        marginRight: 1,
                    }
                }}
                control={<TextField
                    id="outlined-number"
                    type="number"
                    label="From"
                    sx={{
                        backgroundColor: inputBackground,
                        width: 100
                    }}
                />}
                labelPlacement='start'
                label="$"
            />
            <FormControlLabel
                sx={{
                    '& .MuiFormControlLabel-label': {
                    },
                    '& .MuiFormControlLabel-label': {
                        fontSize: labelFontsize,
                        marginRight: 1,
                    }
                }}
                control={<TextField
                    id="outlined-number"
                    type="number"
                    label="To"
                    sx={{
                        backgroundColor: inputBackground,
                        width: 100
                    }}
                />}
                labelPlacement='start'
                label="$"
            />
        </Stack>
    )
}


export function FilterSelect({ children, mt, categories, fontSize }) {
    if (mt === undefined) mt = 1;
    categories = categories || ["None", "BEST SELLING", "Mobile Phones", "Laptops", "Tablets", "Smart Watches", "Accessories"];
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    return (
        <Select
            defaultValue={categories[0]}
            IconComponent={(_props) => {
                if (_props.className.includes('MuiSelect-iconOpen'))
                    setOpen(true);
                else
                    setOpen(false);
                return (
                    (!open ? <KeyboardArrowDownIcon
                        onClick={() => setOpen(true)} sx={{
                            color: '#000000',
                        }} /> : <KeyboardArrowUpIcon
                        onClick={() => setOpen(true)}
                        sx={{
                            color: '#000000',
                        }} />)
                )
            }}
            sx={{
                mt: mt,
                height: 42,
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '12px', fontWeight: theme.fontWeight.medium,
                color: '#4D4D4D',
                '.MuiOutlinedInput-notchedOutline': { border: 0 },
                backgroundColor: 'rgba(173, 216, 230,0.2)',
            }}
        >
            {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                    {category}
                </MenuItem>
            ))}
        </Select>
    )
}

