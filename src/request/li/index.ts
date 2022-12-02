import axios, {AxiosStatic} from "axios";


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
    return req
})

busiService.interceptors.response.use((resp) => {
    const code: number = resp.data.code
    if(code != 200){
        return Promise.reject(resp.data)
    }
    return resp.data
}, (error) => {
    console.info(error)
})

export function listUsers(fcode: string, fname: string){
    return busiService({
        url: `/eveDl/operation/li/user?fcode=${fcode}&fname=${fname}`,
        method: "GET"
    })
}

export function getTreeData(){
    return busiService({
        url: `/eveDl/operation/li/prodProjectTree`,
    method: "GET"
    })
}

export function queryFcode(fcode: string){
    return busiService({
        url: `/eveDl/operation/li/fcodeFuzzyQuery?fcode=${fcode}`,
        method: "GET"
    })
}

export function addUser(data: any){
    return busiService({
        url: `/eveDl/operation/li/user`,
        method: "PUT",
        data
    })
}

export function getUser(id: number){
    return busiService({
        url: `/eveDl/operation/li/userRoles?userId=${id}`,
        method: "GET"
    })
}

export function deleteUser(id: number){
    return busiService({
        url: `/eveDl/operation/li/user?id=${id}`,
        method: "DELETE"
    })
}