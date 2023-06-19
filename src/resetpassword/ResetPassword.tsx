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
import { resetPasswordAsync } from './resetPasswordSlicer';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleResetPassword = () => {
    if (password === confirmPassword) {
      console.log('Password:', password);
      console.log('Confirm Password:', confirmPassword);
      dispatch(resetPasswordAsync({ password, url: window.location.href }));
    } else {
      // Handle password mismatch error
      alert('Passwords do not match');
    }
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
            Reset Password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "rgb(34,126,71)",'&:hover': { bgcolor:'rgb(59, 151, 98)' }}}
              onClick={handleResetPassword}
            >
              Reset Password
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

export default ResetPassword;
