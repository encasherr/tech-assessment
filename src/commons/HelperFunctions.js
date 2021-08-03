const getTwoDigitTime = (seconds) => {
    let str = (seconds < 10 ? '0' : '') + seconds;
    return str;
}

export const getCurrentDate = () => {
    let finalStr = '';
    let dt = new Date();
    let mm = getTwoDigitTime(dt.getMonth() + 1),
        dd = getTwoDigitTime(dt.getDate());
    finalStr = `${dt.getFullYear()}-${mm}-${dd}`;
    return finalStr;
}

export const getCurrentDateTime = () => {
    let finalStr = '';
    let dt = new Date();
    let mm = getTwoDigitTime(dt.getMonth() + 1),
        dd = getTwoDigitTime(dt.getDate());
    finalStr = `${dt.getFullYear()}-${mm}-${dd}`;
    let h = (dt.getHours() < 10 ? '0' : '') + dt.getHours(),
        m = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
    finalStr += ` ${h}:${m}`;
    return finalStr;
}

export const replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};