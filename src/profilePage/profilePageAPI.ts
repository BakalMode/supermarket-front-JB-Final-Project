import axios from 'axios';

const MY_SERVER = "http://127.0.0.1:8000/";

export function editProfile(userChanges: any) {
    const token = sessionStorage.getItem('token') || '';
    
    return axios.patch(`${MY_SERVER}editprofile`, {userChanges,Authorization: `Bearer ${token}`})
  
}

export async function getCustomerData() {
    const token = sessionStorage.getItem('token') || '';
    const res = await axios.post(`${MY_SERVER}getcustomer`, {
       
            Authorization: `Bearer ${token}`

    });
    return ({ data: res.data });
  }


