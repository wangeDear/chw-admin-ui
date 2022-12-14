import axios from "axios";
import {QueryForm} from "~/types/admin/hostTypes";

const service = axios.create({
    baseURL: "/solon-api",
    timeout: 30000,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})

service.interceptors.request.use(req => {
    return req
})

service.interceptors.response.use(resp => {
    return resp.data
})

export function listHost(data: QueryForm){
    return service({
        url: "/host/list",
        method: "GET",
        data
    })
}