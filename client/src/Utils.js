
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

export const getNextAvailableTimeSlots = () => {
    let dailyTimeSlots = [ 8, 13, 21 ];
    let nowAvailableTimeSlots = [];
    let now = new Date();
    let today = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
    let nextDay = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`;
    let currentHour = now.getHours();
    if(currentHour > dailyTimeSlots[2]) {
        nowAvailableTimeSlots.push(`${nextDay} ${dailyTimeSlots[0]}:00`);
        nowAvailableTimeSlots.push(`${nextDay} ${dailyTimeSlots[1]}:00`);
        nowAvailableTimeSlots.push(`${nextDay} ${dailyTimeSlots[2]}:00`);
        return nowAvailableTimeSlots;
    }
    if(currentHour > dailyTimeSlots[1]) {
        nowAvailableTimeSlots.push(`${today} ${dailyTimeSlots[2]}:00`);
        nowAvailableTimeSlots.push(`${nextDay} ${dailyTimeSlots[0]}:00`);
        nowAvailableTimeSlots.push(`${nextDay} ${dailyTimeSlots[1]}:00`);
        return nowAvailableTimeSlots;
    }
    if(currentHour > dailyTimeSlots[0]) {
        nowAvailableTimeSlots.push(`${today} ${dailyTimeSlots[1]}:00`);
        nowAvailableTimeSlots.push(`${today} ${dailyTimeSlots[2]}:00`);
        nowAvailableTimeSlots.push(`${nextDay} ${dailyTimeSlots[0]}:00`);
        return nowAvailableTimeSlots;
    }
    if(currentHour < dailyTimeSlots[0]) {
        nowAvailableTimeSlots.push(`${today} ${dailyTimeSlots[0]}:00`);
        nowAvailableTimeSlots.push(`${today} ${dailyTimeSlots[1]}:00`);
        nowAvailableTimeSlots.push(`${today} ${dailyTimeSlots[2]}:00`);
        return nowAvailableTimeSlots;
    }
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