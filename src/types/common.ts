interface PageTypes {
    page: number,
    pageSize: number,
    total: number
}

export class Page implements PageTypes{
    page = 1
    pageSize = 10
    total = 0
}