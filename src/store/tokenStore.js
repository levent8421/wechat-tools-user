import {storageGet, storageSave} from './storage';
import {SET_TOKEN} from './actionTypes';

const TOKEN_STORAGE_NAME = 'wechat_tools.user_token';
const getToken = () => {
    return storageGet(TOKEN_STORAGE_NAME);
};
const setToken = token => {
    token = decodeURIComponent(token);
    storageSave(TOKEN_STORAGE_NAME, token);
};
export const register = registerFunc => {
    registerFunc(SET_TOKEN, (state, action) => {
        const {token} = action;
        setToken(token);
        const resState = {
            ...state,
            token: token,
        };
        if (action.user) {
            resState.me = action.user;
        }
        if (action.merchant) {
            resState.merchant = action.merchant;
        }
        return resState;
    });
};


export const getStorageToken = getToken;
