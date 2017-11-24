//获取当前时间，格式YYYY-MM-DD
export function getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//计算时间差
export function getTime2Time($time1, $time2) {
    let time1 = arguments[0], time2 = arguments[1];
    time1 = Date.parse(time1) / 1000;
    time2 = Date.parse(time2) / 1000;
    let time_ = time1 - time2;
    return (time_ / (3600 * 24));
}
//标准时间转换日期
function formatTen(num) {
    return num > 9 ? (num + "") : ("0" + num);
}

export function formatDate(date) {
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var seconds = date.getSeconds();
    return formatTen(day) + "-" + formatTen(month) + "-" + year + ' ' + formatTen(hour) + ':' + formatTen(minute) + ':' + formatTen(seconds);
}

export function timeReverse(time) {
    const start_Y = time.split(' ')[0].split('-')[0];
    const start_M = time.split(' ')[0].split('-')[1];
    const start_D = time.split(' ')[0].split('-')[2];
    return start_D + "-" + start_M + "-" + start_Y;
}

export function timeReverseReverse(time) {
    const start_Y = time.split(' ')[0].split('-')[2];
    const start_M = time.split(' ')[0].split('-')[1];
    const start_D = time.split(' ')[0].split('-')[0];
    return start_Y + "-" + start_M + "-" + start_D;
}

export function timeReverseReverseWithMinutes(time) {
    const start_Y = time.split(' ')[0].split('-')[2];
    const start_M = time.split(' ')[0].split('-')[1];
    const start_D = time.split(' ')[0].split('-')[0];
    return start_Y + "-" + start_M + "-" + start_D + ' ' + time.split(' ')[1];
}

export function changeToStamp(time) {
    return Date.parse(new Date(time));
}

export function get_unix_time(dateStr) {
    var newstr = dateStr.replace(/-/g, '/');
    var date = new Date(newstr);
    var time_str = date.getTime().toString();
    return time_str.substr(0, 10);
}