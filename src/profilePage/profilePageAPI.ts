import axios from 'axios';
import {DJANGO_APP_API_URL} from '../consts'

export function editProfile(userChanges: any) {
    const token = sessionStorage.getItem('token') || '';
    
    return axios.patch(`${DJANGO_APP_API_URL}editprofile`, {userChanges,Authorization: `Bearer ${token}`})
  
}

export async function getCustomerData() {
    const token = sessionStorage.getItem('token') || '';
    const res = await axios.post(`${DJANGO_APP_API_URL}getcustomer`, {
       
            Authorization: `Bearer ${token}`

    });
    return ({ data: res.data });
  }


