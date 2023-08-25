import axios from 'axios'
import {DJANGO_APP_API_URL} from '../consts'

export function register(user: any) {
    return new Promise<{ data: any }>((resolve) =>
        axios.post(DJANGO_APP_API_URL + "/register", user)
            .then(res => resolve({ data: res.data }))
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    // The email is already in use (status code 401)
                    alert('Email is already in use.');
                } else {
                    // Handle other errors, if needed
                    console.error('Error during registration:', error);
                }
            })
    );
}


