import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { registerAsync } from './signupSlicer';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import { useAppDispatch } from '../app/hooks';

function SignUp() {
  const dispatch = useAppDispatch();

  const [firstname, setFirstname] = useState('');
  const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  };

  const [lastname, setLastname] = useState('');
  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  };

  const [password, setPassword] = useState('');
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const [email, setEmail] = useState('');
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const [city, setCity] = useState('');
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const [address, setAddress] = useState('');
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const [emailInUse, setEmailInUse] = useState(false);

  useEffect(() => {
    const checkEmailStatus = async () => {
      if (email) {
        const response = await fetch('/emailcheckforregister', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        setEmailInUse(data.exists);
      }
    };

    checkEmailStatus();
  }, [email]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { // HANDLE SUBMIT ISNT WORKING WELL CAN SUBMIT WITHOUT FILLING ALL OF THE FILDS AND ALERTS DONT POP UP
    event.preventDefault();

    if (!firstname || !lastname || !password || !email || !city || !address) {
      alert('Please fill out all the fields');
      return;
    }

    if (emailInUse) {
      alert('Email is already in use');
      return;
    }

    await dispatch(
      registerAsync({ firstname, lastname, password, email, city, address })
    );
    window.location.href = '/login';
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          backgroundColor: '#d4f1c5',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            margin: 'auto',
            maxWidth: '600px',
            padding: '20px',
            minHeight: '100vh',
            boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      onChange={handleFirstnameChange}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={handleLastnameChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={handleEmailChange}
                      error={emailInUse}
                      helperText={emailInUse ? 'Email is already in use' : ''}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={handlePasswordChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="address"
                      label="Address"
                      type="address"
                      id="address"
                      autoComplete="new-address"
                      onChange={handleAddressChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="city"
                      label="City"
                      type="city"
                      id="city"
                      autoComplete="new-city"
                      onChange={handleCityChange}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    bgcolor: 'rgb(34,126,71)',
                    '&:hover': { bgcolor: 'rgb(59, 151, 98)' },
                  }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SignUp;
