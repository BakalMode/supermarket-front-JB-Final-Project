import axios from 'axios';
import {DJANGO_APP_API_URL} from '../consts'

export function changeCustomersPassword(password: any) {
  return axios.post(`${DJANGO_APP_API_URL}/resetpassword`, password)
    .then(res => res.data)
    .catch(error => {
      throw new Error(error.message);
    });
}

