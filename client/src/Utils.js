
export const getDateTime = (dateTime, withTime) => {
    let finalStr = '';
    if (dateTime) {
        let dt = new Date(dateTime);
        finalStr = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
        if (withTime) {
            // finalStr += ` ${dt.getHours()}:${dt.getMinutes()}`;
            let h = (dt.getHours() < 10 ? '0' : '') + dt.getHours(),
                m = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
            finalStr += ` ${h}:${m}`;
        }
    }
    return finalStr;
}


export const formatToDecimals = (score, places) => {
    if(score && !isNaN(score)) return score.toFixed(places);
    return 'NA';
}