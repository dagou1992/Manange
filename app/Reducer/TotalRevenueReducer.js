const defaultState = {
    search: {
        period: 'Day'
    },
    data: [],
    exportLoading: false,
    loading: false,
    exportModalShow: false,
    visible: false,
    total: 0,
    page: {
        current: 1,
        pageSize: 20,
    },
    sorter: {
        sortField: 'created_at',
        sortOrder: 'DESC'
    }
};

export function TotalRevenueReducer(state = defaultState, action){
    switch (action.type){
        case 'INIT_PAGE' :
            return defaultState;
        case 'GET_LIST_DATA' :
            return Object.assign({}, state, {
                data: action.payload
            });
        case 'SEARCH_DATA' :
            return Object.assign({}, state, {
                search: action.payload
            });
        case 'UPDATE_PAGE':
            return Object.assign({}, state, {
                page: {
                    current: action.payload.pagination.current,
                    pageSize: action.payload.pagination.pageSize,
                },
            })
        case 'LOADING' :
            return Object.assign({} ,state, {
                loading: action.payload,
            });
        case 'EXPORT_LOADING' :
            return Object.assign({}, state, {
                exportLoading: action.payload,
            });
        case 'EXPORT_SUCCESS' :
            return Object.assign({}, state, {
                exportModalShow: action.payload,
            });
        default:
            return state
    }
}