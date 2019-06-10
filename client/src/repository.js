import axios from 'axios';

axios.interceptors.response.use(response => {
        return response;
    }, error => {
    if (error.response.status === 401) {
        //place your reentry code
        console.log('intercept 401', error.response);
        return {
            status: 401,
            message: error.response.data,
            statusText: error.response.statusText
        }
    }
    return error;
 });

const getData = (url) => {
    let accessToken = localStorage.getItem("auth-token");
    let options = {
        headers: {
          "x-access-token": accessToken
        }
    };
    return new Promise((resolve, reject) => {
        axios.get(url, options)
        .then((res) => {
            console.log('res', res);
            if(res.status === 401) {
                console.log('in resolve not authorized error received');
                return reject(res);
            }
            resolve(res);
        })
        .catch((err) => {
            console.log('err', err);
            reject(err);
        })
    });
    
}

const saveData = (url, model) => {
    let accessToken = localStorage.getItem("auth-token");
    let options = {
        headers: {
          "x-access-token": accessToken
        }
    };
    return axios.post(url, model, options);
}

export default {
    getData,
    saveData
};