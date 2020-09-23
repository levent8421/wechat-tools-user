import {SET_TITLE, SET_USER_INFO} from './actionTypes';

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
};