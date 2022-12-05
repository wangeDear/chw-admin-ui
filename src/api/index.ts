import axios from "axios";


const busiService = axios.create({
    baseURL: "http://10.1.1.34:9998",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json"
    }
})

busiService.interceptors.request.use((req) => {
    // req.headers = req.headers || {}
    // if(localStorage.getItem("token")){
    //     req.headers.token = localStorage.getItem("token") || ""
    // }
    // return req
})

busiService.interceptors.response.use((resp) => {
    console.info(resp)
    // const code: number = resp.data.code
    // if(code != 200){
    //     return Promise.reject(resp.data)
    // }
    return resp
}, error => {
    console.info(error)
})