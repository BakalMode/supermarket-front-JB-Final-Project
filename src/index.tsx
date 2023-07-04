import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignIn } from './signin/SignIn';
import SignUp from './signup/Signup';
import Checkout from './checkout/Checkout';
import ProfilePage from './profilePage/ProfilePage';
import ForgotPassword from './forgotPassword/ForgotPassword';
import ResetPassword from './resetpassword/ResetPassword';
import { MoreInfoPage } from './MoreInfoPage/MoreInfoPage';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
      <Routes>
       <Route path='/' Component={App} />
         <Route path='/login' Component={SignIn} />
         <Route path='/signup' Component={SignUp} /> 
         <Route path='/checkout' Component={Checkout} />
         <Route path='/profile' Component={ProfilePage} />
         <Route path='/forgotpassword' Component={ForgotPassword} />
         <Route path='/resetpassword' Component={ResetPassword} />
         <Route path='/moreinfo/:productId' Component={MoreInfoPage} />

      </Routes>
      </BrowserRouter>
      
    </Provider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
