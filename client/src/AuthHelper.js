const AuthHelper = {
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
    LogOut: () => {
        console.log('remove token');
        localStorage.removeItem('auth-token');
        // let token = localStorage.getItem('auth-token');
        // console.log('token', token);
    }
}
export default AuthHelper;
