import axios from 'axios';
import {DJANGO_APP_API_URL} from '../consts'

const token = sessionStorage.getItem('token') || '';


export function fetchProductFields(idd:any) {
    return new Promise<{data:any}>((resolve) =>
     axios.post(DJANGO_APP_API_URL+"getproductfields", { id: idd }).then(res => resolve({data: res.data}))
    )
}

export function login(user: any) {
    return new Promise<{ data: any }>((resolve, reject) =>
      axios
        .post(DJANGO_APP_API_URL + "login", user)
        .then((response) => resolve({ data: response.data }))
        .catch((error) => reject(error))
    );
  }

export function purchasedCheck(idd: any) {
  return new Promise<{ data: any }>((resolve, reject) =>
    axios
      .post(DJANGO_APP_API_URL + "purchasedbefore", { idd, Authorization: `Bearer ${token}` })
      .then((response) => resolve({ data: response.data }))
      .catch((error) => reject(error))
  );
}

export function submitReview(review: any) {
  return new Promise<{ data: any }>((resolve) => {
    axios
      .post(DJANGO_APP_API_URL + "createreview", { review, Authorization: `Bearer ${token}` })
      .then((res) => {
        alert("Review submitted successfully");
        resolve({ data: res.data });
      })
      .catch((error) => {
        if (error.response) {
          const statusCode = error.response.status;
          if (statusCode === 400) {
            alert("You must be a signed user in order to write a review.");
          } else if (statusCode === 403) {
            alert("You can only review items that you have purchased.");
          }
        } else {
          // Handle other types of errors (e.g., network errors)
          console.error("Error submitting review:", error);
        }
      });
  });
}

  
  