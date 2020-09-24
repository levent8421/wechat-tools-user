import {request} from './request';

export const fetchAppInfo = id => {
    return request({
        url: `/api/token/invite-follow-app/${id}`,
        method: 'get',
    });
};