// pages/login.js
import { Box, TextField, Button, Typography, Link, Grid2, IconButton } from '@mui/material';
import { Google, Facebook, Apple } from '@mui/icons-material'; // Icons for social login
import { useState } from 'react';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { useRouter } from 'next/router';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getOTP } from '@shared-api/Accounts';



export default function NewPassword() {

    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ password: '', otp: '', confirmPassword: '' });

    const pub = useSnackbarStore(state => state.pub);
    const router = useRouter();

    function validateForm() {
        const errors = {};

        // Validate OTP (assuming it should not be empty)
        if (!otp.trim()) {
            errors.otp = 'OTP is required.';
        }
        else if (!/^\d{6}$/.test(otp)) {
            errors.otp = 'OTP must be a 6-digit number.';
        }


        // Validate password (e.g., minimum 8 characters, at least one number and one special character)
        if (!password.trim()) {
            errors.password = 'Password is required.';
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters long.';
        } else if (!/\d/.test(password)) {
            errors.password = 'Password must contain at least one number.';
        } else if (!/[!@#$%^&*]/.test(password)) {
            errors.password = 'Password must contain at least one special character.';
        }

        // Validate confirm password
        if (!confirmPassword.trim()) {
            errors.confirmPassword = 'Confirm Password is required.';
        } else if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(errors);
        Object.keys(errors).forEach((key) => {
            pub(errors[key], 'error');
        });
        // Return true if no errors, otherwise false
        return Object.keys(errors).length === 0;
    };

    const handleLogin = () => {
        if (validateForm()) {
            // Call your login API here
            getOTP({ password, otp }, pub).then((res) => {
                if (res) {
                    pub('Password Changed! Navigating to Login ...', 'success');
                    window.setTimeout(() => {
                        router.push('/login');
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
                    Enter your password to reset your password.
                </Typography>

                {/* Password Input */}
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white', backgroundColor: '#333' } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Confirm your password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputLabelProps={{ style: { color: 'white' } }}
                    InputProps={{ style: { color: 'white', backgroundColor: '#333' } }}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Enter OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    error={!!errors.otp}
                    helperText={errors.otp}
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