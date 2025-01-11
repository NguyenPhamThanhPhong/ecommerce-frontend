import { Paper, Box, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import cart icon
import { useGlobalCartContext } from '@shared-conntext/CartContext';
import { useEffect, useMemo } from 'react';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { useRouter } from 'next/router';

const AppShoppingCart = ({ }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = React.useState(false);
    const {pub} = useSnackbarStore();
    const cart = useGlobalCartContext(state => state.cart);
    let itemCount = cart?.length || 0;
    // if (cart.length > 0) {
    //     cart.forEach(item => {
    //         itemCount += item.quantity;
    //     });
    // }

    return (
        <Paper onClick={()=>{
            router.push('/cart');
        }} sx={{
            position: 'sticky',
            width: '60px',  // Initial width when not hovered
            height: '60px', // Initial height (make it a square for better look)
            zIndex: 1000,
            top: 200,  // Keep it sticky after scrolling down 200px
            left: 'calc(100vw)',  // Positioning 2% of the viewport width from the right side
            borderRadius: '8px',
            backgroundColor: '#f6432e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'width 0.3s, padding 0.3s',  // Smooth expand on hover
            color: 'white',
            boxShadow: 3,
            cursor: 'pointer',
            // Hover state to expand and show icon & text
            '&:hover': {
                width: '130px',  // Expand to 200px on hover
                padding: '0 10px',
            },
        }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
            }}>
                <Badge badgeContent={itemCount} color="primary">
                    <ShoppingCartIcon sx={{ itemCount }} />
                </Badge>
                <span style={{
                    marginLeft: '10px',
                    fontSize: '18px',
                    display: isHovered ? 'inline-block' : 'none',
                    transition: 'display 0.3s ease', // Smooth transition on hover
                }}>Cart</span>
            </Box>
        </Paper>
    );
};

export default AppShoppingCart;
