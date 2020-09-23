import {SET_TOKEN, SET_TITLE, SET_USER_INFO} from './actionTypes';

export const setToken = (token, user) => {
    return {
        type: SET_TOKEN,
        token: token,
        user: user,
    };
};

export const setTitle = title => {
    return {
        type: SET_TITLE,
        title: title,
    }
};
export const setUserInfo = (user, merchant) => {
    return {
        type: SET_USER_INFO,
        user: user,
        merchant: merchant,
    }
};