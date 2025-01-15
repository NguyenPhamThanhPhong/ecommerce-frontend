import React, { useEffect, useState } from "react";

import CouponFormUI from "@components/forms/ui/CouponFormUI";


export default function Coupon() {
    return (
        <CouponFormUI isUpdate={true} />
    );
}