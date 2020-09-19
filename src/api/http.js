import axios from 'axios';
import {getToken} from './tokenStore';
import {hideLoading, showError, showLoading} from './uiPrompt';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
    const loadingShow = !config.hideLoading;
    const tokenConfig = getToken();
    if (tokenConfig) {
        config.headers.common[tokenConfig.name] = tokenConfig.token;
    }
    if (loadingShow) {
        showLoading();
    }
    return config;
}, error => {
    const errorStr = error.toString();
    hideLoading();
    showError(errorStr);
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(resp => {
    hideLoading();
    if (resp.status !== 200) {
        showError(`Error/${resp.status}`);
        return Promise.reject(resp);
    }
    return resp;
}, error => {
    const errorStr = error.toString();
    hideLoading();
    showError(errorStr);
    return Promise.reject(error);
});

export default axiosInstance;
