import AuthHelper from '../AuthHelper';

export const TestStatus = {
    Draft: 'DRAFT',
    Published: 'PUBLISHED'
}

const SendInviteRoles = ["admin", "orgadmin"];
export const CanSendInvite = (testStatus) => {
    let role = GetCurrentUserRole();
    if(SendInviteRoles.indexOf(role) === -1) {
        return false;
    }
    return testStatus && testStatus.toUpperCase() === TestStatus.Published;
}
export const GetCurrentUserRole = () => {
    let user = AuthHelper.GetUserInfo();
    if(user) {
        return user.role;
    }
    return null;
}
export const GetCurrentUserName = () => {
    let user = AuthHelper.GetUserInfo();
    if(user) {
        return user.name;
    }
    return null;
}
export const EscapeSpecialCharacters = (stringContent) => {
    if(!stringContent) return stringContent;
    return stringContent.replace(/\<doublequotes>/g, '"');
}