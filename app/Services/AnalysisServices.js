import {postJsonForDownload, postJson} from "../utils/FetchUtil";
import uuid from 'uuid';

const reqId = uuid.v4();
const timestamp = Date.now();

/**
 *  获取transaction列表
 */
export function getTransactionList(param){
    return postJson('/analysis/transactionStatistics' ,{reqId, timestamp, param});
}

/**
 *  导出transaction列表
 */
export function exportTransactionList(param){
    return postJsonForDownload('/analysis/transactionStatistics/export' ,{reqId, timestamp, param}, 'transaction.xlsx');
}

/**
 *  获取totalRevenue列表
 */
export function getTotalRevenueList(param){
    return postJson('/analysis/totalRevenueStatistics' ,{reqId, timestamp, param});
}

/**
 *  导出TotalRevenue列表
 */
export function exportTotalRevenueList(param){
    return postJsonForDownload('/analysis/totalRevenueStatistics/export' ,{reqId, timestamp, param}, 'totalRevenue.xlsx');
}
/**
 *  获取totalRevenue列表
 */
export function getPayMentTypeList(param){
    return postJson('/analysis/paymentTypeStatistics' ,{reqId, timestamp, param});
}

/**
 *  导出TotalRevenue列表
 */
export function exportPayMentTypeList(param){
    return postJsonForDownload('/analysis/paymentTypeStatistics/export' ,{reqId, timestamp, param}, 'payMentType.xlsx');
}

