import axios from "axios";
import {IQueryFormData} from "~/types/admin/goods";

const service = axios.create({
    baseURL: "http://10.1.1.34:9997",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json"
    }
})

service.interceptors.request.use((req) => {
    // req.headers = req.headers || {}
    // if(localStorage.getItem("token")){
    //     req.headers.token = localStorage.getItem("token") || ""
    // }
    return req
})

service.interceptors.response.use((resp) => {
    const code: number = resp.data.code
    if(code != 200){
        return Promise.reject(resp.data)
    }
    return resp.data
}, (error) => {
    console.info(error)
})

export class GoodsApi{
    listGoods = function(data: IQueryFormData){
        return service({
            url: "/eveLn/eveb/users",
            method: "GET",
            params: data
        })
    }
}