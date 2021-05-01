
export const getDateTime = (dateTime, withTime) => {
    let finalStr = '';
    if (dateTime) {
        let dt = new Date(dateTime);
        let mm = getTwoDigitTime(dt.getMonth() + 1),
            dd = getTwoDigitTime(dt.getDate());
        // finalStr = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
        finalStr = `${dt.getFullYear()}-${mm}-${dd}`;
        if (withTime) {
            // finalStr += ` ${dt.getHours()}:${dt.getMinutes()}`;
            let h = (dt.getHours() < 10 ? '0' : '') + dt.getHours(),
                m = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
            finalStr += ` ${h}:${m}`;
        }
    }
    return finalStr;
}

export const getTwoDigitTime = (seconds) => {
    let str = (seconds < 10 ? '0' : '') + seconds;
    return str;
}

export const formatToDecimals = (score, places) => {
    if (score && !isNaN(score)) return score.toFixed(places);
    return 'NA';
}

export const sortAscending = (array, key) => {
    return array.sort((a, b) => {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

export const sortDescending = (array, key) => {
    return array.sort((a, b) => {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

export const wait = (delayInMS) => {
    return new Promise(resolve => setTimeout(resolve, delayInMS));
}