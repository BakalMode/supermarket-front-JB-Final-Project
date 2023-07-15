import { createAsyncThunk } from "@reduxjs/toolkit/dist/createAsyncThunk";
import axios from "axios";


const MY_SERVER = "http://127.0.0.1:8000/";


export async function getCustomerDataForCheckout() {
  const token = sessionStorage.getItem('token') || '';
  const res = await axios.post(`${MY_SERVER}getcustomer`, {
     
          Authorization: `Bearer ${token}`

  });
  return ({ data: res.data });
}
