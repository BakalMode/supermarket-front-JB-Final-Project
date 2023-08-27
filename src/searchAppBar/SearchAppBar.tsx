import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Storefront} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogged } from '../signin/signInSlicer';
import { logout } from '../signin/signInSlicer';
import { filterProducts, filterProductsByCategory } from '../shopMain/shopMainSlicer';
import FreshBuyLogo from '../images/FreshBuyLogo.jpeg'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const LogoImage = styled('img')({
  maxHeight: '20%',
  maxWidth: '25%',
  marginTop: '20px',
  marginLeft: '-23.83px'
});

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

const StyledMenuItem = styled(MenuItem)({
  fontSize: '1.4rem',
  border: '1px solid #5BA448',
  padding: '12px',
  margin: '4px',
  background:"white"
});

export default function SearchAppBar() {
  const isLogged = useSelector(selectLogged);
  const dispatch = useDispatch();
  const [searchbar, setSearchbar] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchbar(value);
    dispatch(filterProducts(value));
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (category: string) => {
    if (category === 'All Products') {
      setSelectedCategory(category);
      dispatch(filterProducts('')); // Empty search term to display all products
    } else if (categories.includes(category)) {
      setSelectedCategory(category);
      dispatch(filterProductsByCategory(category));
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/menu')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    const selectedCategory = sessionStorage.getItem('selectedCategory');
    if (selectedCategory) {
      setSelectedCategory(selectedCategory);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          maxHeight: '90px',
          paddingBottom: '21px',
          overflowY: 'auto',
          position: 'fixed',
          top: 0,
        }}

      >
        <Toolbar>
          <LogoImage sx={{ minHeight: '100px', maxHeight: '90px', minWidth: '200px', marginBottom: '9px' }} src={FreshBuyLogo} alt="FreshBuy Logo" />
          <Typography
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
            }}
          >
          </Typography>
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
                Sign in / Sign up
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
              onChange={handleSearchChange}
            />
          </Search>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: -2.6, ml: 0, mt: 2.6 }}
            onClick={handleMenuOpen}
          >
            <Storefront />
          </IconButton>
              
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
             <div style={{backgroundColor:"#5BA448",marginTop:"-24px",marginBottom:"-12px",textAlign:"center"}}><p style={{color:"yellow"}}>* Categories *</p>
             <StyledMenuItem
        style={{ borderRadius: '8px'}}
        onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#f7f0c5'}
        onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = ''}
        onClick={() => handleMenuClose('All Products')}
      >
              All Products
            </StyledMenuItem>

            {categories.map(category => (
              <StyledMenuItem
                key={category}
                style={{borderRadius:'8px'}}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = '#d4f1c5')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = '')}
                onClick={() => handleMenuClose(category)}
              >
                {category}
              </StyledMenuItem>
            ))}
            <div style={{padding:"4px"}}></div>
            </div>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


