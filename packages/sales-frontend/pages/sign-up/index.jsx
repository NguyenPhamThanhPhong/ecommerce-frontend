import React, { useState } from "react";
import {
    Box,
    TextField,
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
import EmailIcon from '@mui/icons-material/Email';
import { register } from "@shared-api/Accounts";
import { useSnackbarStore } from "@shared-conntext/SnackbarContext";
import { useRouter } from "next/router";



export default function SignupPage() {

    const theme = useTheme();
    const pub = useSnackbarStore(state => state.pub);
    const router = useRouter();
    const {
        name, email, password, confirmPassword
    } = useSignupForm({ name: '', email: '', password: '', confirmPassword: '' });

    function handleSignup() {
        register({ fullName: name.value, email: email.value, password: password.value },pub).then((response) => {
            if (response) {
                pub('Account created, ', 'info');
                router.push('/login');
            }
        });
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
            }}
        >
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
                }}
            >
                <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
                    CREATE AN ACCOUNT
                </Typography>
                <Typography variant="body1" textAlign="center" mb={4} fontSize={20}>
                    Welcome To Bytez
                </Typography>
                <Stack gap={2} component="form" noValidate autoComplete="off">
                    <LoginSignupTextBox {...name} />
                    <LoginSignupTextBox {...email} />
                    <LoginSignupTextBox {...password} />
                    <LoginSignupTextBox {...confirmPassword} />
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSignup}
                        sx={{
                            backgroundColor: "#fff",
                            color: "#000",
                            marginY: 2,
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "#e0e0e0",
                            },
                        }}>Sign up
                    </Button>
                </Stack>
                <Typography textAlign="center" variant="body2" fontSize={14}>
                    Already have an account?{" "}
                    <Link href="/login" underline="hover" sx={{ color: "#fff", fontWeight: 'bold' }}>
                        Login Now
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
}
