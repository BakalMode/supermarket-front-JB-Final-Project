import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { getCustomersPassword, sendEmail } from './resetPasswordAPI';
import { changeCustomersPassword } from './resetPasswordAPI';


export interface ProfileState {
  logged: boolean;
  token: string;
}

const initialState: ProfileState = {
  logged: !!sessionStorage.getItem('token') || false,
  token: sessionStorage.getItem('token') || '',
};

export const resetPasswordAsync = createAsyncThunk(
    'reset/password',
    async (password: any) => {
      const response = await changeCustomersPassword(password);
      return response.data;
    }
  );

  export const resetSlice = createSlice({
    name: 'reset',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(resetPasswordAsync.fulfilled, (state, action) => {
        alert('password changed successfully!')
      });
    },
  });

export default resetSlice.reducer;
