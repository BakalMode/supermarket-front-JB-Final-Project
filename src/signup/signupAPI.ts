import axios from 'axios'

let MY_SERVER = "http://127.0.0.1:8000/register"

export function register(user: any) {
    return new Promise<{ data: any }>((resolve) =>
        axios.post(MY_SERVER, user)
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


