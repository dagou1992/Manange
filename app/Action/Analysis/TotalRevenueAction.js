import {openNotification} from '../../Components/BaseComponent/openNotification';
import {
    exportTotalRevenueList,
    getTotalRevenueList,
} from "../../Services/AnalysisServices";

export function initPage() {
    return dispatch => {
        dispatch({
            type: 'INIT_PAGE',
        });
        dispatch(getListData());
    }
}

export function updateSearchParams(value) {
    return dispatch => {
        dispatch({
            type: "SEARCH_DATA",
            payload: value
        })
        dispatch(getListData());
    }
}

export function getListData() {
    return (dispatch, getState) => {
        const listData = getState().TotalRevenue;
        const params = Object.assign({}, listData.search);
        dispatch(loading(true));
        getTotalRevenueList(params).then(res => {
            dispatch({
                type: 'GET_LIST_DATA',
                payload: res,
            });
            console.log(res);
            dispatch(loading(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false))
        })
    }
}

export function requestExportList(titles) {
    return (dispatch, getState) => {
        const listData = getState().TotalRevenue;
        const data = Object.assign({}, listData.search);
        for (var i in data) {
            if (data[i] == '') {
                data[i] = null
            }
        }
        const param = Object.assign({
            data,
            titles,
        }, listData.sorter);
        dispatch(exportLoading(true))
        exportTotalRevenueList(param).then(res => {
            dispatch(ExportModal(false))
            dispatch(exportLoading(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(exportLoading(false))
        });
    }
}

export function updatePage(pagination, filters, sorter) {
    return dispatch => {
        dispatch({
            type: 'UPDATE_PAGE',
            payload: {
                pagination,
                filters,
                sorter
            }
        })
        dispatch(getListData());
    }
}

export function exportLoading(bol) {
    return {
        type: 'EXPORT_LOADING',
        payload: bol,
    }
}

export function loading(bol) {
    return {
        type: 'LOADING',
        payload: bol,
    }
}

export function ExportModal(bol) {
    return {
        type: 'EXPORT_SUCCESS',
        payload: bol,
    }
}