import {SET_TOKEN} from './actionTypes';

export const setToken = (token, user) => {
    return {
        type: SET_TOKEN,
        token: token,
        user: user,
    };
};
