import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Storefront, Person, ExitToApp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import the `useSelector` hook
import { selectLogged } from '../signin/signInSlicer';
import { logout } from '../signin/signInSlicer';



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const isLogged = useSelector(selectLogged);
  const dispatch = useDispatch();


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="sticky"
        sx={{
          width: '1390px',
          paddingBottom: '21px',
          position: 'fixed',
          overflowX: 'hidden',
          overflowY: 'auto',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block', marginTop: '25px' },
            }}
          >
            Shimoni's Shop
          </Typography>
          {/* Render different buttons based on the logged state */}
          {isLogged ? (
            <>
              <button
                className="button"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: 'none',
                  padding: '10px 20px',
                  marginTop: '25px',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s',
                  marginRight: '4px'
                }}
              >
                <Link
                  to="/profile"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Profile
                </Link>
              </button>
              <button
                className="button"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  border: 'none',
                  padding: '10px 20px',
                  marginTop: '25px',
                  borderRadius: '4px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'background-color 0.3s',
                  
                }}
                onClick={() => dispatch(logout())}
              >
                <Link
                  to="/"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  Sign Out
                </Link>
              </button>
            </>
          ) : (
            <button
              className="button"
              style={{
                backgroundColor: 'white',
                color: 'black',
                border: 'none',
                padding: '10px 20px',
                marginTop: '25px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s',
              }}
            >
              <Link
                to="login"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                Login/Register
              </Link>
            </button>
          )}
          <Search sx={{ mt: 3 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: -2.6, ml: 0, mt: 2.6 }}
          >
            <Storefront />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
