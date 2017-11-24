import {postJsonForDownload, postJson, getJson} from "../utils/FetchUtil";
import uuid from 'uuid';

const reqId = uuid.v4();
const timestamp = Date.now();

/**
 * 添加或者编辑APP
 */
export function handleChangeApp(param) {
    const api = param.id? '/app/editApp': '/app/addApp';
    return postJson(api, {reqId, timestamp, param});
}

/**
 * 删除App
 */
export function deleteApp(param) {
    return postJson('/app/deleteApp', {reqId, timestamp, param})
}

/**
 * 获取APP列表
 */
export function getApp() {
    return getJson('/app/getAppList');
}

/**
 * 根据AppID获取信息
 */
export function getAppById(param) {
    return getJson('/app/getAppById?id=' + param )
}

/**
 * 更改APP状态
 */
export function setAppPayTypeStatus(param) {
    return postJson('/app/setAppPayTypeStatus', {reqId, timestamp, param})
}