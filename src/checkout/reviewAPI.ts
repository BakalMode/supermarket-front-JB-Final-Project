import axios from 'axios';

const MY_SERVER = "http://127.0.0.1:8000/";

export function PurchaseDetails(data: any) {
  const token = sessionStorage.getItem('token') || '';
  if (token) {
  return axios.post(`${MY_SERVER}addpurchase`, {data, Authorization: `Bearer ${token}`})
  }else{
    return axios.post(`${MY_SERVER}addpurchase`, { data });
  }

}


export function GetTotal() {
  const cart: any = JSON.parse(localStorage.getItem('cart') || '[]');

  return axios.post(`${MY_SERVER}calctotal`, cart)
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



