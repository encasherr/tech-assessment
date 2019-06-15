import axios from 'axios';
import AuthHelper from './AuthHelper';
import RedirectFromAction from './actions/RedirectFromAction';
let History = null;
axios.interceptors.response.use(response => {
        return response;
    }, error => {
    if (error.response.status === 401) {
        //place your reentry code
        console.log('intercept 401', error.response);
        RedirectFromAction(History, 'unauthorizedUser');

        if(History) {
            // RedirectFromAction(History, 'unauthorizedUser');
        } else {
            return {
                status: 401,
                message: error.response.data,
                statusText: error.response.statusText
            }
        }
    }
    return error;
 });

const getData = (url) => {
    // History = history;
    let accessToken = AuthHelper.getToken(); //localStorage.getItem("auth-token");
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
    // History = history;
    let accessToken = localStorage.getItem("auth-token");
    let options = {
        headers: {
          "x-access-token": accessToken
        }
    };
    return axios.post(url, model, options);
}

const updateData = (url, model) => {
    // History = history;
    let accessToken = localStorage.getItem("auth-token");
    let options = {
        headers: {
          "x-access-token": accessToken
        }
    };
    return axios.put(url, model, options);
}

export default {
    getData,
    saveData,
    updateData
};