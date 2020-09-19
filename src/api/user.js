import http from './http';

export const me = () => {
    return http({
        url: '/api/open/aaa',
        method: 'get',
        hideLoading: true,
    });
};
