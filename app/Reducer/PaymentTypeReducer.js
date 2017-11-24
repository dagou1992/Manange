const defaultState = {
    search: {},
    paymentList: [],
    exportLoading: false,
    loading: true,
    exportModalShow: false,
    visible: false,
    total: 0,
    allRevenue: 0,
    allTransaction: 0,
    page: {
        current: 1,
        pageSize: 20,
    },
    sorter: {
        sortField: 'created_at',
        sortOrder: 'DESC'
    }
};

export function PaymentTypeReducer(state = defaultState, action){
    switch (action.type){
        case 'INIT_PAGE' :
            return defaultState;
        case 'SEARCH_DATA' :
            return Object.assign({}, state, {
                search: action.payload
            });
        case 'GET_ALL_REVENUE_DATA':
            return Object.assign({}, state, {
                allRevenue: action.payload,
            })
        case 'GET_ALL_TRANSACTION_DATA':
            return Object.assign({}, state, {
                allTransaction: action.payload,
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
        case 'GET_LIST_DATA' :
            return Object.assign({}, state, {
                paymentList: action.payload,
            });
        default:
            return state
    }
}