import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProductFields, purchasedCheck, submitReview } from './moreInfoPageAPI';


export interface ProfileState {
  logged: boolean;
  token: string;
}

const initialState: ProfileState = {
  logged: !!sessionStorage.getItem('token') || false,
  token: sessionStorage.getItem('token') || '',
};

export const fetchProductFieldsAsync = createAsyncThunk(
    'moreinfo/email',
    async (idd: any) => {
      const response = await fetchProductFields(idd);
      return response.data;
    }
  );

  export const submitReviewAsync = createAsyncThunk(
    'moreinfo/submit',
    async (review: any) => {
      const response = await submitReview(review);
      return response.data;
    }
  );

  export const purchasedBeforeAsync = createAsyncThunk(
    'moreinfo/before',
    async (idd:any) => {
      const response = await purchasedCheck(idd);
      return response.data;
    }
  );

export const moreinfoSlice = createSlice({
  name: 'moreinfo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
  }
});

export default moreinfoSlice.reducer;
