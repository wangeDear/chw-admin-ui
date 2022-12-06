export interface IQueryFormData {
    id: string,
    name: string,
    pageSize: number,
    page: number
}
export class QueryFormData {
    formData: IQueryFormData = {
        id: "",
        name: "",
        pageSize: 10,
        page: 1
    }

}
interface ITableListData {
    id: number,
    name: string,
    password: string
}

export class TableData {
    listData: ITableListData[] = []
    pageSize: number = 10
    page: number = 1
    count: number = 0
}