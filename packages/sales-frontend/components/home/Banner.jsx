// pages/index.jsx
import React from 'react';

import {

    Card, CardContent, CardMedia, Button, Icon, Avatar, Stack
} from '@mui/material';
import { createTheme } from '@mui/material';


export default function Banner({ margin }) {
    const theme = createTheme();
    const buttonData = Array(5).fill(1);
    const banners = [
        { id: 1, image: 'banner1.png', width: '386px', height: '255px' },
        { id: 2, image: 'banner2.png', width: '386px', height: '255px' },
    ]

    return (
        <Stack direction={'row'}
            height='536px'
            sx={{
                alignItems: 'center',
                margin: margin,

            }}>
            <Stack
                rowGap={1.5} direction={'row'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    width: '30%',
                }}>
                {
                    banners.map((banner, index) => (
                        <Card key={index} sx={{
                            borderRadius: '16px',
                            margin: '0 auto',
                        }}>
                            <CardMedia
                                component="img"
                                width="386px"
                                height="255px"
                                sx={{

                                    objectFit: 'fill'
                                }}
                                image="banner1.png"
                                alt="green iguana"
                            />
                        </Card>
                    ))
                }
            </Stack>
            <Card sx={{
                height: '100%',
                flexGrow: 1,
                boxShadow: 'none',
                background: 'transparent',
                display: 'flex',
                justifyContent: 'center',
            }}>
                <CardMedia
                    component="img"
                    image="banner1.png"
                    alt="green iguana"
                    sx={{
                        width: '748px',
                        height: '536px',
                        objectFit: 'fill',
                        borderRadius: '16px',
                    }} />
            </Card>
        </Stack>
    );
}
