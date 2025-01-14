import React, { useEffect, useState } from "react";
import {
    Modal, Box, Button, TextField, Typography, Switch, FormControlLabel, Stack, IconButton, Badge, FormControl, InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FilterSelect, FilterText, FilterBrand, FilterCategory, FilterDateFromTo, FilterFromTo } from "@components/filters/FilterAssets";


export function OrderFilterModal({ open, onClose, onApply }) {
    const [filterState, setFilterState] = useState({
        date: { from: null, to: null, condition: "AND" },
        totalValue: { from: "", to: "", condition: "AND" },
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
            totalValue: { from: "", to: "", condition: "AND" },
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


                    {/* Price Filter */}
                    <FilterFromTo innerLabel={'Total Value'}
                        label={"Total Value Condition: " + filterState.totalValue.condition}
                        valueFrom={filterState.totalValue.from}
                        valueTo={filterState.totalValue.to}
                        checked={filterState.totalValue.condition === "OR"}
                        onChecked={() => handleConditionToggle("totalValue")}
                        onChangeFrom={(e) => handleInputChange("totalValue", "from", e.target.value)}
                        onChangeTo={(e) => handleInputChange("totalValue", "to", e.target.value)}
                    />

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