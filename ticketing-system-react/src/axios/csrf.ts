import Cookies from 'js-cookie';
import axs from './axios'

export const Csrf = () => {
    let token = Cookies.get("XSRF-TOKEN");
    if (token) {
        return new Promise((resolve) => {
            resolve(token);
        });
    }
    return axs.get(`/sanctum/csrf-cookie`);
}
    

export const deleteToken = (): void => {
    Cookies.remove('token');
    Cookies.remove('XSRF-TOKEN');
    Cookies.remove('laravel_session');
    // localStorage.removeItem('V3AiA32jCTjVlDEvx6QF');

}

export const getCookie = () => {
    return Cookies.get("XSRF-TOKEN") || null
}