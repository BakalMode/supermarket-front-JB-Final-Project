import axios from 'axios';

const MY_SERVER = "http://127.0.0.1:8000/";

export function editProfile(userChanges: any) {
    const token = sessionStorage.getItem('token') || '';
    console.log(userChanges,token);
    
    return axios.patch(`${MY_SERVER}editprofile`, {userChanges,Authorization: `Bearer ${token}`})
  
}

export function getCustomerData() {

    return new Promise<{data:any}>((resolve) =>
        axios.get(MY_SERVER+'getcustomer').then(res => resolve({data: res.data}))
    )
}