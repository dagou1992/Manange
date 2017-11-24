const defaultState = {
    data: [],
    loading: false,
    changeStatusModal: false,
};
export function AppReducer(state = defaultState, action) {
    switch (action.type) {
        case 'INIT_PAGE':
            return defaultState
        case 'GET_DATA_LIST':
            return Object.assign({}, state, {
                data: action.payload
            })
        case 'CHANGE_STATUS_MODAL':
            return Object.assign({}, state, {
                changeStatusModal: action.payload,
            })
        case 'LOADING':
            return Object.assign({}, state, {
                loading: action.payload,
            })
        default:
            return state
    }
}
