import React, { useEffect, useState } from "react";
import {
    Modal, Box, Button, TextField, Typography, Switch, FormControlLabel, Stack, IconButton, Badge, FormControl, InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FilterSelect, FilterText, FilterBrand, FilterCategory, FilterDateFromTo, FilterFromTo } from "@components/filters/FilterAssets";


export function ProductFilterModal({ open, onClose, onApply }) {
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
        console.log('field', field, 'key', key, 'value', value);
        setFilterState((prev) => ({
            ...prev,
            [field]: { ...prev[field], [key]: value },
        }));
    };

    const handleReset = () => {
        setFilterState({
            date: { from: null, to: null, condition: "AND" },
            brand: { value: "", condition: "AND" },
            category: { value: "", condition: "AND" },
            price: { from: "", to: "", condition: "AND" },
            quantity: { from: "", to: "", condition: "AND" },
        });
        onApply({});
    }

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
                    <FilterBrand label={"Brand Condition: " + filterState.brand.condition}

                        checked={filterState.brand.condition === "OR"}
                        value={filterState.brand.value}
                        key={'brand'}
                        onChange={(e) => handleInputChange("brand", "value", e.target.value)}
                        onChecked={() => handleConditionToggle("brand")}
                        filterState={filterState} handleInputChange={handleInputChange} />

                    {/* Category Filter */}
                    <FilterCategory
                        onChange={(e) => handleInputChange("category", "value", e.target.value)}
                        onChecked={() => handleConditionToggle("category")}
                        options={[{ label: "Electronics", value: "electronics" }, { label: "Clothing", value: "clothing" }]}
                        checked={filterState.category.condition === "OR"}
                        value={filterState.category.value}
                        label={"Category Condition: " + filterState.category.condition}
                        filterState={filterState} handleInputChange={handleInputChange} />
                    {/* Price Filter */}
                    <FilterFromTo innerLabel={'Price'}
                        label={"Price Condition: " + filterState.price.condition}
                        valueFrom={filterState.price.from}
                        valueTo={filterState.price.to}
                        checked={filterState.price.condition === "OR"}
                        onChecked={() => handleConditionToggle("price")}
                        onChangeFrom={(e) => handleInputChange("price", "from", e.target.value)}
                        onChangeTo={(e) => handleInputChange("price", "to", e.target.value)}
                    />

                    {/* Quantity Filter */}
                    <FilterFromTo innerLabel={'Quantity'}
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
                        <Button onClick={handleReset} variant="contained" sx={{
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