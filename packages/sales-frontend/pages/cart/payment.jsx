import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { callbackPayment } from '@shared-api/Payments';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';

export default function Payment() {
    const router = useRouter();
    const queryParams = router.query;
    const pub = useSnackbarStore(state => state.pub);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);

    if (queryParams && queryParams?.vnp_ResponseCode) {
        callbackPayment(queryParams, pub).then((response) => {
            if (response) {
                setLoading(false);
                setMessage(response)

            }
            window.setTimeout(() => {
                router.push('/');
            }, 2000);
        });
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {loading && <CircularProgress />}
            {message && <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 20, fontWeight: 'bold', color: 'green' }}>
                {message}
            </Box>}
        </Box>
    )
}
