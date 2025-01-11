'use client';
import GoogleMapBox from '@components/profile/assets/GoogleMapBox'
import { Box } from '@mui/material'
import React from 'react'

export default function Test() {
    return (
        <Box sx={{
            mt:10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <GoogleMapBox />
        </Box>
    )
}
