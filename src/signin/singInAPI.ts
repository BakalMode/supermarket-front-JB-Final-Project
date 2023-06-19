import axios from 'axios'

let MY_SERVER = "http://127.0.0.1:8000/"

export function login(user: any) {
    return new Promise<{ data: any }>((resolve, reject) =>
      axios
        .post(MY_SERVER + "login", user)
        .then((response) => resolve({ data: response.data }))
        .catch((error) => reject(error))
    );
  }
