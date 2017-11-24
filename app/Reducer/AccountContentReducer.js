const defaultState = {
    data: [],
    total: 0,
    result: [],
    search: {},
    page: {
        current: 1,
        pageSize: 20,
    },
    sorter: {
        sortField: "create_at",
        sortOrder: "DESC"
    },
    authorMessage: {},
    loading: false,
    exportLoading: false,
    addAccountModalShow: false,
};

export function AccountContentReducer(state = defaultState, action) {
    switch (action.type) {
        case 'INIT_PAGE':
            return defaultState;
        case 'GET_ACCOUNT_DATA_LIST':
            return Object.assign({}, state, {
                result: action.payload,
            })
        case 'ADD_ACCOUNT_MODAL_SHOW':
            return Object.assign({}, state, {
                addAccountModalShow: action.payload,
            })
        case 'UPDATE_PAGE':
            return Object.assign({}, state, {
                page: {
                    current: action.payload.pagination.current,
                    pageSize: action.payload.pagination.pageSize,
                },
                sorter: {
                    sortField: 'create_at',
                    sortOrder: action.payload.sorter == undefined ? 'DESC' : (action.payload.sorter.order == 'descend' ? 'DESC' : 'ASC')//'descend' ascend
                },
            })
        case 'LOADING':
            return Object.assign({}, state, {
                loading: action.payload,
            })
        default:
            return state
    }
}

