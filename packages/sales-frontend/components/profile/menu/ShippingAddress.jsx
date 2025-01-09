import { Button, IconButton, Stack } from '@mui/material'
import React from 'react'
import { ProfileAssets } from '../assets/ProfileAssets'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Radio, RadioGroup, FormControlLabel, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditLocationAltRoundedIcon from '@mui/icons-material/EditLocationAltRounded';
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';

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


export default function ShippingAddress() {
    const { account, changeAddress } = useGlobalAccountContext((state) => state);
    const pub = useSnackbarStore(state => state.pub);
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
        <Stack sx={{
            flexGrow: 1,
        }}>
            <ProfileAssets.Button variant={ProfileAssets.variants.contained}
                startIcon={<AddCircleIcon />} buttonSx={{
                    fontSize: 16,
                    borderRadius: '8px',
                    px: '10px',
                    mb: 2,
                }}>
                Add Address
            </ProfileAssets.Button>
            {/* <CustomRadioGroup /> */}
            <RadioGroup defaultValue={defaultAddress} onChange={(e) => {
                console.log('addresses', account?.profile?.addresses)
                changeAddress(e.target.value, account?.profile?.addresses, pub)
            }} row>
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
                            <ProfileAssets.InfoCard key={'1'} title={label} divider={{ mb: '10px', mt: '10px' }} sx={{
                                mb: 4
                            }}>
                                <Stack>
                                    <ProfileAssets.InfoLine label="Address" value={data.address}
                                        labelProps={{ fontSize: '16px', fontWeight: 'bold' }} />
                                    <ProfileAssets.InfoLine label="Phone" value={data.phone} />
                                </Stack>
                            </ProfileAssets.InfoCard>
                        )
                    }
                    )
                }
            </RadioGroup>
        </Stack>
    )
}
