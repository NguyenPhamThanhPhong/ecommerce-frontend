import React, { useState } from "react";
import {
    Modal,
    Box,
    Button,
    TextField,
    Typography,
    Switch,
    FormControlLabel,
    Stack,
    IconButton,
    Badge,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import CloseIcon from '@mui/icons-material/Close';

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

export function FilterSelect({ label, value, onChange, checked, onChecked, options, handleInputChange }) {
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
                <InputLabel>Category</InputLabel>
                <Select
                    value={value}
                    onChange={onChange}
                    label="Category">
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

export function FilterText({ label, value, checked, onChecked, onChange }) {
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
            label="Brand"
            value={value}
            onChange={onChange}
            fullWidth
        />
    </Box>)
}

export function FilterFromTo({ label, valueFrom, valueTo, checked, onChecked, onChangeFrom, onChangeTo }) {
    return (<Box item xs={12}>
        <FormControlLabel
            control={<Switch
                checked={checked}
                onChange={onChecked} />}
            label={label}
        />
        <Box display="flex">
            <TextField
                label="Price From"
                type="number"
                value={valueFrom}
                onChange={onChangeFrom}
                fullWidth
            />
            <TextField
                label="Price To"
                type="number"
                value={valueTo}
                onChange={onChangeTo}
                fullWidth
            />
        </Box>
    </Box>)
}

export function FilterDateFromTo({ label, valueFrom, valueTo, checked, onChecked, onChangeFrom, onChangeTo }) {
    return(
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
            value={valueFrom}
            onChange={onChangeFrom}
            renderInput={(params) => <TextField {...params} fullWidth />}
        />
        <DatePicker
            label="To"
            value={valueTo}
            onChange={onChangeTo}
            renderInput={(params) => <TextField {...params} fullWidth />}
        />
    </Box>

    )
}

const ProductFilterModal = ({ open, onClose, onApply }) => {
    const [filterState, setFilterState] = useState({
        date: { from: null, to: null, condition: "AND" },
        brand: { value: "", condition: "AND" },
        category: { value: "", condition: "AND" },
        price: { from: "", to: "", condition: "AND" },
        quantity: { from: "", to: "", condition: "AND" },
    });

    const handleConditionToggle = (field) => {
        setFilterState((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                condition: prev[field].condition === "AND" ? "OR" : "AND",
            },
        }));
    };

    const handleInputChange = (field, key, value) => {
        setFilterState((prev) => ({
            ...prev,
            [field]: { ...prev[field], [key]: value },
        }));
    };

    const handleApply = () => {
        onApply(filterState);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 800,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}>
                <Badge badgeContent={<IconButton onClick={onClose} >
                    <CloseIcon sx={{
                        color: 'black',
                    }} />
                </IconButton>} sx={{
                    position: 'absolute',
                    top: 27,
                    right: 27
                }}>

                </Badge>
                <Typography variant="h6" gutterBottom>
                    Filter
                </Typography>
                <Box container spacing={2}>
                    {/* Date Filter */}
                    <FilterDateFromTo
                        label={"Date Condition: " + filterState.date.condition}
                        valueFrom={filterState.date.from}
                        valueTo={filterState.date.to}
                        checked={filterState.date.condition === "OR"}
                        onChecked={() => handleConditionToggle("date")}
                        onChangeFrom={(date) => handleInputChange("date", "from", date)}
                        onChangeTo={(date) => handleInputChange("date", "to", date)} />


                    {/* Brand Filter */}
                    <FilterText label={"Brand Condition: " + filterState.brand.condition}
                        checked={filterState.brand.condition === "OR"}
                        value={filterState.brand.value}
                        key={'brand'}
                        onChange={(e) => handleInputChange("brand", "value", e.target.value)}
                        onChecked={() => handleConditionToggle("brand")}
                        filterState={filterState} handleInputChange={handleInputChange} />

                    {/* Category Filter */}
                    <FilterSelect
                        onChange={(e) => handleInputChange("category", "value", e.target.value)}
                        onChecked={() => handleConditionToggle("category")}
                        options={[{ label: "Electronics", value: "electronics" }, { label: "Clothing", value: "clothing" }]}
                        checked={filterState.category.condition === "OR"}
                        value={filterState.category.value}
                        label={"Category Condition: " + filterState.category.condition}
                        filterState={filterState} handleInputChange={handleInputChange} />
                    {/* Price Filter */}
                    <FilterFromTo
                        label={"Price Condition: " + filterState.price.condition}
                        valueFrom={filterState.price.from}
                        valueTo={filterState.price.to}
                        checked={filterState.price.condition === "OR"}
                        onChecked={() => handleConditionToggle("price")}
                        onChangeFrom={(e) => handleInputChange("price", "from", e.target.value)}
                        onChangeTo={(e) => handleInputChange("price", "to", e.target.value)}
                    />

                    {/* Quantity Filter */}
                    <FilterFromTo
                        label={"Quantity Condition: " + filterState.quantity.condition}
                        valueFrom={filterState.quantity.from}
                        valueTo={filterState.quantity.to}
                        checked={filterState.quantity.condition === "OR"}
                        onChecked={() => handleConditionToggle("quantity")}
                        onChangeFrom={(e) => handleInputChange("quantity", "from", e.target.value)}
                        onChangeTo={(e) => handleInputChange("quantity", "to", e.target.value)} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 3,
                    }}>
                    <Button onClick={onClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                    <Stack direction="row" spacing={2}>
                        <Button onClick={handleApply} variant="contained" sx={{
                            backgroundColor: 'lightgrey',
                            color: '#000000'
                        }}>
                            Reset
                        </Button>
                        <Button onClick={handleApply} variant="contained" color="primary">
                            Apply
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    );
};

export default ProductFilterModal;
