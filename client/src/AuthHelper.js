var history = {};
const AuthHelper = {
    Login: (res) => {
        const token = res.headers['x-auth-token'];
        const data = JSON.stringify(res.data);
        console.log('res.data', data);
        localStorage.setItem("auth-token", token);
        localStorage.setItem("user-info", data);
    },
    GetUserInfo: () => {
        let userInfo = localStorage.getItem("user-info");
        if(userInfo) {
            let user = JSON.parse(userInfo);
            console.log('userinfo', user.name);
            return user;
        } else {
            console.log('userinfo not available');
        }
        return null;
    },
    getToken: () => {
        return localStorage.getItem('auth-token');
    },
    isLoggedIn: () => {
        let token = localStorage.getItem('auth-token');
        // console.log('token', token);
        if(token) {
            return true;
        }

        return false;
    },
    UserRoles: () => {
        return [ "guest", "recruiter", "candidate", "admin" ];
    },
    LogOut: () => {
        console.log('remove token');
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-info');
        // let token = localStorage.getItem('auth-token');
        // console.log('token', token);
    },
    SetHistory: (propsHistory) => {
        console.log('set history', propsHistory);
        history = propsHistory;
    },
    GetHistory: () => {
        console.log('get history');
        return history;
    }
}
export default AuthHelper;
