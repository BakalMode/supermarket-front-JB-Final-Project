import axios from 'axios';

const MY_SERVER = "http://127.0.0.1:8000/";

export function changeCustomersPassword(password: any) {
  return axios.post(`${MY_SERVER}resetpassword`, password)
    .then(res => res.data)
    .catch(error => {
      throw new Error(error.message);
    });
}

