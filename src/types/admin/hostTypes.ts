import {Page} from "~/types/common";

interface HostMetaTypes {
    hostName: string,
    ip: string
}

interface QueryFormTypes extends HostMetaTypes{
    page: Page,
}

export class QueryForm implements QueryFormTypes {
    hostName: string = ""
    ip: string = ""
    page: Page = new Page()

}

interface TableDataTypes extends HostMetaTypes{
    password: string
}

export class InitHostData {
    queryFormData: QueryForm = new QueryForm()

    list: TableDataTypes[] = []
}