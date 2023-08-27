import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { GetTotal, PurchaseDetails } from './reviewAPI';
export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};


export const PurchaseDetailsAsync = createAsyncThunk(
  'reviewForm/fetchCount',
  async (details: Object) => {
    const response = await PurchaseDetails(details);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const GetTotalAsync = createAsyncThunk(
  'reviewForm/fetchTotal',
  async () => {
    try {
      const response = await GetTotal();
      if (!response) {
        // If the response is null, redirect the user to the main page
        alert('Error occurred while fetching the total. Redirecting to the main page.');
        window.location.href = '/';
        return 0; // Return a default value or handle the error accordingly
      }

      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      console.error('Error occurred while fetching the total:', error);
      alert('Error occurred while fetching the total. Redirecting to the main page.');
      window.location.href = '/';
      return 0; // Return a default value or handle the error accordingly
    }
  }
);

export const reviewFormSlice = createSlice({
  name: 'reviewForm',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  extraReducers: (builder) => {

  },
});

export const {  } = reviewFormSlice.actions;
export default reviewFormSlice.reducer;
