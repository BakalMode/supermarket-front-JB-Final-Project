import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartReducer,{ cartSlice } from '../ccart/cartSlicer';
import addressFromReducer from '../checkout/addressFromSlicer';
import reviewFormReducer,{ reviewFormSlice } from '../checkout/reviewSlicer';
import navbarReducer, { navbarSlice } from '../features/navbar/navbarSlicer';
import forgotPasswordReducer from '../forgotPassword/forgotPasswordSlicer';
import moreInfoReducer from '../MoreInfoPage/moreInfoSlicer';
import profilePageReducer from '../profilePage/profilePageSlicer';
import resetPasswordReducer from '../resetpassword/resetPasswordSlicer';
import shopMainReducer, { shopMainSlice } from '../shopMain/shopMainSlicer';
import signInReducer from '../signin/signInSlicer';
import signupReducer from '../signup/signupSlicer';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    cart: cartReducer,
    shopMain: shopMainReducer,
    signin:signInReducer,
    signup:signupReducer,
    addressform:addressFromReducer,
    reviewForm:reviewFormReducer,
    profile:profilePageReducer,
    forgot:forgotPasswordReducer,
    reset: resetPasswordReducer,
    moreinfo: moreInfoReducer

    
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
