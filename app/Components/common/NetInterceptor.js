import CommonError from './CommonError';
import {openNotification} from '../BaseComponent/openNotification';

export default function(json) {
    if (json.code !== 0) {
        json.code == 305? openNotification('error', 'The paymentChannel is exist'): null;
        var err = new Error(json.message);
        err.response = json;
        throw err;
    }
    return json.result;
}