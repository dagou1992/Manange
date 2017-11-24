import {postJsonForDownload, postJson ,getJson} from "../utils/FetchUtil";
import uuid from 'uuid';

const reqId = uuid.v4();
const timestamp = Date.now();

/**
 * 获取Account 列表
 */
export function getAccountList(param) {
    return postJson('/account/getAccountList', {reqId, timestamp, param});
}


/**
 * 根据Id获取信息
 */
export  function getUserById(param) {
    return getJson('/account/getAccountById?id='+param);
}


/**
 * 删除User
 */
export function deleteUser(param) {
    return postJson('/account/deleteAccount', {reqId, timestamp, param});
}


/**
 * 添加User
 */
export function addUser(param) {
    return postJson('/account/addAccount', {reqId, timestamp, param});
}

/**
 * 编辑User
 */
export function editUser(param) {
    return postJson('/account/editAccount', {reqId, timestamp, param});
}