// pages/login.js
import { Box, TextField, Button, Typography, Link, Grid2, IconButton } from '@mui/material';
import { Google, Facebook, Apple } from '@mui/icons-material'; // Icons for social login
import { useState } from 'react';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { useRouter } from 'next/router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getOTP } from '@shared-api/Accounts';



export default function ChangePassword() {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const pub = useSnackbarStore(state => state.pub);
    const router = useRouter();

    const validateForm = () => {
        const newErrors = { email: '', password: '' };
        if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
            pub('Please enter a valid email address.', 'error');
        }

        setErrors(newErrors);
        return !newErrors.email && !newErrors.password;
    };

    const handleLogin = () => {
        if (validateForm()) {
            // Call your login API here
            getOTP({email:email}, pub).then((res) => {
                if(res){
                    pub('OTP sent to your email!', 'success');
                    window.setTimeout(() => {
                        router.push('/new-password');
                    }, 1000);
                }
            });
        }
    };

    return (
        <Grid2
            container
            style={{
                height: '100vh',
                backgroundImage: 'url("/login.jpg")', // Use your image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Box
                sx={{
                    maxWidth: 600,
                    minWidth: 400,
                    padding: '2rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '10px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                    color: 'white',
                }}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    Forgot your password?
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                    Enter your email to reset your password.
                </Typography>

                {/* Email Input */}
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white', backgroundColor: '#333' } }}
                />

                <Box sx={{ display: 'flex', gap: 5 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={
                            <ArrowBackIosIcon />
                        }
                        style={{ marginTop: '1.5rem', padding: '0.75rem' }}
                        onClick={handleLogin}
                        sx={{
                            backgroundColor: '#f57c00',
                            '&:hover': {
                                backgroundColor: '#ff9800',
                            },
                        }}
                    >
                        Back To Login
                    </Button>
                    {/* Login Button */}
                    <Button
                        endIcon={
                            <ArrowForwardIosIcon />
                        }
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '1.5rem', padding: '0.75rem' }}
                        onClick={handleLogin}
                    >
                        Continue
                    </Button>
                </Box>
            </Box>
        </Grid2>
    )
}