import axios from 'axios';

let MY_SERVER = "http://127.0.0.1:8000/products"

export function fetchProducts() {
    return new Promise<{data:any}>((resolve) =>
     axios.get(MY_SERVER).then(res => resolve({data: res.data}))
    )
}
