import Cookies from 'js-cookie';

// https://dev.to/dog_smile_factory/authenticating-a-react-app-with-laravel-sanctum-part-4-4jcf
// https://laracasts.com/discuss/channels/code-review/laravel-56-how-to-authenticate-api-using-sessions-for-same-folder-spa
// https://webmobtuts.com/backend-development/laravel-sanctum-authentication-in-react-apps/
// https://laravelshowcase.com/question/authenticate-my-reactjs-spa-with-laravel-sanctum-using-axios
// https://laravel-news.com/using-sanctum-to-authenticate-a-react-spa
// https://stackoverflow.com/questions/71414150/authenticate-my-reactjs-spa-with-laravel-sanctum-using-axios
// https://laracasts.com/discuss/channels/laravel/laravel-sanctum-with-reactjs-spa


export const getAuthCookieExpiration = () => {
    let date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));  // 7 days
    return date;
}

export const setAsLogged = () => {
    Cookies.set('is_auth', 'true', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
}

export const setLogout = () =>  {
    Cookies.remove('is_auth', {path: '/', expires: getAuthCookieExpiration(), sameSite: 'lax', httpOnly: false});
}

export const getAuth = () => {
    return Cookies.get("is_auth") ? true : false;
}