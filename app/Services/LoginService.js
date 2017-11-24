import {postJson,postForLogin,getJson} from "../utils/FetchUtil";
import uuid from 'uuid';

const reqId = uuid.v4();
const timestamp = Date.now();

/**
 * 修改密码
 */
export function updatePasswords(param){
    return postJson('/loginUser/modifyPassword', {reqId, timestamp, param});
}


/**
 * 获取用户列表
 */
export function getUserList(){
    return getJson('/loginUser/getLoginUserInfo');
}


/**xr
 * 用户登录
 */
export function userLogin(username, password, captcha){
    const param = {
        username,
        password,
        captcha,
    }
    console.log(param)
    return postForLogin('/auth/login', {reqId, timestamp, param})
}


export function userLogout() {
    return postJson('/auth/logout', {reqId, timestamp});
}
