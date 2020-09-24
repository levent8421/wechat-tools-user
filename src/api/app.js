import {request} from './request';

export const apps = () => {
    return request({
        url: '/api/token/apps/',
        method: 'get',
    });
};