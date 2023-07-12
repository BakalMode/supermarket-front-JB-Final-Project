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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { sendEmailAsync } from './forgotPasswordSlicer';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const handleSendEmail = () => {
    console.log('Email:', email);
    dispatch(sendEmailAsync({email}))
  
  };

  return (
  <ThemeProvider theme={createTheme()}>
      <div style={{ backgroundColor: '#d4f1c5', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
        <div style={{ backgroundColor: '#fff', margin: 'auto', maxWidth: '600px', padding: '20px', minHeight: '100vh', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)' }}>
          <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 17,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
   
            <p>enter your email here and a password reset email will be sent to you.</p>

          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "rgb(34,126,71)",'&:hover': { bgcolor:'rgb(59, 151, 98)' } }}
              onClick={handleSendEmail}
            >
              Send Email
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Back to Sign In
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

export default ForgotPassword;
