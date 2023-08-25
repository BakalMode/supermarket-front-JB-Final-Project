import axios from 'axios';
import {DJANGO_APP_API_URL} from '../consts'

// Access the environment variable

let EMAIL_CATCHER_SERVER = "http://127.0.0.1:1025/";

export function sendEmail(email: any) {
    return new Promise<{ data: any }>((resolve) =>
        axios.post(EMAIL_CATCHER_SERVER, email).then(res => resolve({ data: res.data }))
    );
}

export function getCustomersPassword(email: any) {
    return new Promise<{ data: any }>((resolve, reject) =>
        axios
            .post(DJANGO_APP_API_URL + "/forgotpassword", email)  // Use the environment variable here
            .then((res) => resolve({ data: res.data }))
            .catch((error) => {
                alert("This email is not linked with any account.");
                reject(error);
            })
    );
}
