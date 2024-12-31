import React, { useEffect, useState, useRef } from 'react';
import {
    TextField, Button, Box,
    FormControl, FormLabel, Stack,
    useTheme,
    Avatar, IconButton, Alert,
    FormHelperText, Typography, Paper,
    InputLabel, Select, OutlinedInput, Chip, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { ProfileAssets } from './UIAssets';
import { Filter } from 'bad-words';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Correct import
import { DatePicker } from '@mui/x-date-pickers';
import { isEmpty, isNotEmpty, isEmail, isPhoneNumber } from '../utils/ValidationUtils';
import ImageIcon from '@mui/icons-material/Image';
import Image from 'next/image';


export const FormTextBox = ({ name, label, value, onChange, error, errorText, required, rows, multiline, formSx, width }) => {
    onChange = onChange || (() => { });
    formSx = formSx || { gap: 1, width: '50%', };
    return (
        <FormControl error={error} sx={formSx}>
            <FormLabel>{label + ((required) ? ' * ' : '')}</FormLabel>
            <TextField
                placeholder='Type here...'
                name={name}
                error={error}
                helperText={errorText}
                variant="outlined"
                value={value}
                onChange={onChange}
                required={required}
                multiline={multiline}
                rows={rows}
            />
        </FormControl>
    )
}

export const FormDatePicker = ({ name, label, value, onChange, error, errorText, required }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl error={error} sx={{ gap: 1, width: '50%' }}>
                <FormLabel>{label + (required ? ' * ' : '')}</FormLabel>
                <DatePicker
                    format="dd-MM-yyyy"
                    value={value}
                    onChange={(newValue) => onChange({ target: { name, value: newValue } })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name={name}
                            error={error}
                            helperText={errorText}
                            required={required}
                        />
                    )}
                />
            </FormControl>
        </LocalizationProvider>
    );
};

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.includes(name)
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
    };
}

export function FormMultiSelect({ options, label, required }) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    options = options || [
        'Oliver Hansen',
        'Van Henry',
    ];
    label = label || 'Select';
    required = required || false;

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl sx={{ width: 300 }}>
            <FormLabel>{label + (required ? ' * ' : '')}</FormLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
            >
                {options.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, personName, theme)}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export function FormSelect({ labelSx, formSx, options, label, required }) {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <FormControl sx={{ minWidth: 120, width: '100%', ...formSx }}>
            <FormLabel sx={{ fontWeight: 'bold', ...labelSx }}>{label + (required ? ' * ' : '')}</FormLabel>
            <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="">
                    None
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    )
}

export function FormImagePicker({ name, value, onChange, e }) {
    const [image, setImage] = useState(value); // Default image

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '20%',
                height: 'auto',
                position: 'relative',
                cursor: 'pointer',
            }}
        >
            {/* Avatar with the image */}
            <Box
                component="label"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                }}
            >
                <Avatar
                    alt="Profile Picture"
                    src={image}
                    sx={{
                        width: 178,
                        height: 178,
                    }}
                />
                {/* Hidden input field inside the label */}
                <input
                    name={name || 'image'}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={onChange}
                />
            </Box>

            {/* IconButton placed outside the label */}
            <IconButton
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: '#000000',
                    color: 'white',
                }}
                onClick={() => document.querySelector('input[type="file"]').click()} // Triggers file input directly
            >
                <EditIcon />
            </IconButton>
        </Box>
    );
}

export function FormAlert({ alertVisible, error, severity }) {
    console.log({ alertVisible, error, severity })
    return (
        alertVisible && (
            <Alert severity={'error'} sx={{ position: 'absolute', top: -50 }}>
                {error || 'something went wrong'}
            </Alert>
        )
    )
}

export function FormThumbnailPicker({ name, value, onChange }) {
    const [image, setImage] = useState(value); // Default image
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 200,
                cursor: 'pointer',
                borderRadius: 8,
                bgcolor: '#F9F9FC',
            }}>
            <Avatar
                alt="Profile Picture"
                variant='square'
                src={image}
                sx={{
                    backgroundColor: '#00B074',
                    objectFit: 'contain',
                    mb: 2,
                    width: 100,
                    height: 100,
                    '& .MuiAvatar-fallback': {
                        display: 'none'
                    },
                }}>
                {image ? null : <ImageIcon sx={{ width: 60, height: 60 }} />}
            </Avatar>
            <Button sx={{
                bgcolor: '#F4ECFB',
                color: theme.palette.success.main,
                fontSize:16,
                fontWeight: theme.fontWeight.semiBold,
                '&:hover': {
                    bgcolor:'pink',
                    color:'green'
                }
            }}>
                Add Image
            </Button>
            {/* Hidden input field inside the label */}
            <input
                name={name || 'image'}
                type="file"
                accept="image/*"
                hidden
                onChange={onChange}
            />
        </Box>
    );
}