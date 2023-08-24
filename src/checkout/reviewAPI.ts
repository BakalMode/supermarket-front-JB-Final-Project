import axios from 'axios';
import {DJANGO_APP_API_URL} from '../consts'




export function PurchaseDetails(data: any) {
  const token = sessionStorage.getItem('token') || '';
  if (token) {
  return axios.post(`${DJANGO_APP_API_URL}addpurchase`, {data, Authorization: `Bearer ${token}`})
  }else{
    return axios.post(`${DJANGO_APP_API_URL}addpurchase`, { data });
  }

}


export function GetTotal() {
  const cart: any = JSON.parse(localStorage.getItem('cart') || '[]');

  return axios.post(`${DJANGO_APP_API_URL}calctotal`, cart)
    .then(response => {
      // Handle the response here if needed
      return response;
    })
    .catch(error => {
      // Handle errors here if needed
      console.error(error);
      return null; // or any default value
    });
}



