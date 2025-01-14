import React, { useEffect, useState } from "react";
import {
    Modal,Box,Button,TextField,Typography,Switch,FormControlLabel,Stack,IconButton,Badge,FormControl,InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import CloseIcon from '@mui/icons-material/Close';
import { useGlobalBrandCategoryContext } from "@shared-conntext/BrandCategoryContext";
import { useSnackbarStore } from "@shared-conntext/SnackbarContext";
import dayjs from "dayjs";

// export function FilterSelect({ mt, options, defaultOptionId, onOptionChange }) {
//     if (mt === undefined) mt = 1;
//     // options = options || 
//     const [open, setOpen] = useState(false);
//     const theme = useTheme();
//     options = options || []
//     return (
//         <Select
//             defaultValue={defaultOptionId}
//             onChange={onOptionChange || (() => {

//             })}
//             IconComponent={(_props) => {
//                 if (_props.className.includes('MuiSelect-iconOpen'))
//                     setOpen(true);
//                 else
//                     setOpen(false);
//                 return (
//                     (!open ? <KeyboardArrowDownIcon
//                         onClick={() => setOpen(true)} sx={{
//                             color: '#000000',
//                         }} /> : <KeyboardArrowUpIcon
//                         onClick={() => setOpen(true)}
//                         sx={{
//                             color: '#000000',
//                         }} />)
//                 )
//             }}
//             sx={{
//                 mt: mt,
//                 height: 42,
//                 cursor: 'pointer',
//                 textAlign: 'left',
//                 fontSize: '12px', fontWeight: theme.fontWeight.medium,
//                 color: '#4D4D4D',
//                 '.MuiOutlinedInput-notchedOutline': { border: 0 },
//                 backgroundColor: 'rgba(173, 216, 230,0.2)',
//             }}
//         >
//             {options.map((option, index) => (
//                 <MenuItem key={index} value={option?.id}>
//                     {option?.name}
//                 </MenuItem>
//             ))}
//         </Select>
//     )
// }

export function FilterSelect({ label,selectLabel, value, onChange, checked, onChecked, options, }) {
    return (
        <Box item xs={12}>
            <FormControlLabel
                control={
                    <Switch
                        checked={checked}
                        onChange={onChecked}
                    />
                }
                label={label}
            />
            <FormControl fullWidth>
                <InputLabel>{selectLabel}</InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    label={selectLabel}>
                    <MenuItem value="">None</MenuItem>
                    {options.map((option, index) => (
                        <MenuItem key={index} value={option?.value}>
                            {option?.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}

export function FilterText({ label,innerLabel, value, checked, onChecked, onChange }) {
    return (<Box item xs={12}>
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={onChecked}
                />
            }
            label={label}
        />
        <TextField
            label={innerLabel}
            value={value}
            onChange={onChange}
            fullWidth
        />
    </Box>)
}

export function FilterFromTo({ label,innerLabel, valueFrom, valueTo, checked, onChecked, onChangeFrom, onChangeTo }) {
    return (<Box item xs={12}>
        <FormControlLabel
            control={<Switch
                checked={checked}
                onChange={onChecked} />}
            label={label}
        />
        <Box display="flex">
            <TextField
                label={innerLabel + " From"}
                type="number"
                value={valueFrom}
                onChange={onChangeFrom}
                fullWidth
            />
            <TextField
                label={innerLabel + " To"}
                type="number"
                value={valueTo}
                onChange={onChangeTo}
                fullWidth
            />
        </Box>
    </Box>)
}

export function FilterDateFromTo({ label,innerLabel, valueFrom, valueTo, checked, onChecked, onChangeFrom, onChangeTo }) {
    return (
        <Box item xs={12}>
            <FormControlLabel
                control={
                    <Switch
                        checked={checked}
                        onChange={onChecked}
                    />
                }
                label={label}
            />
            <DatePicker
                label="From"
                format="DD-MM-YYYY"
                value={dayjs(valueFrom)}
                onChange={(newValue)=>onChangeFrom(newValue?.toISOString() || '')}
                renderInput={(params) => <TextField {...params} fullWidth />}
            />
            <DatePicker
                label="To"
                format="DD-MM-YYYY"
                value={dayjs(valueTo)}
                onChange={(newValue)=>onChangeTo(newValue?.toISOString() || '')}
                renderInput={(params) => <TextField {...params} fullWidth />}
            />
        </Box>

    )
}



export function FilterCategory({ label, value, onChange, checked, onChecked, }) {
    const { categories, loadCategories } = useGlobalBrandCategoryContext();
    const pub = useSnackbarStore(state => state.pub);
    let categoriesOptions = [];
    if (categories?.length > 0)
        categoriesOptions = categories.map(category => ({ value: category.id, label: category.name }))
    useEffect(() => {
        loadCategories(pub);
    }, []);
    // console.log('categoriesOptions', categoriesOptions);
    return (
        <FilterSelect label={label} value={value} onChange={onChange} selectLabel={"Category"}
            checked={checked} onChecked={onChecked} options={categoriesOptions} />
    )
}
export function FilterBrand({ label, value, onChange, checked, onChecked }) {
    const { brands, loadBrands } = useGlobalBrandCategoryContext();
    const pub = useSnackbarStore(state => state.pub);

    let brandsOptions = [];
    if (brands?.length > 0)
        brandsOptions = brands.map(brand => ({ value: brand.id, label: brand.name }));
    useEffect(() => {
        loadBrands(pub);
    }, []);
    return (
        <FilterSelect label={label} value={value} onChange={onChange} selectLabel={"Brand"}
            checked={checked} onChecked={onChecked} options={brandsOptions} />
    )
}
