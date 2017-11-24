const defaultState = {
    data: [],
    loading: false,
};
export function PaymentRankReducer(state = defaultState, action) {
    switch (action.type) {
        case 'INIT_PAGE':
            return defaultState
        case 'GET_PAY_TYPE_LIST':
            return Object.assign({}, state, {
                data: action.payload,
            })
        case 'LOADING':
            return Object.assign({}, state, {
                loading: action.payload,
            })
        default:
            return state
    }
}



