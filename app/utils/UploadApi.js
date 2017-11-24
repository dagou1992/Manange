import {getJson, postForm} from '../utils/FetchUtil';
import {notification} from 'antd';

const openNotificationWithIcon = (type, title) => {
    notification[type]({
        message: type,
        description: title,
    });
};

/**
 * 获取上次文件临时凭证
 * @param userId
 * @returns {Promise}
 */
function getPostFileCertificate(dir) {
    return getJson("upload/certificate/post/{directory}", null, {directory: dir});
}

/**
 * 上传文件到OSS
 * @param certificate
 * @param imageFile
 * @param objectKey
 * @returns {*|Promise.<T>}
 */
function uploadToOss(certificate, file) {
    const fileName = file.name;
    const timestamp = parseInt(Date.parse(new Date())/1000);
    const objectKey = certificate.dir + fileName + '_' + timestamp;

    let fieldValues = {
        key: objectKey,
        policy: certificate.policy,
        OSSAccessKeyId: certificate.accessid,
        success_action_status: '200',
        signature: certificate.signature,
        file: file
    };

    return postForm(certificate.host, fieldValues, null, false).then(res => {
        const objectKey = certificate.dir + fileName + '_' + timestamp;
        openNotificationWithIcon('success','上传成功');
        return objectKey;
    })
}

/**
 * 上传封面图片
 * @param imageFile
 * @returns {Promise.<T>}
 */
export function uploadAlbumConver(imageFile) {
    return getPostFileCertificate('cover').then(res => {
        return uploadToOss(res, imageFile);
    });
}

/**
 * 上传协议清单中的文件到oss
 */
export function uploadAgreementFile(file) {
    return getPostFileCertificate('agreement').then(res => {
        return uploadToOss(res, file);
    })
}

/**
 * 上传版权清单中的文件到oss
*/
export function uploadCopyrightFile(file) {
    return getPostFileCertificate('copyright').then(res => {
            return uploadToOss(res, file);
});
}


/**
 * 获取文件的链接
 */
export function getUrl(key){
    return getJson('/upload/accessibleUrl?object='+key);
}



