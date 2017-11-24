import {postJsonForDownload, postJson} from "../utils/FetchUtil";
import uuid from 'uuid';

const reqId = uuid.v4();
const timestamp = Date.now();

/**
 * user导出
 */
export function exportUserList(param) {
    return postJsonForDownload('/appUser/getAppUserList/export', {reqId, timestamp, param}, 'user.xlsx');
}

/**
 * 获取user列表
 */
export function getUserList(param) {
    return postJson('/appUser/getAppUserList', {reqId, timestamp, param});
}

/**
 * 更改user状态
 */

export function changeUserStatus(id, change) {
    const param = {
        id,
        isEnabled: change,
    }
    return postJson('/appUser/updateAppUserStatus', {reqId, timestamp, param});

}

