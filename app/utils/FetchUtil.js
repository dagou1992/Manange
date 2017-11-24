import interceptor from '../components/common/NetInterceptor';
import 'whatwg-fetch';
import AuthorizeError from '../components/common/AuthorizeError';
//import appPackage from '../../manage/package.json';
import config from 'config';

console.log(config);

//登录军团

//window._use_proxy = config.useProxy;//appPackage.devConfig.useProxy;
var API_HOST = getApiHost();
var API_BASE_PATH = getApiBsePath();

function getApiHost() {
    return window.location.host;
}

function getApiBsePath() {
    if (config.useProxy) {
        return "/api/";
    } else {
        if (window.location.pathname.lastIndexOf("index.html") > 0) {
            return location.pathname.substring(0, window.location.pathname.lastIndexOf("index.html"))
        }

        return window.location.pathname;
    }
    return "/api/";
}
/**
 * 发送一个获取JSON的GET请求
 * @param {string} api 不包含host与basePath的url，可包含{pathName}形式的path参数
 * @param {Object} query 可选
 * @param {Object} pathValues 可选
 * @param {boolean} https 可选
 * @returns {Promise}
 */
export function getJson(api, query, pathValues = null, withInterceptor = true, https = false) {
    api = applyBasePath(api, API_HOST + API_BASE_PATH, https);
    api = applyQuery(api, query);
    api = applyPathValues(api, pathValues);

    const responseBean = fetch(api, {
        method: 'get',
        headers: addTokenToHeaders({
            'Accept': 'application/json'
        })
    }).then(res => {
        if (!res.ok) {
            var error = new Error(res.statusText);
            error.response = res;

            if (error.response.status === AuthorizeError.status) {
                throw new AuthorizeError(error.response);
            }

            throw error;
        }

        const contentType = res.headers.get('Content-Type');
        if (contentType != null && contentType.indexOf('json') > 0) {
            return res.json();
        }

        return res;
    });

    if (withInterceptor) {
        return responseBean.then(interceptor);
    } else {
        return responseBean;
    }
}

/**
 * 发送一个获取JSON的POST请求
 * @param {string} api 不包含host与basePath的url，可包含{pathName}形式的path参数
 * @param {Object} data 可选
 * @param {Object} pathValues 可选
 * @param {boolean} https 可选
 * @returns {Promise}
 */
export function postJson(api, data = {}, pathValues = null, withInterceptor = true, https = false) {
    api = applyBasePath(api, API_HOST + API_BASE_PATH, https);
    api = applyPathValues(api, pathValues);

    const responseBean = fetch(api, {
        method: 'post',
        credentials: 'include',
        headers: addTokenToHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    }).then(res => {
        if (!res.ok) {
            var error = new Error(res.statusText);
            error.response = res;

            if (error.response.status === AuthorizeError.status) {
                throw new AuthorizeError(error.response);
            }

            throw error;
            console.log(res)
        }

        const contentType = res.headers.get('Content-Type');
        if (contentType != null && contentType.indexOf('json') > 0) {
            return res.json();
        }

        return res;
    });

    if (withInterceptor) {
        return responseBean.then(interceptor);
    } else {
        return responseBean;
    }
}

/**
 * 表单提交
 * @param api
 * @param fieldsValue
 * @param pathValues
 * @param withInterceptor
 * @param https
 * @return {*}
 */
export function postForm(api, fieldValues, pathValues = null, withInterceptor = true, https = false) {
    api = applyBasePath(api, API_HOST + API_BASE_PATH, https);
    api = applyPathValues(api, pathValues);

    const responseBean = fetch(api, {
        method: 'POST',
        headers: addTokenToHeaders({}),
        body: createFormData(fieldValues)
    }).then(res => {
        if (!res.ok) {
            var error = new Error(res.statusText);
            error.response = res;

            if (error.response.status === AuthorizeError.status) {
                throw new AuthorizeError(error.response);
            }

            throw error;
        }

        const contentType = res.headers.get('Content-Type');
        if (contentType != null && contentType.indexOf('json') > 0) {
            return res.json();
        }

        return res;
    });

    if (withInterceptor) {
        return responseBean.then(interceptor);
    } else {
        return responseBean;
    }
}

