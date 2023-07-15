import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { fetchCount } from '../ccart/cartAPI';
import { register } from './signupAPI';
export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const registerAsync = createAsyncThunk(
  'signup/register',
  async (user: any) => {
      const response = await register(user);
      return response.data;
  }
)


export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    

  },

  extraReducers: (builder) => {
    builder
        .addCase( registerAsync.rejected, (state, action) => {  
            alert("please fill all of the fields")
          });
},
});

export const {  } = signupSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.signup.value;


export default signupSlice.reducer;
