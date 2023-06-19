import axios from 'axios'
import { log } from 'console';

let EMAIL_CATCHER_SERVER = "http://127.0.0.1:1025/"
let MY_SERVER = "http://127.0.0.1:8000/"

export function sendEmail(email: any) {
    return new Promise<{ data: any }>((resolve) =>
        axios.post(EMAIL_CATCHER_SERVER, email).then(res => resolve({ data: res.data })) //im not using email catcher atm !!!
    );
}

export function getCustomersPassword(email: any) { //  getting the password in order to sent it to the Customer in the mail 
    console.log(email.email);
    
    return new Promise<{ data: any }>((resolve, reject) =>
    axios
      .post(MY_SERVER + "forgotpassword", email)
      .then((res) => resolve({ data: res.data }))
      .catch((error) => {
        console.log(error);
        alert("Failed to send email.");
        reject(error); // Reject the promise with the error
      })
  );
}


  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   console.log('Email:', email);
  //   // TODO: Add logic to send the email and handle the submission
  // };
  // const onSubmit = () => {
  //   dispatch(sendEmailAsync({email})).then(() => {
  //     navigate.caller('http://localhost:3000'); // Redirect to the desired URL (e.g., http://localhost:3000/)
  //     //adittionaly i would like an alert to pop informing the customer that the email was sent !!!!!
  //   });
  // };

  //this belongs to prev tsx file