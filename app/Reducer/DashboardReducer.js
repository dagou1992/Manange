const defaultState = {
    DashboardTrendList: [],
    RevenueByPayTypeList: [],
    TransactionsByPayTypeList: [],
    DashboardOverviewList: {},
    DashboardLoading: false,
    DashboardOverviewLoading: false,
};
export function DashboardReducer(state = defaultState, action) {
    switch (action.type) {
        case 'INIT_PAGE':
            return defaultState
        case 'GET_DASH_BOARD_TREND_LIST':
            return Object.assign({}, state, {
                DashboardTrendList: action.payload,
            })
        case 'GET_DASH_BOARD_OVERVIEW_LIST':
            return Object.assign({}, state, {
                DashboardOverviewList: action.payload,
            })
        case 'GET_REVENUE_BY_PAY_TYPE_LIST':
            return Object.assign({}, state, {
                RevenueByPayTypeList: action.payload,
            })
        case 'GET_TRANSACTION_BY_PAY_TYPE_LIST':
            return Object.assign({}, state, {
                TransactionsByPayTypeList: action.payload,
            })
        case 'DASHBOARD_LOADING':
            return Object.assign({}, state, {
                DashboardLoading: action.payload,
            })
        case 'DASHBOARD_OVERVIEW_LOADING':
            return Object.assign({}, state, {
                DashboardOverviewLoading: action.payload,
            })
        default:
            return state
    }
}
