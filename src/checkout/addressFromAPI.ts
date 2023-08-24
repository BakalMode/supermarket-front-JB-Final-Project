import axios from "axios";
import {DJANGO_APP_API_URL} from '../consts'




export async function getCustomerDataForCheckout() {
  const token = sessionStorage.getItem('token') || '';
  const res = await axios.post(`${DJANGO_APP_API_URL}getcustomer`, {
     
          Authorization: `Bearer ${token}`

  });
  return ({ data: res.data });
}
