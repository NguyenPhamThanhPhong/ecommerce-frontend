// pages/login.js
import { Box, TextField, Button, Typography, Link, Grid2, IconButton } from '@mui/material';
import { Google, Facebook, Apple } from '@mui/icons-material'; // Icons for social login
import { useState } from 'react';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { useRouter } from 'next/router';
import { login } from '@shared-api/Accounts';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const pub = useSnackbarStore(state => state.pub);
  const router = useRouter();

  const validateForm = () => {
    const newErrors = { email: '', password: '' };

    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      pub('Please enter a valid email address.', 'error');
    }
    if (password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters long.';
      pub('Password must be at least 5 characters long.', 'error');
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = () => {
    if (validateForm()) {
      // Call your login API here
      login({ email, password }, pub).then((res) => {
        if (res) {
          pub('Login Successful!', 'success');
          window.setTimeout(() => {
            router.push('/');
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
          maxWidth: 400,
          padding: '2rem',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '10px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
          color: 'white',
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Existing Member
        </Typography>
        <Typography variant="subtitle1" align="center" gutterBottom>
          Welcome Back!
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

        {/* Forgot Password */}
        <Link
          href="/forgot-password"
          underline="hover"
          style={{ color: '#aaa', display: 'block', textAlign: 'right' }}
        >
          Forgot Your Password?
        </Link>


        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '1.5rem', padding: '0.75rem' }}
          onClick={handleLogin}
        >
          Continue
        </Button>
      </Box>
    </Grid2>
  );
};


export default Login;
