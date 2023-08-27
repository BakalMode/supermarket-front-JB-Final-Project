import axios from 'axios'

let EMAIL_CATCHER_SERVER = "http://127.0.0.1:1025/"
let MY_SERVER = "http://127.0.0.1:8000/"

export function sendEmail(email: any) {
    return new Promise<{ data: any }>((resolve) =>
        axios.post(EMAIL_CATCHER_SERVER, email).then(res => resolve({ data: res.data })) //im not using email catcher atm !!!
    );
}

export function getCustomersPassword(email: any) { //  getting the password in order to sent it to the Customer in the mail 
    
    return new Promise<{ data: any }>((resolve, reject) =>
    axios
      .post(MY_SERVER + "forgotpassword", email)
      .then((res) => resolve({ data: res.data }))
      .catch((error) => {
        alert("This email is not linked with any account.");
        reject(error); // Reject the promise with the error
      })
  );
}


