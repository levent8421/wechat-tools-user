import {Toast} from 'antd-mobile';


export const showLoading = () => {
    Toast.loading('Loading', 0)
};

export const hideLoading = () => {
    Toast.hide();
};

export const showMsg = msg => {
    Toast.show(msg, 3, false)
};

export const showError = error => {
    Toast.fail(error, 2);
};
