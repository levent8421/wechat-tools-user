import {getStorageToken} from '../store/tokenStore';

export const getToken = () => {
    return {
        name: 'X-Token',
        token: getStorageToken()
    };
};
