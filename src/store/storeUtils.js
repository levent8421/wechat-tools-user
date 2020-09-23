import {connect} from 'react-redux';
import {setToken} from './actionCreators';

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
        setToken: asPropFun(setToken),
    };
};

export const mapStateAndActions = component => {
    return connect(mapAllState2Props, mapAllAction2Props)(component);
};
