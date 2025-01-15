import React, { useEffect, useState } from "react";
import { Paper, TextField, Button, MenuItem, Box, Stack } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useCouponForm } from "@components/forms/AddCouponForm";
import { ResetButton, SubmitButton } from "@shared-src/ButtonAssets";
import { useRouter } from "next/router";

export default function CouponFormUI({ isUpdate }) {
    const {
        formValues, errors,
        name,
        description,
        usageLimit, couponType, value,
        submitCreate, submitUpdate,
        loadCoupon
    } = useCouponForm({ isUpdate: false });
    const router = useRouter();
    const { couponCode } = router.query;

    useEffect(() => {
        if (isUpdate) {
            loadCoupon(couponCode);
        }
    }, []);



    return (
        <Paper elevation={3} style={{
            padding: "20px", width: '100%',
            margin: "auto"
        }}>
            <Box sx={{ display: 'flex', gap: 4 }}>
                <name.Component {...name} />
                <usageLimit.Component {...usageLimit} />
            </Box>
            <Box sx={{ display: 'flex', gap: 4 }}>
                <couponType.Component {...couponType} />
                <value.Component {...value} />
            </Box>
            <description.Component {...description} />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                <Stack direction={'row'} gap={4}>
                    <ResetButton label={'Reset'} />
                    <SubmitButton label={'Save Coupon'} onClick={
                        isUpdate ? submitCreate : submitUpdate
                    } />
                </Stack>
            </Box>
        </Paper>
    );
};
