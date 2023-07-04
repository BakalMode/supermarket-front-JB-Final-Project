import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cartReducer,{ cartSlice } from '../ccart/cartSlicer';
import addressFromReducer from '../checkout/addressFromSlicer';
import checkoutReducer from '../checkout/checkoutSlicer';
import paymentFormReducer from '../checkout/paymentFormSlicer';
import reviewFormReducer,{ reviewFormSlice } from '../checkout/reviewSlicer';
import navbarReducer, { navbarSlice } from '../features/navbar/navbarSlicer';
import forgotPasswordReducer from '../forgotPassword/forgotPasswordSlicer';
import moreInfoReducer from '../MoreInfoPage/moreInfoSlicer';
import profilePageReducer from '../profilePage/profilePageSlicer';
import resetPasswordReducer from '../resetpassword/resetPasswordSlicer';
import appbarReducer,{ appbarSlice } from '../searchAppBar/searchAppBarSlicer';
import shopMainReducer, { shopMainSlice } from '../shopMain/shopMainSlicer';
import signInReducer from '../signin/signInSlicer';
import signupReducer from '../signup/signupSlicer';
import swipeviewReducer,{ swipeviewSlice } from '../swipeRecommandedViews/AutoPlaySwipeableViewsSlicer';

export const store = configureStore({
  reducer: {
    navbar: navbarReducer,
    cart: cartReducer,
    shopMain: shopMainReducer,
    appbar: appbarReducer,
    swipeview: swipeviewReducer,
    signin:signInReducer,
    signup:signupReducer,
    addressform:addressFromReducer,
    checkout: checkoutReducer,
    paymentForm:paymentFormReducer,
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
