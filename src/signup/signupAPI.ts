import axios from 'axios'

let MY_SERVER = "http://127.0.0.1:8000/register"

export function register(user: any) {
    return new Promise<{ data: any }>((resolve) =>
        axios.post(MY_SERVER, user).then(res => resolve({ data: res.data }))
    );
}


