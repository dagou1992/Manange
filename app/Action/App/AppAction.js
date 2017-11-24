import {openNotification} from '../../Components/BaseComponent/openNotification';
import {
    getApp,
    setAppPayTypeStatus
} from '../../Services/AppServices';

export function initPage() {
    return dispatch => {
        dispatch({
            type: 'INIT_PAGE',
        })
        dispatch(getDataList());
    }
}

export function getDataList() {
    return dispatch => {
        dispatch(loading(true));
        getApp().then(res => {
            dispatch(loading(false));
            dispatch({
                type: 'GET_DATA_LIST',
                payload: res,
            })
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false));
        })
    }
}

export function changeStatus(isEnabled, appId, payTypeId) {
    return dispatch => {
        const param = {
            appId,
            payTypeId,
            isEnabled: isEnabled == true ? 1 : 0,
        }
        dispatch(loading(true));
        setAppPayTypeStatus(param).then(res => {
            dispatch(loading(false));
            openNotification('success', 'Successfully');
            dispatch(changeStatusModal(false));
            dispatch(getDataList());
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


export function changeStatusModal(bool) {
    return dispatch => {
        dispatch({
            type: 'CHANGE_STATUS_MODAL',
            payload: bool,
        })
    }
}