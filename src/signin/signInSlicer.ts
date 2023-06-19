import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState, AppThunk } from '../app/store';
import { fetchCount } from '../ccart/cartAPI';
import { login } from './singInAPI';
export interface loginState {
  logged: boolean,
  token: string,
}

const initialState: loginState = {
  logged: !!sessionStorage.getItem('token') ||false,
  token: sessionStorage.getItem('token')||""
};

export const loginAsync = createAsyncThunk(
  'signin/login',
  async (user: any) => {
      console.log(user);
      const response = await login(user) as AxiosResponse<any>; // Explicitly type response as AxiosResponse<any>
      return response.data;
  }
);

export const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
      logout: (state) => {
          state.logged=false
          state.token =""
          sessionStorage.clear()
      }
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {    
        if (action.payload.token) {
          state.logged = true;
          state.token = action.payload.token;
          sessionStorage.setItem('token', state.token);
          window.location.href = '/';
        } else {
          alert('Wrong email or password.');
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        if (!action.payload) {
          alert('Both email and password fields are required.');
        } else {
          alert('Wrong email or password.');
        }
      });
  },
});

export const { logout } = signinSlice.actions;
export const selectLogged = (state: RootState) => state.signin.logged;
export default signinSlice.reducer;
