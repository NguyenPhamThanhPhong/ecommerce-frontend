import { Box, Grid2, Typography, Button, IconButton, TextField, Paper, useTheme, Avatar, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FlatNumberInput from '@components/inputs/FlatNumberInput';
import { DetailDivider } from '@components/product/ProductUIAssets';
import SuccessModal from '@components/modal/SuccessModal';
import { useRouter } from 'next/router';
import { toLocaleFixedString } from '@shared-utils/ConverterUtils';


const TrashButton = ({ theme }) => (
    <Box sx={{
        textAlign: 'center',
        display: 'inline-flex',
        border: `1px solid ${theme.palette.outline.primary}`,
        padding: '4px',
        cursor: 'pointer'
    }}>
        <Avatar src="/trash.svg"
            variant='square'
            sx={{
                width: '28px', height: '28px',

                objectFit: 'contain'
            }}
        />
    </Box>
)

export default function CartItem({ index, title, desc, price, discount, quantity, onQuantityChange }) {
    const theme = useTheme();
    // console.log('key',key)
    return (
        <Box sx={{ padding: 2, marginBottom: 2, display: 'flex', }}>
            {/* Image */}
            <Box sx={{ width: 100, height: 100, marginRight: 2 }}>
                <Avatar
                    variant='square'
                    src="/iphone-green.jpg"
                    alt="IPhone 15Pro"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
            </Box>
            {/* Details */}
            <Box flexGrow={1} sx={{ flex: 1 }} fontFamily={'lato'}>
                <Typography variant="h6" fontFamily={'lato'}>{title}</Typography>
                <Typography variant="body2" color="textThirdary" mb={1} fontFamily={'lato'} fontSize={16}>
                    {desc}
                </Typography>
                <Typography variant="body1" color="success.main">
                    In Stock
                </Typography>
                {/* Quantity and Actions */}
                <Box display={'flex'} sx={{
                    justifyContent: 'space-between',
                }}>
                    <Stack direction={'row'}>
                        <FlatNumberInput initialValue={quantity} id={index} onChange={onQuantityChange} />
                        {/* Delete and Price */}
                        <TrashButton theme={theme} />
                    </Stack>
                    <Box sx={{ fontFamily: 'lato' }}>
                        <Typography variant="body1" component='span' fontWeight={theme.fontWeight.thin}
                            sx={{ textDecoration: 'line-through', fontSize: 10 }}>${price}</Typography>
                        <Typography variant="body1" component='span' sx={{
                            fontWeight: 'bold',
                            textDecoration: 'line-through', fontSize: 10
                        }}>₫{discount}</Typography>
                        <Typography variant="h6" fontWeight={theme.fontWeight.bold} fontSize={19}>
                            ₫{toLocaleFixedString(price * (1 - discount), 2)}</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
