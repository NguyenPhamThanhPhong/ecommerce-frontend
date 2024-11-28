
import React from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab/';
import {
    Box,

} from "@mui/material";
import { Tab } from '@mui/material';

export default function CommonTab({tabsData}) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    tabsData = tabsData || [
        {
            value: '1',
            label: 'Highlights',
            content: 'Item One'
        },
        {
            value: '2',
            label: 'Description',
            content: 'Item Two'
        },
        {
            value: '3',
            label: 'Shipping',
            content: 'Item Three'
        },
        {
            value: '4',
            label: 'Returns',
            content: 'Item 4'
        }
    ]

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {
                            tabsData.map((tab) => (
                                <Tab key={tab.value} label={tab.label} value={tab.value} sx={{
                                    bgcolor: 'transparent',
                                    fontSize: 16,
                                    padding: '0px 20px',
                                    color: 'text.primary',
                                    '&.Mui-selected': {
                                        color: 'text.primary',
                                        bgcolor: '#FFFFFF',
                                    },
                                }}/>
                            ))
                        }
                    </TabList>
                </Box>
                {
                    tabsData.map((tab) => (
                        <TabPanel key={tab.value} value={tab.value}>
                            {tab.content}
                        </TabPanel>
                    ))
                }
            </TabContext>
        </Box>
    );
}
