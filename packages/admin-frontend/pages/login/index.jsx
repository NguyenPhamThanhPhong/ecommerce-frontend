// pages/login.js
import { Box, TextField, Button, Typography, Link, Grid2, IconButton } from '@mui/material';
import { Google, Facebook, Apple } from '@mui/icons-material'; // Icons for social login
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic for login can be added here
    console.log({ email, password });
  };

  return (
    <Grid2
      container
      style={{
        height: '100vh',
        backgroundImage: 'url("/path-to-background-image.jpg")', // Use your image
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
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{ style: { color: 'white', backgroundColor: '#333' } }}
        />

        {/* Forgot Password */}
        <Link href="/forgot-password" underline="hover" style={{ color: '#aaa', display: 'block', textAlign: 'right' }}>
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

        {/* Divider */}
        <Box textAlign="center" marginY="1.5rem" color="#aaa">
          OR
        </Box>

        {/* Social Login Icons */}
        <Box display="flex" justifyContent="center">
          <IconButton color="inherit" style={{ color: 'white' }}>
            <Google />
          </IconButton>
          <IconButton color="inherit" style={{ color: 'white' }}>
            <Facebook />
          </IconButton>
          <IconButton color="inherit" style={{ color: 'white' }}>
            <Apple />
          </IconButton>
        </Box>

        {/* Register Link */}
        <Box textAlign="center" marginTop="1.5rem">
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/register" underline="hover" style={{ color: '#aaa' }}>
              Register Now
            </Link>
          </Typography>
        </Box>
      </Box>
    </Grid2>
  );
};

export default Login;
