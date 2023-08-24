import axios from 'axios'
import {DJANGO_APP_API_URL} from '../consts'

export function login(user: any) {
    return new Promise<{ data: any }>((resolve, reject) =>
      axios
        .post(DJANGO_APP_API_URL + "login", user)
        .then((response) => resolve({ data: response.data }))
        .catch((error) => reject(error))
    );
  }
