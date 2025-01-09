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

export default function SignupPage() {

  const theme = useTheme();
  const { email, password, } = useLoginForm({ name: '', email: '', password: '', confirmPassword: '' });
  const { pub } = useSnackbarStore();
  const login = useGlobalAccountContext((state) => state.login);
  const router = useRouter();

  const onLogin = () => {
    login({ username: email.value, password: password.value },pub).then((response) => {
      if (response) {
        pub('Login success, ', 'info');
        setTimeout(() => {
          router.push('/');
        }, 1000);
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
          Bytez Member
        </Typography>
        <Typography variant="body1" textAlign="center" mb={4} fontSize={20}>
          Welcome back!
        </Typography>
        <Stack gap={2} component="form" noValidate autoComplete="off">
          <LoginSignupTextBox {...email} />
          <LoginSignupTextBox {...password} />
          <Link href="/login" underline="hover" sx={{ color: "#fff", fontWeight: 'bold' }}>
            Forgot your password?
          </Link>
          <Button
            fullWidth
            variant="contained"
            onClick={onLogin}
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              mb: 2,
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}>
            Login
          </Button>
        </Stack>
        <Typography textAlign="center" variant="body2" fontSize={14}>
          Don't have an account?{" "}
          <Link href="/login" underline="hover" sx={{ color: "#fff", fontWeight: 'bold' }}>
            Create One
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