/**
 * 提交表单
 * @param api
 * @param formData
 */
export function postJsonForDownload(api, data = {}, filename, pathValues = null, https = false) {
    api = applyBasePath(api, API_HOST + API_BASE_PATH, https);
    api = applyPathValues(api, pathValues);
    return fetch(api, {
        method: 'POST',
        headers: addTokenToHeaders({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    }).then(res => {
        if (res.ok) {
            return res.blob();
        } else {
            throw new Error('request failed');
        }
    }).then(blob => {
        let a = document.createElement('a');
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    });
}

/**
 * @param {string} api
 * @param {string} basePath
 * @param {boolean} https
 * @returns {string}
 */
function applyBasePath(api, basePath, https=false) {
    if (typeof api !== 'string') {
        throw new Error('api must be string');
    }

    if (typeof basePath !== 'string') {
        throw new Error('basePath must be string');
    }

    const testIsFullPath = /.*:\/\/.*/;
    if (testIsFullPath.test(api)) {
        return api;
    }

    const patten1 = /.*\/$/;
    const patten2 = /^\/.*/;

    if (patten1.test(basePath) && patten2.test(api)) {
        api = api.substring(1);
    }

    let proto = https ? 'https://' : 'http://';

    return proto + basePath + api;
}

/**
 * @param {string} api
 * @param {Object} query
 * @returns {string}
 */
function applyQuery(api, query) {
    if (!query) {
        return api;
    }

    if (api.indexOf('?') < 0) {
        api += '?';
    }

    for (let key in query) {
        if (query.hasOwnProperty(key)) {
            let value = query[key];
            if (value == null || value + '' == '') {
                continue;
            }

            if (api.indexOf('?') !== api.length-1 && api.indexOf('&') !== api.length) {
                api += '&';
            }

            api = api + `${key}=` + value;
        }
    }

    return api;
}

/**
 * @param {string} api
 * @param {Object} pathValues
 * return {string}
 */
function applyPathValues(api, pathValues) {
    if (pathValues) {
        const rex = /{\w+}/g;

        let matched = api.match(rex);
        for (let match of matched) {
            let pathName = match.substr(1, match.length - 2);
            if (pathValues[pathName]) {
                api = api.replace(match, '' + pathValues[pathName]);
            }
        }
    }

    return api;
}

function createFormData(fieldsValue) {
    if (fieldsValue == null) {
        return null;
    }

    let formData = new FormData();

    for (let key in fieldsValue) {
        if (fieldsValue.hasOwnProperty(key)) {
            const value = fieldsValue[key];

            if (Array.isArray(value)) {
                for (let item of value) {
                    formData.append(key, item);
                }
            } else {
                if (value != undefined) {
                    formData.append(key, value);
                }
            }
        }
    }

    return formData;
}

function addTokenToHeaders(headers) {
    const token = window.localStorage.getItem("_TOKEN_");

    if (token == null) {
        return headers;
    }

    return Object.assign(headers, {"X-Auth-Token": token});
}

/**
 * @param {string} api
 * @param {string} basePath
 * @param {boolean} https
 * @returns {string}
 */
export function applyBasePath(api, basePath=(API_HOST + API_BASE_PATH), https=false) {
    if (typeof api !== 'string') {
        throw new Error('api must be string');
    }

    if (typeof basePath !== 'string') {
        throw new Error('basePath must be string');
    }

    const testIsFullPath = /.*:\/\/.*/;
    if (testIsFullPath.test(api)) {
        return api;
    }

    const patten1 = /.*\/$/;
    const patten2 = /^\/.*/;

    if (patten1.test(basePath) && patten2.test(api)) {
        api = api.substring(1);
    }

    let proto = https ? 'https://' : 'http://';

    return proto + basePath + api;
}

//登录
export function postForLogin(api, data = {}, pathValues = null, withInterceptor = true, https = false) {
    api = applyBasePath(api, API_HOST + API_BASE_PATH, false);

    return fetch(api, {
        method: 'post',
        credentials: 'include',
        headers: addTokenToHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    }).then(res => {
        const token = res.headers.get('X-Auth-Token');
        saveToken(token);
        return res.json();
    }).then(interceptor);
}

function saveToken(token) {
    window.localStorage.setItem("_TOKEN_", token);
}


