import {Page} from "~/types/common";

interface HostMetaTypes {
    hostName: string,
    ip: string
}

interface QueryFormTypes extends HostMetaTypes{
    page: Page,
}

export class QueryForm

interface TableDataTypes extends HostMetaTypes{
    password: string
}

export class InitHostData {
    queryFormData: QueryFormTypes = {
        hostName: "",
        ip: "",
        page: new Page()
    }

    list: TableDataTypes[] = []
}