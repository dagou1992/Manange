import {openNotification} from '../../Components/BaseComponent/openNotification';
import {
    addUser,
    editUser,
    deleteUser,
    getAccountList,
} from '../../services/AccountServices';

export function addAccountModalShow(bol) {
    return {
        type: 'ADD_ACCOUNT_MODAL_SHOW',
        payload: bol,
    }
}

export function initPage() {
    return dispatch => {
        dispatch({
            type: 'INIT_PAGE',
        })
        dispatch(getAccountDataList());
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
        dispatch(getAccountDataList());
    }
}

export function getAccountDataList() {
    return (dispatch, getState) => {
        const listData = getState().AccountContent;
        const params = Object.assign({}, listData.search, listData.page, listData.sorter);
        dispatch(loading(true))
        getAccountList(params).then(res => {
            dispatch({
                type: 'GET_ACCOUNT_DATA_LIST',
                payload: res,
            })
            dispatch(loading(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false))
        })
    }
}

export function loading(bol) {
    return {
        type: 'LOADING',
        payload: bol,
    }
}

export function addUserData(value) {
    return dispatch => {
        dispatch(loading(true));
        addUser(value).then(res => {
            dispatch(loading(false))
            dispatch(getAccountDataList());
            openNotification('success', 'Add Successfully');
            dispatch(addAccountModalShow(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false))
        })
    }
}

export function editUserData(value) {
    return dispatch => {
        dispatch(loading(true))
        editUser(value).then(res => {
            dispatch(loading(false))
            dispatch(getAccountDataList());
            openNotification('success', 'Edit Successfully');
            dispatch(addAccountModalShow(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false))
        })
    }
}

export function deleteUserData(value) {
    return dispatch => {
        dispatch(loading(true))
        deleteUser([value]).then(res => {
            dispatch(loading(false))
            dispatch(getAccountDataList());
            openNotification('success', 'Delete Successfully');
            dispatch(addAccountModalShow(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false))
        })
    }
}