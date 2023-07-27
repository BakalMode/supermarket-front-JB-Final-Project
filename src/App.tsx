import React from 'react';
import './App.css';
import { ShopMain } from './shopMain/ShopMain'
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import green from '@mui/material/colors/lightGreen';


const theme = createTheme({
  palette: {
    primary: green,
    
  },
});


function App(){
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <ShopMain></ShopMain>
      </ThemeProvider>
  
    </div>
  );
}

export default App;
