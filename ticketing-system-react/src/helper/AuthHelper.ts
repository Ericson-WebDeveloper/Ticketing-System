import Cookies from 'js-cookie';

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
