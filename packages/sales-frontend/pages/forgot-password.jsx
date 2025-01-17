import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Link,
    useTheme,
    Stack,
    Paper,
} from "@mui/material";
import loginImg from '@shared-public/login.png'
import { LoginSignupTextBox } from "@components/common/CommonInputs";
import { useSignupForm } from "@components/forms/SignupForm";
import { useLoginForm } from "@components/forms/LoginForm";
import { useSnackbarStore } from "@shared-conntext/SnackbarContext";
// import { login,doom } from "@shared-api/Accounts";
import { useRouter } from "next/router";
import { useGlobalAccountContext } from "@shared-conntext/AccountContext";
import EmailIcon from '@mui/icons-material/Email';
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { getOTP } from "@shared-api/Accounts";


export default function SignupPage() {

    const theme = useTheme();
    const { email, } = useLoginForm({ name: '', email: '', password: '', confirmPassword: '' });
    const { pub } = useSnackbarStore();
    const router = useRouter();

    const onLogin = () => {
        console.log('email', email.value);
        getOTP({ email: email.value }, pub).then((response) => {
            if (response) {
                pub('OTP sent to your email, ', 'info');
                setTimeout(() => {
                    router.push('/new-password');
                }, 1000);
            }
        });
    }
    const onBack = () => {
        router.push('/login');
    }


    return (
        <Box
            sx={{
                fontFamily: theme.fontFamily.publicSans,
                backgroundImage: `url(${loginImg.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Paper
                maxWidth="sm"
                sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(4px)",
                    px: 10,
                    py: 7,
                    boxShadow: "0px 0px 20px 5px rgba(255, 255, 255, 0.8)", // Glowing white shadow
                    borderRadius: 2,
                    color: "#fff",
                    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)", // Text glow effect
                }}>
                <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
                    Forgot your password?
                </Typography>
                <Typography variant="body1" textAlign="center" mb={4} fontSize={20}>
                    Enter your email address below
                </Typography>
                <Stack gap={2} component="form" noValidate autoComplete="off">
                    <LoginSignupTextBox  {...email} icon={'email'} />
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 4
                    }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<ArrowBack sx={{ color: 'white' }} />}
                            onClick={onBack}
                            sx={{
                                color: "#ffffff",
                                mb: 2,
                                border: "1px solid #fff",
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "gray",
                                },
                            }}>Back</Button>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={onLogin}
                            endIcon={<ArrowForward sx={{ color: '#000' }} />}
                            sx={{
                                backgroundColor: "#fff",
                                color: "#000",
                                mb: 2,
                                fontWeight: "bold",
                                "&:hover": {
                                    backgroundColor: "#e0e0e0",
                                },
                            }}>Login</Button>
                    </Box>
                </Stack>
            </Paper>
        </Box>
    );
}
