// pages/index.jsx
import React, { useEffect } from 'react';
import {
    Box, Typography, Button, Avatar, Stack,
    IconButton
} from '@mui/material';
import { useTheme } from '@mui/material';


export function IconButtonWithText({ src, title, subtitle }) {
    return (
        <Button
            variant="contained"
            sx={{
                display: 'flex',
                backgroundColor: 'transparent',
                justifyContent: 'flex-start',
                alignItems: 'center',
                boxShadow: 'none',
                height: '90px', // Adjust the height as needed
                textTransform: 'none',
                gap: 2, // Adjust spacing between icon and text
                '&:hover': {
                    backgroundColor: 'transparent', // Disable background color change on hover
                    boxShadow: 'none', // Disable box shadow on hover
                },
            }}
        >
            <Box
                flexGrow={1}
                sx={{
                    height: '100%',
                    display: 'flex',
                    paddingLeft: 0,
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ height: "100%", maxWidth: '30px', width: '30px' }} src={src} />
            </Box>
            <Box flexGrow={7} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography textAlign={'left'} variant="body1" color='black' fontWeight={'bold'}>{title}</Typography>
                <Typography textAlign={'left'} variant="body2" color='black'>{subtitle}</Typography>
            </Box>
        </Button>
    );
}

export function LabelLine({ children, margin, hasPrev, hasNext, onPrev, onNext }) {
    return (
        <Box display={'flex'} sx={{
            margin: margin,
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Typography variant="h5" fontWeight={500} sx={{
                fontSize: '18px',
                cursor: 'pointer',
                textDecoration: 'underline',
            }}>
                {children}
            </Typography>
            <Stack direction={'row'} sx={{
                columnGap: '10px',
            }}>
                <IconButton disabled={!hasPrev} onClick={onPrev} sx={{
                    '&.Mui-disabled': {
                        opacity: 0.5,
                        pointerEvents: 'none',
                    },
                }}>
                    <Avatar sx={{ height: '16px', width: '16px', cursor: 'pointer' }} src='pre-page.svg' />
                </IconButton>
                <IconButton disabled={!hasNext} onClick={onNext} sx={{
                    '&.Mui-disabled': {
                        opacity: 0.5,
                        pointerEvents: 'none',
                    },
                }}>
                    <Avatar sx={{ height: '16px', width: '16px', cursor: 'pointer' }} src='next-page.svg' />
                </IconButton>
            </Stack>
        </Box>
    )

}



export function FacilityDecorators() {
    const facilities = [
        {
            id: '1',
            title: 'Free Delivery',
            subtitle: 'Subtitle',
            src: '/shit.svg'
        },
        {
            id: '2',
            title: 'Surprise offers',
            subtitle: 'save up to 25%off',
            src: '/shit.svg'
        },
        {
            id: '3',
            title: 'Affordable prices',
            subtitle: 'get factory direct price',
            src: '/shit.svg'
        },
        {
            id: '4',
            title: 'Secure payments',
            subtitle: '100% protected payment',
            src: '/shit.svg'
        }
    ]
    return (
        <Box height={120}
            sx={{
                marginTop: '36px',
                marginBottom: '25px',
                padding: '0 139px',
                width: '100%',
                background: '#ffffff',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center'
            }}>
            {facilities.map(
                (item, index) => (<IconButtonWithText {...item} key={item.id} />)
            )
            }
        </Box>
    )
}

export function SubBannersDecorators() {
    const subBanners = [
        {
            id: '1',
            image: 'sub-banner1.png',
            width: '370px',
            height: '330px'
        },
        {
            id: '2',
            image: 'sub-banner2.png',
            width: '240px',
            height: '330px'
        },
        {
            id: '3',
            image: 'sub-banner3.png',
            width: '240px',
            height: '330px'
        },
        {
            id: '4',
            image: 'sub-banner4.png',
            width: '240px',
            height: '330px'
        }
    ]

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '41px',
            height: '330px',
            columnGap: '30px',
            margin: '0 132px',
        }}>
            {
                subBanners.map((banner, index) => (
                    <Avatar key={banner.id} variant='square'
                        src={banner.image}
                        sx={{
                            width: banner.width,
                            height: banner.height,
                            objectFit: 'fill',
                        }} />
                ))
            }
        </Box>
    )
}

const brands = [
    '/brands/apple-logo.png',
    '/brands/boat-logo.png',
    '/brands/oppo-logo.png',
    '/brands/samsung-logo.png',
    '/brands/Oneplus-logo.png',
    '/brands/asus-logo.png',
    '/brands/Sony-logo.png',
    '/brands/POCO-Emblem.png',
    '/brands/jbl-logo.png',
    '/brands/nokia-logo.png',
    '/brands/intel-logo.png',
    '/brands/realme-logo.png',
]

export function BrandsDecorators() {
    return (<Box height={120}
        sx={{
            marginTop: '36px',
            marginBottom: '25px',
            padding: '0 139px',
            width: '100%',
            background: '#ffffff',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center'
        }}>
        {brands.map(
            (src, index) => (<Avatar
                variant='square'
                key={index} src={src} sx={{
                    width: '60px',
                    height: '30px',
                    objectFit: 'contain',
                }} />)
        )
        }
    </Box>)
}