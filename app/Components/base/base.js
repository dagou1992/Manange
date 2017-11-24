//每隔三位逗号隔开
export function numberDivideWithComma(num) {
    return num == undefined ? null : num.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',');
}

//每隔三位点号隔开
export function numberDivideWithDot(num) {
    return num == undefined ? null : num.toString().replace(/\B(?=(?:\d{3})+\b)/g, '.');
}
