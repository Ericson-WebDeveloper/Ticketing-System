import axios from 'axios';

//check this about axios typescript -> https://bobbyhadz.com/blog/typescript-http-request-axios

let axs = axios.create({
    baseURL: 'http://localhost:8000',
});

axs.defaults.withCredentials = true;

// Add a request interceptor
axs.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axs.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default axs;