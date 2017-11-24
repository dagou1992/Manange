const defaultState = {
    data: [],
    total: 0,
    page: {
        current: 1,
        pageSize: 20,
    },
    search: {
        data: {}
    },
    loading: false,
    exportLoading: false,
    exportModalShow: false,
    confirmModalShow: false,
    addPaymentChannelModalShow: false,
};
export function PaymentChannelReducer(state = defaultState, action) {
    switch (action.type) {
        case 'INIT_PAGE':
            return defaultState
        case 'GET_DATA_LIST':
            return Object.assign({}, state, {
                data: action.payload.data,
                total: action.payload.total,
            })
        case "SEARCH_DATA":
            return Object.assign({}, state, {
                search: {
                    data: action.payload,
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
            })
        case 'LOADING':
            return Object.assign({}, state, {
                loading: action.payload,
            })
        case 'EXPORT_LOADING':
            return Object.assign({}, state, {
                exportLoading: action.payload,
            })
        case 'EXPORT_SUCCESS':
            return Object.assign({}, state, {
                exportModalShow: action.payload,
            })
        case 'CONFIRM_MODAL_SHOW':
            return Object.assign({}, state, {
                confirmModalShow: action.payload,
            })
        case 'ADD_PAYMENT_CHANNEL_MODAL_SHOW':
            return Object.assign({}, state, {
                addPaymentChannelModalShow: action.payload,
            })
        default:
            return state
    }
}


