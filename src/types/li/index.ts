interface SearchForm {
    fcode: string,
    fname: string
}

class SearchFormData {
    searchForm: SearchForm = {
        fcode: '',
        fname: ''
    }
}

export {SearchForm, SearchFormData}