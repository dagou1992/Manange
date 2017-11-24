import {notification} from 'antd';

export const openNotification = (type,content) => {
    notification[type]({
        message: type,
        description: content,
    });
};
