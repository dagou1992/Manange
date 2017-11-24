import {openNotification} from '../../Components/BaseComponent/openNotification';
import {
    exportTransactionList,
    getTransactionList,
} from "../../Services/AnalysisServices";

export function initPage() {
    return dispatch => {
        dispatch({
            type: 'INIT_PAGE',
        })
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

export function requestExportList(titles) {
    return (dispatch, getState) => {
        const listData = getState().Transaction;
        const data = Object.assign({}, listData.search.data);
        for (var i in data) {
            if (data[i] == '') {
                data[i] = null
            }
        }
        titles.splice(0, 1);
        const param = Object.assign({
            data,
            titles,
        }, listData.sorter);
        dispatch(exportLoading(true))
        exportTransactionList(param).then(res => {
            dispatch(ExportModal(false))
            dispatch(exportLoading(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(exportLoading(false))
        });
    }
}

export function getListData() {
    return (dispatch, getState) => {
        const listData = getState().Transaction;
        const params = Object.assign({}, listData.search, listData.page, listData.sorter);
        dispatch(loading(true))
        getTransactionList(params).then(res => {
            dispatch({
                type: 'GET_LIST_DATA',
                payload: res,
            })
            console.log(res)
            dispatch(loading(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false))
        })
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


export function ExportModal(bol) {
    return {
        type: 'EXPORT_SUCCESS',
        payload: bol,
    }
}


export function loading(bol) {
    return {
        type: 'LOADING',
        payload: bol,
    }
}