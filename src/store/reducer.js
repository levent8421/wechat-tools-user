import {getStorageToken, register as tokenStoreRegister} from './tokenStore';
import {register as uiStoreRegister} from './uiStore';

const defaultState = {
    me: {},
    merchant: {},
    webToken: getStorageToken(),
    title: 'Wechat Tools',
};

const actionTable = {};
const registerReducer = (type, reducer) => {
    actionTable[type] = reducer;
};
tokenStoreRegister(registerReducer);
uiStoreRegister(registerReducer);

export default (state = defaultState, action) => {
    const type = action.type;
    if (type in actionTable) {
        const handler = actionTable[type];
        return handler(state, action);
    }
    return state;
}
