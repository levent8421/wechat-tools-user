import {request} from './request';

export const me = () => {
    return request({
        url: '/api/token/user/_me',
        method: 'get',
        hideLoading: true,
    });
};


export const mockLogin = id => {
    return request({
        url: `/api/open/user/${id}/_mock-login`,
        method: 'get',
    });
};