import {getStorageToken, register as tokenStoreRegister} from './tokenStore';


const defaultState = {
    me: null,
    webToken: getStorageToken(),
    title: {
        mainTitle: 'WechatTools',
        subTitle: 'WechatTools',
    },
};

const actionTable = {};
const registerReducer = (type, reducer) => {
    actionTable[type] = reducer;
};
tokenStoreRegister(registerReducer);

export default (state = defaultState, action) => {
    const type = action.type;
    if (type in actionTable) {
        const handler = actionTable[type];
        return handler(state, action);
    }
    return state;
}
