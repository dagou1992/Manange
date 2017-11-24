import {openNotification} from '../../Components/BaseComponent/openNotification';
import {
    getPayTypeByAppName,
    updatePayTypeSeqByAppName
} from '../../Services/PayServices';

export function initPage() {
    return dispatch => {
        dispatch({
            type: 'INIT_PAGE',
        })
    }
}


export function getPayTypeList(name) {
    return dispatch => {
        dispatch(loading(true));
        getPayTypeByAppName(name).then(res => {
            dispatch(loading(false));
            dispatch({
                type: 'GET_PAY_TYPE_LIST',
                payload: res,
            })
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false));
        })
    }
}

export function submitSort(value) {
    return dispatch => {
        dispatch(loading(true));
        updatePayTypeSeqByAppName(value).then(res => {
            openNotification('success', 'Update successfully');
            dispatch(loading(false));
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false));
        })
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