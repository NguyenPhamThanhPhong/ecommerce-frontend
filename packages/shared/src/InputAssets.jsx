import React, { useEffect, useState, useRef } from 'react';
import {
    TextField, Button, Box,
    FormControl, FormLabel, Stack,
    useTheme,
    Avatar, IconButton, Alert,
    FormHelperText, Typography, Paper,
    InputLabel, Select, OutlinedInput, Chip, MenuItem,
    FormControlLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { DatePicker } from '@mui/x-date-pickers';
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';
import { useGlobalBrandCategoryContext } from '../context/BrandCategoryContext';
import { useSnackbarStore } from '../context/SnackbarContext';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';


export const FormTextBox = ({ name, label, value, onChange, error, errorText, required, rows, multiline, formSx, labelSx }) => {
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

export function FormNumberInput({ name, label, value, onChange, error, errorText, required, formSx, labelSx }) {
    return (
        <FormControl error={error} sx={formSx}>
            <FormLabel>{label + (required ? ' * ' : '')}</FormLabel>
            <TextField
                type="number"
                name={name}
                error={error}
                helperText={errorText}
                required={required}
                value={value}
                onChange={onChange}
            />
        </FormControl>
    )
}

export const FormDatePicker = ({ name, label, value, onChange, error, errorText, required, formSx }) => {
    return (
        // <LocalizationProvider dateAdapter={AdapterDateFns}>
        // </LocalizationProvider>
        <FormControl error={error} sx={formSx || { width: '50%' }}>
            <FormLabel>{label + (required ? ' * ' : '')}</FormLabel>
            <DatePicker
                format="DD-MM-YYYY"
                value={dayjs(value)}
                defaultValue={dayjs(new Date())}
                onChange={(newValue) => onChange({ target: {value: newValue?.toISOString() || '' } })}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        name={name}
                        error={error}
                        required={required}
                    />
                )}
            />
            {error && <FormHelperText>{errorText}</FormHelperText>}
        </FormControl>
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

export function FormSelect({ labelSx, name, formSx, onChange, value, options, label, required }) {
    return (
        <FormControl sx={{ minWidth: 120, width: '100%', ...formSx }}>
            <FormLabel sx={{ fontWeight: 'bold', ...labelSx }}>{label + (required ? ' * ' : '')}</FormLabel>
            <Select
                value={value}
                name={name}
                onChange={onChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value="">
                    None
                </MenuItem>
                {options.map((option, index) => (
                    <MenuItem key={index} value={option?.value}>
                        {option?.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export function FormCategoriesSelect({ labelSx, formSx, onChange, value, label, required }) {
    const { categories, loadCategories } = useGlobalBrandCategoryContext();
    const pub = useSnackbarStore(state => state.pub);
    let categoriesOptions = [];
    if (categories?.length > 0)
        categoriesOptions = [categoriesOptions, ...categories.map(category => ({ value: category.id, label: category.name }))];
    useEffect(() => {
        loadCategories(pub);
    }, []);
    return (
        <FormSelect labelSx={labelSx} formSx={formSx} value={value} onChange={onChange}
            options={categoriesOptions} label={label} required={required} />
    )
}
export function FormBrandsSelect({ labelSx, formSx, onChange, value, label, required }) {
    const { brands, loadBrands } = useGlobalBrandCategoryContext();
    const pub = useSnackbarStore(state => state.pub);
    let brandsOptions = [];
    if (brands?.length > 0)
        brandsOptions = brands.map(brand => ({ value: brand.id, label: brand.name }))
    useEffect(() => {
        loadBrands(pub);
    }, []);
    return (
        <FormSelect labelSx={labelSx} formSx={formSx} value={value} onChange={onChange}
            options={brandsOptions} label={label} required={required} />
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


export function FormThumbnailPicker({ name, value: thumbnail, onChange: setThumbnail }) {
    const theme = useTheme();
    // Handle thumbnail input
    const handleThumbnailChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setThumbnail({ type: 'binary', value: file });
        } else {
            setThumbnail({ type: 'url', value: event.target.value });
        }
        // setThumbnail(thumbnail?.value);
    };
    function reset() {
        setThumbnail({ type: 'url', value: null });
    }
    return (
        <Box>
            <Stack direction={'row'}>
                <Typography variant="h6">Upload Thumbnail</Typography>
                {thumbnail.value !== '' && thumbnail.value !== null &&
                    <IconButton onClick={reset} sx={{ p: 0 }}>
                        <ClearIcon />
                    </IconButton>}
            </Stack>

            <Box
                component="label"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                }}>
                <Avatar
                    variant='square'
                    sx={{
                        width: 90, height: 90, mr: 2, borderRadius: 3,
                        backgroundColor: thumbnail.value ? 'transparent' : 'grey.200',
                        border: '1px solid black'
                    }}
                    src={thumbnail.type === 'binary' ? URL.createObjectURL(new Blob([thumbnail.value])) : thumbnail.value}>
                    {!thumbnail.value && <ImageIcon />}

                </Avatar>
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleThumbnailChange}
                />

            </Box>
        </Box>
    );
}

export function MiniImageDisplay({ image }) {
    const theme = useTheme();
    if (image.type === 'binary') {
        const blob = new Blob([image.value]);
        const url = URL.createObjectURL(blob);
        return <Avatar variant='square' src={url}
            sx={{ width: 64, height: 64, m: 1, borderRadius: 3, border: `1px solid ${theme.palette.primary.main}` }} />;
    }
    return (
        <Avatar variant='square' src={image.value} sx={{
            width: 64, height: 64, m: 1,
            borderRadius: 3, border: `1px solid ${theme.palette.primary.main}`
        }} />
    );

}
export function FormImageGroup({ value: images, onChange: setImages }) {
    function handleImageChange(event) {
        const files = event.target.files;
        const newImages = [];

        Array.from(files).forEach((file) => {
            newImages.push({ type: 'binary', value: file });
            setImages([...newImages]);
        });
    };
    function reset() {
        setImages([]);
    }
    function renderImage(image) {
        if (image.type === 'binary') {
            const blob = new Blob([image.value]);
            const url = URL.createObjectURL(blob);
            return <Avatar variant='square' src={url}
                sx={{ width: 64, height: 64, m: 1, borderRadius: 3, border: `1px solid ${theme.palette.primary.main}` }} />;
        }
        return <Avatar variant='square' src={image.value} sx={{ width: 64, height: 64, m: 1, borderRadius: 3, border: `1px solid ${theme.palette.primary.main}` }} />;
    };
    // console.log(images);
    return (
        <Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Typography variant="h6" >Upload Images</Typography>
                <Button
                    variant="contained"
                    onClick={reset}
                    component="label" sx={{ bgcolor: 'rgb(159, 159, 159)', color: 'white' }}>
                    Reset
                </Button>
                <Button

                    variant="contained"
                    component="label">
                    Upload Images
                    <input
                        type="file"
                        hidden
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Button>
            </Box>

            <Box mt={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {/* <Typography variant="subtitle1">Selected Images:</Typography> */}
                {images?.length > 0 && images.map((image, index) => (
                    <Box item key={index}>
                        <MiniImageDisplay image={image} />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const FormRichText = ({ onChange, label, value, required, error, errorText, rows, quillSx, formSx }) => {
    // const [content, setContent] = useState(value||"");

    const handleChange = (newValue) => {
        const stupid = {target:{
            value: newValue
        }}
        // setContent(newValue);
        // console.log(onChange)
        // console.log("HTML Content:", content);
        onChange(stupid);

    };
    const minHeight = (rows || 1) * 30;

    return (
        <div>
            <FormControl style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                marginBottom: '1rem',
                ...formSx
            }}>
                <FormLabel>{label + ((required) ? ' * ' : '')}</FormLabel>
                {error && <FormHelperText>{errorText}</FormHelperText>}

                <style>{`
        .ql-container {
          min-height: ${minHeight}px !important;
          line-height: 1.5rem; /* Adjust row proportions */
        }
        `}
                </style>
                <ReactQuill
                    style={{
                        maxHeight: '200px', // Max height
                        overflowY: 'auto',  // Scrollable content
                        ...quillSx
                    }}
                    bounds={1}
                    theme="snow"
                    placeholder='Type here...'
                    value={value} onChange={handleChange} >

                </ReactQuill>
            </FormControl>
            {/* <button onClick={handleSave}>Save</button> */}
        </div>
    );
};
