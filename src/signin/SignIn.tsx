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
import { createTheme, hexToRgb, hslToRgb, rgbToHex, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginAsync, selectLogged } from './signInSlicer';
import { useNavigate} from 'react-router-dom';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/"> 
        FreshBuy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export function SignIn() {
  const dispatch = useAppDispatch();
  const logged = useAppSelector(selectLogged);
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate();

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
 

  try {
    // Simulate an asynchronous request to send data
    await sendData(data);
    
  } catch (error) {
    // Handle any error that occurred during the data submission
    console.error('Error occurred:', error);
  }
};

const sendData = (data: FormData): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Simulate a delay before resolving the promise
    setTimeout(() => {
      // Perform your actual data submission logic here
      // For example, make an API call or submit the form to a server

      // If the submission is successful, resolve the promise
      resolve();
      // If an error occurs during submission, reject the promise
      // reject(new Error('Failed to submit data.'));
    }, 100); // Simulating a 2-second delay before resolving the promise
  });
};
  const onSubmit = () => {
    dispatch(loginAsync({ email, password })).then(() => {
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div style={{ backgroundColor: '#d4f1c5', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0 }}>
        <div style={{ backgroundColor: '#fff', margin: 'auto', maxWidth: '600px', padding: '20px', minHeight: '100vh', boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)' }}>
          <Container component="main" maxWidth="xs">       <CssBaseline />
        <Box
          sx={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              onChange={(e) => setemail(e.target.value)}
              />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,bgcolor: "rgb(34,126,71)",'&:hover': { bgcolor:'rgb(59, 151, 98)' } }}
              onClick={onSubmit}
              
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgotpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Link href="/" variant="body2" style={{marginTop:"20px",paddingLeft:'120px'}}>
                  Back to the shop page
                </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      </div>
      </div>
    </ThemeProvider>
  );
}