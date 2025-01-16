import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Grid, Typography } from '@mui/material';

export default function KeyValueInput() {
    const [keyOptions, setKeyOptions] = useState (['Home', 'Office', 'Other']);
    const [selectedKey, setSelectedKey] = useState ('Home');
    const [value, setValue] = useState ('');
    const [keyValuePairs, setKeyValuePairs] = useState([]);
    const [warning, setWarning] = useState ('');

    const handleAddPair = () => {
        if (keyValuePairs.find(pair => pair.key === selectedKey)) {
            setWarning(`Key "${selectedKey}" already exists. Choose a different key.`);
            return;
        }

        setKeyValuePairs([...keyValuePairs, { key: selectedKey, value }]);
        setValue(''); // Reset value input
        setWarning(''); // Clear warning
    };

    return (
        <Grid container spacing={2}>
            {/* Dropdown to select key */}
            <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                    <InputLabel id="key-select-label">Key</InputLabel>
                    <Select
                        labelId="key-select-label"
                        value={selectedKey}
                        onChange={(e) => setSelectedKey(e.target.value)}
                    >
                        {keyOptions.map((key) => (
                            <MenuItem key={key} value={key}>
                                {key}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>

            {/* Input for value */}
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </Grid>

            {/* Add button */}
            <Grid item xs={12} sm={2}>
                <Button variant="contained" color="primary" onClick={handleAddPair} fullWidth>
                    Add
                </Button>
            </Grid>

            {/* Display warning */}
            {warning && (
                <Grid item xs={12}>
                    <Typography color="error">{warning}</Typography>
                </Grid>
            )}

            {/* Display key-value pairs */}
            <Grid item xs={12}>
                <Typography variant="h6">Key-Value Pairs:</Typography>
                {keyValuePairs.map((pair, index) => (
                    <Typography key={index}>
                        {pair.key}: {pair.value}
                    </Typography>
                ))}
            </Grid>
        </Grid>
    );
};

