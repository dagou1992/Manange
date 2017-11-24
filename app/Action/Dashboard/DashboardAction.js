import {openNotification} from '../../Components/BaseComponent/openNotification';
import {
    getDashboardTrend,
    getDashboardOverview,
    getRevenueByPayType,
    getTransactionsByPayType,
} from '../../Services/DashboardServices';

export function initPage() {
    return dispatch => {
        dispatch({
            type: 'INIT_PAGE',
        })
        dispatch(getDashboardTrendList('monthly'));
        dispatch(getDashboardOverviewList('daily'));
        dispatch(getRevenueByPayTypeList());
        dispatch(getTransactionsByPayTypeList());
    }
}

export function getDashboardTrendList(type) {
    return dispatch => {
        dispatch(DashboardLoading(true));
        getDashboardTrend(type).then(res => {
            dispatch(DashboardLoading(false));
            dispatch({
                type: 'GET_DASH_BOARD_TREND_LIST',
                payload: res,
            })
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false));
        })
    }
}

export function getTransactionsByPayTypeList() {
    return dispatch => {
        getTransactionsByPayType().then(res => {
            dispatch({
                type: 'GET_TRANSACTION_BY_PAY_TYPE_LIST',
                payload: res,
            })
        })
    }
}

export function getRevenueByPayTypeList() {
    return dispatch => {
        getRevenueByPayType().then(res => {
            dispatch({
                type: 'GET_REVENUE_BY_PAY_TYPE_LIST',
                payload: res,
            })
        })
    }
}

export function getDashboardOverviewList(type) {
    return dispatch => {
        dispatch(DashboardOverviewLoading(true));
        getDashboardOverview(type).then(res => {
            dispatch(DashboardOverviewLoading(false));
            dispatch({
                type: 'GET_DASH_BOARD_OVERVIEW_LIST',
                payload: res,
            })
        })
    }
}

export function DashboardLoading(bool) {
    return dispatch => {
        dispatch({
            type: 'DASHBOARD_LOADING',
            payload: bool,
        })
    }
}

export function DashboardOverviewLoading(bool) {
    return dispatch => {
        dispatch({
            type: 'DASHBOARD_OVERVIEW_LOADING',
            payload: bool,
        })
    }
}