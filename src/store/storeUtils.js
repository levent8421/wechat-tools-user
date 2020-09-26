import {connect} from 'react-redux';
import {setTitle, setToken, setUserInfo, showNavBar} from './actionCreators';

const mapAllState2Props = (state, props) => {
    return {
        ...props,
        ...state,
    };
};
const asPropFun = (fun, dispatch) => {
    return (...args) => dispatch(fun(...args));
};
const mapAllAction2Props = (dispatch, props) => {
    return {
        ...props,
        setToken: asPropFun(setToken, dispatch),
        setTitle: asPropFun(setTitle, dispatch),
        setUserInfo: asPropFun(setUserInfo, dispatch),
        showNavBar: asPropFun(showNavBar, dispatch),
    };
};

export const mapStateAndActions = component => {
    return connect(mapAllState2Props, mapAllAction2Props)(component);
};
