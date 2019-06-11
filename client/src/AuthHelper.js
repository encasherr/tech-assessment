const AuthHelper = {
isLoggedIn = () => {
let token = local storage.getItem('auth-token');
if(token) {
return true;
}

return false;
}
}
export default AuthHelper;
