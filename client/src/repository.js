import axios from 'axios';
import AuthHelper from './AuthHelper';
import RedirectFromAction from './actions/RedirectFromAction';
let History = null;
axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if(!error.response) throw error;
    if (error.response.status === 401) {
        console.log('intercept 401', error.response);
        // RedirectFromAction('unauthorizedUser');
    }
    else if (error.response.status === 403) {
        console.log('intercept 403', error.response);
        RedirectFromAction('userForbidden');
    }
    else if (error.response.status === 404) {
        console.log('intercept 404', error.response);
        RedirectFromAction('notFound');
    }
    throw error.response;
 });

const getData = (url) => {
    // History = history;
    let accessToken = AuthHelper.getToken(); //AuthHelper.getToken();
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
    let accessToken = AuthHelper.getToken();
    let options = {
        headers: {
          "x-access-token": accessToken
        }
    };
    return axios.post(url, model, options);
}

const updateData = (url, model) => {
    // History = history;
    let accessToken = AuthHelper.getToken();
    let options = {
        headers: {
          "x-access-token": accessToken
        }
    };
    return axios.put(url, model, options);
}

const deleteData = (url, model) => {
    // History = history;
    let accessToken = AuthHelper.getToken();
    let options = {
        headers: {
          "x-access-token": accessToken
        },
        data: model
    };
    console.log('delete options', options);
    return axios.delete(url, options);
}

export default {
    getData,
    saveData,
    updateData,
    deleteData
};