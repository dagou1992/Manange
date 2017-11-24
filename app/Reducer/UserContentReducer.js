const defaultState = {
    data: [],
    buttonLoading: false,
    visible: false,
    loading: true,
    payment: [],
    total: 0,
    search: {
        data: {}
    },
    page: {
        current: 1,
        pageSize: 20,
    },
    sorter: {
        sortField: "created_at",
        sortOrder: "DESC"
    },
    exportModalShow: false,
    confirmModalShow: false,
    exportLoading: false,
};

export function UserContentReducer(state = defaultState, action) {
    switch (action.type) {
        case 'INIT_PAGE':
            return defaultState
        case 'GET_LIST_DATA':
            return Object.assign({}, state, {
                data: action.payload.data,
                total: action.payload.total,
            })
        case "SEARCH_DATA" :
            return Object.assign({}, state, {
                search: {
                    data: action.payload
                },
                page: {
                    current: 1,
                    pageSize: state.page.pageSize,
                }
            })

        case 'UPDATE_PAGE':
            return Object.assign({}, state, {
                page: {
                    current: action.payload.pagination.current,
                    pageSize: action.payload.pagination.pageSize,
                },
                sorter: {
                    sortField: 'created_at',
                    sortOrder: action.payload.sorter == undefined ? 'DESC' : (action.payload.sorter.order == 'descend' ? 'DESC' : 'ASC')//'descend' ascend
                },
            })
        case 'LOADING' :
            return Object.assign({}, state, {
                loading: action.payload,
            })
        case 'EXPORT_SUCCESS':
            return Object.assign({}, state, {
                exportModalShow: action.payload,
            })
        case 'EXPORT_LOADING':
            return Object.assign({}, state, {
                exportLoading: action.payload,
            })
        case 'BUTTON_LOADING':
            return Object.assign({}, state, {
                buttonLoading: action.payload,
            })
        case 'CONFIRM_MODAL_SHOW':
            return Object.assign({}, state, {
                confirmModalShow: action.payload,
            })
        default:
            return state
    }
}
