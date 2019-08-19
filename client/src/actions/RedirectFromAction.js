import AuthHelper from "../AuthHelper";

// import createHistory from 'history/createBrowserHistory';


const RedirectFromAction = (page) => {
    let hist = AuthHelper.GetHistory();
    console.log('redirect called', typeof(hist));
    if(typeof(hist.push) === 'function'){
        hist.push('/' + page);
    }
}
// let history = createHistory();
// const RedirectFromAction = (page) => {
//     console.log('redirect to 401 called', history);
//     // history.pop();
//     history.push('/unauthorizedUser');
// }
export default RedirectFromAction;