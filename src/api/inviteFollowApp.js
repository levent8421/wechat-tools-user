import {request} from './request';

export const fetchAppInfo = id => {
    return request({
        url: `/api/token/invite-follow-app/${id}`,
        method: 'get',
    });
};

export const doDraw = appId => {
    return new Promise(resolve => {
        resolve({
            id: 2,
            name: 'xxx',
        });
    });
};