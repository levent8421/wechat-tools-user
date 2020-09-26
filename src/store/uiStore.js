import {SET_TITLE, SET_USER_INFO, SHOW_NAV_BAR} from './actionTypes';

export const register = registerFun => {
    registerFun(SET_TITLE, (state, action) => {
        return {
            ...state,
            title: action.title,
        };
    });
    registerFun(SET_USER_INFO, (state, action) => {
        return {
            ...state,
            me: action.user,
            merchant: action.merchant,
        };
    });
    registerFun(SHOW_NAV_BAR, (state, action) => {
        return {
            ...state,
            navBarVisible: action.show,
        };
    });
};