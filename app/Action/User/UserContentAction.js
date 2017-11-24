import {openNotification} from '../../Components/BaseComponent/openNotification';
import {
    exportUserList,
    getUserList,
    changeUserStatus
} from '../../services/UserServices';

export function initPage() {
    return dispatch => {
        dispatch({
            type: 'INIT_PAGE',
        })
        dispatch(getListData());
    }
}

export function updateSearchParams(value) {
    return (dispatch, getState) => {
        dispatch({
            type: "SEARCH_DATA",
            payload: value
        })
        dispatch(getListData());
    }
}

export function requestExportList(titles) {
    return (dispatch, getState) => {
        const listData = getState().UserContent;
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
        exportUserList(param).then(res => {
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
        const listData = getState().UserContent;
        const params = Object.assign({}, listData.search, listData.page, listData.sorter);
        dispatch(loading(true))
        getUserList(params).then(res => {
            dispatch({
                type: 'GET_LIST_DATA',
                payload: res,
            })
            dispatch(loading(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false))
        })
    }
}

export function updatePage(pagination, filters, sorter) {
    return (dispatch, getState) => {
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

export function changeStatus(appUserId, isEnabled) {
    return (dispatch, getState) => {
        var change = (isEnabled == true ? 1 : 0);
        dispatch(buttonLoading(true))
        changeUserStatus(appUserId, change).then(res => {
            dispatch(getListData());
            dispatch(confirmModalShow(false));
            dispatch(buttonLoading(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(buttonLoading(false))
        })
    }
}

export function exportLoading(bol) {
    return {
        type: 'EXPORT_LOADING',
        payload: bol,
    }
}

export function buttonLoading(bol) {
    return {
        type: 'BUTTON_LOADING',
        payload: bol,
    }
}

export function ExportModal(bol) {
    return {
        type: 'EXPORT_SUCCESS',
        payload: bol,
    }
}

export function confirmModalShow(bol) {
    return {
        type: 'CONFIRM_MODAL_SHOW',
        payload: bol,
    }
}

export function loading(bol) {
    return {
        type: 'LOADING',
        payload: bol,
    }
}