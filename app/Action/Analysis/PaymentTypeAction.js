import {openNotification} from '../../Components/BaseComponent/openNotification';
import {
    exportPayMentTypeList,
    getPayMentTypeList,
} from "../../Services/AnalysisServices";

export function initPage(){
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

export function getListData(){
    return (dispatch, getState) => {
        const listData = getState().PaymentType;
        const params = Object.assign({}, listData.search);
        dispatch(loading(true));
        getPayMentTypeList(params).then(res => {
            dispatch({
                type: 'GET_LIST_DATA',
                payload: res,
            });
            let allRevenue = 0, allTransaction = 0;
            res.map((item, index) => {
                allRevenue += item.totalGoodsPrice;
                allTransaction += item.payTypeNameCount;
            })
            dispatch({
                type: 'GET_ALL_REVENUE_DATA',
                payload: allRevenue,
            });
            dispatch({
                type: 'GET_ALL_TRANSACTION_DATA',
                payload: allTransaction,
            });
            dispatch(loading(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(loading(false))
        })
    }
}

export function requestExportList(titles) {
    return (dispatch, getState) => {
        const listData = getState().PaymentType;
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
        exportPayMentTypeList(param).then(res => {
            dispatch(ExportModal(false))
            dispatch(exportLoading(false))
        }).catch(err => {
            openNotification('error', err.message);
            dispatch(exportLoading(false))
        });
    }
}

export function exportLoading(bol){
    return {
        type: 'EXPORT_LOADING',
        payload: bol,
    }
}

export function loading(bol){
    return {
        type: 'LOADING',
        payload: bol,
    }
}

export function ExportModal(bol){
    return {
        type: 'EXPORT_SUCCESS',
        payload: bol,
    }
}