import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCustomersPassword, sendEmail } from './forgotPasswordAPI';
import emailjs from '@emailjs/browser';


export interface ProfileState {
  logged: boolean;
  token: string;
}

const initialState: ProfileState = {
  logged: !!sessionStorage.getItem('token') || false,
  token: sessionStorage.getItem('token') || '',
};

export const sendEmailAsync = createAsyncThunk(
    'forgot/email',
    async (email: any) => {
      const response = await getCustomersPassword(email);
      return response.data;
    }
  );

export const forgotSlice = createSlice({
  name: 'forgot',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendEmailAsync.fulfilled, (state,action) => {
      
      const { email, token } = action.payload; // Destructure the returned data
      emailjs
      .send('service_61aamdo', 'template_kldbqup', { email, token }, '6WEIaLhXlKJUU8HnK')
      .then((result) => {
        // Additional code for displaying an alert to the user
        alert('Email sent successfully!');
      })
      .catch((error) => {
        // Additional code for displaying an alert to the user
        alert('Failed to send email.');
      });
    });
  },
});

export default forgotSlice.reducer;
