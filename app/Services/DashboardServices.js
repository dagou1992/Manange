import {getJson} from "../utils/FetchUtil";

/**
* 获取收益走势
*/
export function getDashboardTrend(param) {
    return getJson('/dashBoard/getDashboardTrend?timeType='+ param);
}


/**
 * 获取收益总览
 */
export function getDashboardOverview(param) {
    return getJson('/dashBoard/getDashboardOverview?timeType='+ param);
}

/**
 * 获取按付款总订单数统计支付类型占比
 */
export function getTransactionsByPayType() {
    return getJson('/dashBoard/getTransactionsByPayType');
}

/**
 * 获取按付款总金额统计支付类型占比
 */
export function getRevenueByPayType() {
    return getJson('/dashBoard/getRevenueByPayType');
}