import { Button, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { ProfileAssets } from '../assets/ProfileAssets'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Radio, RadioGroup, FormControlLabel, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditLocationAltRoundedIcon from '@mui/icons-material/EditLocationAltRounded';
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { DetailDivider } from '@components/product/ProductUIAssets';
import { FormTextBox } from '@shared/InputAssets';


const CustomRadio = ({ ...props }) => (
    <Radio
        {...props}
        // focusRipple={false}
        icon={
            <Box
                sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '2px solid #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            />
        }
        checkedIcon={
            <Box
                sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    border: '2px solid #C1C1C1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: 15,
                        height: 15,
                        borderRadius: '50%',
                        bgcolor: '#1976d2',
                    }}
                />
            </Box>
        }
    />
);


export function ShippingAddressGroup({ currentAdress, setCurrentAddress }) {
    const theme = useTheme();
    const { account } = useGlobalAccountContext((state) => state);

    const addressData = [];
    if (account?.profile?.addresses) {
        Object.entries(account.profile.addresses).forEach(([key, address]) => {
            addressData.push({
                id: key,
                title: key,
                address: address,
            });
        });
    }
    const defaultAddress = account?.profile?.primaryAddress;
    return (
        <Stack>
            <FormTextBox name={'address'} value={currentAdress}
                onChange={(e) => { setCurrentAddress(e.target.value) }}
                label={'Address'} placeholder={'Enter your address'}
                rows={2} multiline={true}
                formSx={{ width: '100%', mb: 3 }}
            />
            <RadioGroup defaultValue={defaultAddress} onChange={(e) => { setCurrentAddress(account?.profile?.addresses[e.target.value]) }} row>
                {
                    addressData.map((data) => {
                        const label = (
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <FormControlLabel
                                    value={data.id}
                                    control={<CustomRadio />}
                                    label={data.title}
                                    sx={{
                                        '& .MuiTypography-root': { fontSize: '16px', fontWeight: 'bold' }
                                    }}
                                />
                                <Stack direction={'row'} gap={2}>
                                    {
                                        data.id === defaultAddress ? (
                                            <Button variant={'contained'} disabled sx={{
                                                '&.Mui-disabled': {
                                                    bgcolor: 'rgba(25, 118, 210,0.58)',
                                                    color: '#ffffff'
                                                }
                                            }}>Default</Button>
                                        ) : null
                                    }
                                    <IconButton sx={{
                                        border: '1px solid #000000',
                                        borderRadius: '5px'
                                    }}>
                                        <DeleteIcon sx={{ color: '#000000' }} />
                                    </IconButton>
                                    <IconButton sx={{
                                        border: '1px solid #000000',
                                        borderRadius: '5px'
                                    }}>
                                        <EditLocationAltRoundedIcon sx={{ color: '#000000' }} />
                                    </IconButton>
                                </Stack>
                            </Box>)
                        return (
                            <Paper key={'1'} elevation={3} sx={{ padding: '16px', width: '100%', mb: 4 }}>
                                <Box>{label}</Box>
                                <DetailDivider mt={'10px'} mb={'20px'} />
                                <Typography component='span' variant="body1" >{data?.title}: </Typography>
                                <Typography component='span' sx={{
                                    fontWeight: theme.fontWeight.medium,
                                    fontSize: 16,
                                    lineHeight: 2.0,
                                    display: 'inline',
                                    fontFamily: theme.fontFamily.publicSans,
                                    color: 'textThirdary'
                                }}>
                                    {data?.address}
                                </Typography>
                            </Paper>
                        )
                    }
                    )
                }
            </RadioGroup>
        </Stack>
    )
}

export default function AddressItem({ title, address, onClick }) {
    const theme = useTheme();
    const label = (
        <Box display={'flex'} justifyContent={'space-between'}>
            <FormControlLabel
                control={<CustomRadio checked />}
                label={title || 'New Address'}
                sx={{
                    '& .MuiTypography-root': { fontSize: '16px', fontWeight: 'bold' }
                }}
            />
            <Stack direction={'row'} gap={2}>
                <Button variant={'contained'} disabled sx={{
                    '&.Mui-disabled': {
                        bgcolor: 'rgba(25, 118, 210,0.58)',
                        color: '#ffffff'
                    }
                }}>Default</Button>
                <IconButton onClick={onClick} sx={{
                    border: '1px solid #000000',
                    borderRadius: '5px'
                }}>
                    <EditLocationAltRoundedIcon sx={{ color: '#000000' }} />
                </IconButton>
            </Stack>
        </Box>)
    return (
        <Paper elevation={3} sx={{ padding: '16px', width: '100%', mb: 4 }}>
            <Box>{label}</Box>
            <DetailDivider mt={'10px'} mb={'20px'} />
            <Typography component='span' variant="body1" >{title}: </Typography>
            <Typography component='span' sx={{
                fontWeight: theme.fontWeight.medium,
                fontSize: 16,
                lineHeight: 2.0,
                display: 'inline',
                fontFamily: theme.fontFamily.publicSans,
                color: 'textThirdary'
            }}>
                {address}
            </Typography>
        </Paper>

    )
}
