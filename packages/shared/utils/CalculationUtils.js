
export function calculateGrossAndCount(orderDetails) {
    if (orderDetails?.length) {
        let totalItems = 0;
        let gross = 0;
        orderDetails.forEach(item => {
            totalItems += item.quantity;
            gross += item.quantity * item.product.price;
        });
        return { totalItems, gross };
    }
    return { totalItems: 0, gross: 0 };
}
export function calculateCouponApplied(gross, coupon) {
    if (coupon) {
        if (coupon.couponType === 'PERCENT') {
            return gross * coupon.value / 100;
        }
        else if (coupon.couponType === 'FLAT') {
            return coupon.value;
        }
    }
    return 0;
}


export function calculateTotal(gross, couponApplied) {
    return gross - couponApplied;
}