import { getCoupon } from '@shared-api/Coupons';
import { createOrder } from '@shared-api/Orders';
import { getProducts } from '@shared-api/Products';
import { useGlobalCartContext } from '@shared-conntext/CartContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

export function useCartForm() {
    const pub = useSnackbarStore((state) => state.pub);
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState([]);
    const [quantitiesSum, setQuantitiesSum] = useState(0);
    const [gross, setGross] = useState(0);
    const [coupon, setCoupon] = useState('');
    const [couponApplied, setCouponApplied] = useState(0);
    const [total, setTotal] = useState(0);

    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); }

    const { cart,loadLocalStorage,addToCart } = useGlobalCartContext();

    const onQuantityChange = (id, value) => {
        if(addToCart){
            addToCart(id, value);
        }
        const newOrderDetails = orderDetails.map(item => {
            if (item.id === id) {
                item.quantity = value;
            }
            return item;
        });
        setOrderDetails([...newOrderDetails]);
    }
    const onRemoveItem = (id) => {
        if(removeFromCart){
            removeFromCart(id);
        }
        const newOrderDetails = orderDetails.filter(item => item.id !== id);
        setOrderDetails([...newOrderDetails]);
    }

    function loadOrderFromLocalCart() {
        if (cart?.length > 0) {
            let ids = cart.map(item => item.id);
            // MAP: ID: QUANTITY -> [PRODUCTS WITH QUANTITY]
            getProducts(ids, pub).then((response) => {
                if (response) {
                    const newOrderDetails = orderDetails;
                    response.data.forEach(product => {
                        const item = cart.find(item => item.id === product.id);
                        if (item) {
                            product.quantity = item.quantity;
                            newOrderDetails.push(product);
                        }
                    });
                    setOrderDetails([...newOrderDetails]);
                }
            });
        }
    }
    function calculateGrossAndCount() {
        if (orderDetails?.length) {
            let totalItems = 0;
            let gross = 0;
            orderDetails.forEach(item => {
                const sum = item.price * item.quantity;
                gross += sum - sum * item.discountPercent/100;
                totalItems += item.quantity;
            });
            setGross(gross);
            setQuantitiesSum(totalItems);
        }
    }
    function checkCoupon(coupon) {
        getCoupon(coupon, pub).then((response) => {
            if (response) {
                if (response?.couponType === 'PERCENT') {
                    const newValue = gross * response?.value;
                    console.log('newValue', newValue);
                    setCouponApplied(gross * response?.value/100);
                }
                else if (response?.couponType === 'FIXED') {
                    setCouponApplied(response?.value);
                }
            }
        })
    }

    function submit() {
        let couponCode = coupon;
        if (couponCode === '') {
            couponCode = null;
        }
        const submitOrderDetails = orderDetails.map(item => {
            return {
                productId: item.id,
                quantity: item.quantity
            }
        });
        createOrder({ orderDetails:submitOrderDetails, couponCode }, pub).then((response) => {
            if (response) {
                handleClose();
                router.push('/cart/check-out');
            }
        });
    }

    useEffect(() => {
        if(localStorage){
            loadLocalStorage();
            loadOrderFromLocalCart();
        }
    }, [])
    useEffect(() => {
        calculateGrossAndCount();
    }, [orderDetails])
    useEffect(() => {
        // Calculate total after coupon applied
        setTotal(gross - couponApplied);
    }, [couponApplied, gross])
    return{
        gross, total, couponApplied, quantitiesSum,
        coupon,setCoupon,
        orderDetails,
        onRemoveItem,
        handleOpen, handleClose, open,
        onQuantityChange, checkCoupon, submit
    }
}