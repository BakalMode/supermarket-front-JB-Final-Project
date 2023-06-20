import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { editProfile, getCustomerData } from './profilePageAPI';

export interface ProfileState {
  logged: boolean;
  token: string;
}

const initialState: ProfileState = {
  logged: !!sessionStorage.getItem('token') || false,
  token: sessionStorage.getItem('token') || '',
};

export const editProfileAsync = createAsyncThunk(
    'profile/edit',
    async (profileData: any,request) => {
      const response = await editProfile(profileData);
      return response.data;
    }
  );

export const getCustomerDataAsync = createAsyncThunk(
  'profile/fetchCustomer',
  async () => {
    const response = await getCustomerData();
    console.log(response.data);
    return response.data;
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(editProfileAsync.fulfilled, (state) => {
      // Update the state as needed
    });
  },
});

export default profileSlice.reducer;
