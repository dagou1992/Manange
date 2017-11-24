import {getJson, postJson, postJsonForDownload} from "../utils/FetchUtil";
import uuid from 'uuid';

const reqId = uuid.v4();
const timestamp = Date.now();

/**
 * 获取支付通道列表
 */
export function getAppChargeList(param) {
    return postJson('/payment/getAppChargeList', {reqId, timestamp, param});
}

/**
 * 添加支付通道
 */
export function addPayment(param) {
    return postJson('/payment/addPayment', {reqId, timestamp, param});
}

/**
 * 编辑支付通道
 */
export function editPayment(param) {
    return postJson('/payment/editPayment', {reqId, timestamp, param});
}

/**
 * 删除支付通道
 */
export function deletePayment(param) {
    return postJson('/payment/deletePayment', {reqId, timestamp, param});
}

/**
 * 导出支付通道
 */
export function exportAppChargeList(param) {
    return postJsonForDownload('/payment/getAppChargeList/export', {reqId, timestamp, param}, 'Payment Channel.xlsx');
}


/**
 * 根据Id获取支付通道信息
 */
export function getPaymentInfo(param) {
    return getJson('/payment/getPaymentInfo?id=' + param);
}

/**
 * 获取payType列表
 */
export function getPayTypeList() {
    return getJson('/baseData/getAllPayType');
}

/**
 * 获取支付供应商列表
 */
export function getAllPayProvider() {
    return getJson('/baseData/getAllPayProvider');
}

/**
 * 获取短信运营商列表
 */
export function getAllOperator() {
    return getJson('/baseData/getAllOperator');
}

/**
 * 根据appName得到支付方式
 */
export function getPayTypeByAppName(param) {
    return getJson('/payment/getPayTypeByAppId?appId=' + param);
}

/**
 * 更新支付方式顺序
 */
export function updatePayTypeSeqByAppName(param) {
    return postJson('/payment/updatePayTypeSeqByAppName', {reqId, timestamp, param});
}


/**
 * 获取计费点列表
 */
export function getAppChargePoints(param) {
    return getJson('/payment/getAppChargePoints?settingId=' + param);
}

/**
 * 删除计费点
 */
export function deleteAppChargePoint(param) {
    return postJson('/payment/deleteAppChargePoint', {reqId, timestamp, param});
}

/**
 * 设置计费点
 */
export function setAppChargePoint(param) {
    return postJson('/payment/setAppChargePoint', {reqId, timestamp, param});
}

/**
 * 设置支付通道状态
 */
export function setAppChargeStatus(param) {
    return postJson('/payment/setAppChargeStatus', {reqId, timestamp, param});
}