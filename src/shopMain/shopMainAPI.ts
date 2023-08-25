import axios from 'axios';
import {DJANGO_APP_API_URL} from '../consts'

export function fetchProducts() {
    return new Promise<{data:any}>((resolve) =>
     axios.get(DJANGO_APP_API_URL + "/products").then(res => resolve({data: res.data}))
    )
}
