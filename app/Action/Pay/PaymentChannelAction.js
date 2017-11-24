import {openNotification} from '../../Components/BaseComponent/openNotification';
import {
    addPayment,
    editPayment,
    deletePayment,
    getAppChargeList,
    setAppChargeStatus,
    exportAppChargeList,
} from '../../Services/PayServices';

export function initPage() {
    return dispatch => {
        dispatch({
            type: 'INIT_PAGE',
        })
        dispatch(getDataList());
    }
}

export function updateSearchParams(value) {
    return (dispatch, getState) => {
        dispatch({
            type: "SEARCH_DATA",
            payload: value
        })
        dispatch(getDataList());
    }
}

export function requestExportList(titles) {
    return (dispatch, getState) => {
        const listData = getState().PaymentChannel;
        const data = Object.assign({}, listData.search.data);
        for (var i in data) {
            if (data[i] == '') {
                data[i] = null
            }
        }
        titles = titles.slice(0, 8);
        const param = Object.assign({
            data,
            titles,
        }, listData.sorter);
        dispatch(exportLoading(true))
        exportAppChargeList(param).then(res => {
            dispatch(ExportModal(false))
            dispatch(exportLoading(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(exportLoading(false))
        });
    }

}

export function getDataList() {
    return (dispatch, getState) => {
        const listData = getState().PaymentChannel;
        const params = Object.assign({}, listData.page, listData.search);
        dispatch(loading(true));
        getAppChargeList(params).then(res => {
            dispatch(loading(false));
            dispatch({
                type: 'GET_DATA_LIST',
                payload: res,
            })
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
        dispatch(getDataList());
    }
}

export function setStatus(param) {
    return dispatch => {
        dispatch(loading(true));
        setAppChargeStatus(param).then(res => {
            dispatch(loading(false));
            dispatch(confirmModalShow(false));
            dispatch(getDataList());
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false));
        })
    }
}

export function addPaymentChannel(param) {
    return dispatch => {
        dispatch(loading(true));
        setTimeout(function() {
            dispatch(loading(false))
        }, 2000)
        addPayment(param).then(res => {
            dispatch(addPaymentChannelModalShow(false));
            dispatch(getDataList());
            openNotification('success', 'Successfully');
            dispatch(loading(false));
        }).then(err => {
            console.log(err)
            openNotification('error', err.message);
            dispatch(loading(false));
        })
    }
}

export function editPaymentChannel(param) {
    return dispatch => {
        dispatch(loading(true));
        editPayment(param).then(res => {
            dispatch(loading(false));
            dispatch(addPaymentChannelModalShow(false));
            dispatch(getDataList());
            openNotification('success', 'Successfully');
        }).then(err => {
            dispatch(loading(false));
            openNotification('error', err.message);
        })
    }
}

export function deletePaymentChannel(ids) {
    return dispatch => {
        dispatch(loading(true));
        deletePayment(ids).then(res => {
            dispatch(loading(false));
            dispatch(addPaymentChannelModalShow(false));
            dispatch(getDataList());
            openNotification('success', 'Successfully');
        }).then(err => {
            dispatch(loading(false));
            openNotification('error', err.message);
        })
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


export function loading(bool) {
    return dispatch => {
        dispatch({
            type: 'LOADING',
            payload: bool,
        })
    }
}

export function confirmModalShow(bool) {
    return {
        type: 'CONFIRM_MODAL_SHOW',
        payload: bool,
    }
}

export function addPaymentChannelModalShow(bool) {
    return {
        type: 'ADD_PAYMENT_CHANNEL_MODAL_SHOW',
        payload: bool
    }
}
