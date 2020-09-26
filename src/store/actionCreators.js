import {SET_TOKEN, SET_TITLE, SET_USER_INFO, SHOW_NAV_BAR} from './actionTypes';

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

export const showNavBar = (show = true) => {
    return {
        type: SHOW_NAV_BAR,
        show: show,
    }
};