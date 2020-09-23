import {Toast} from 'antd-mobile';

export function showToast(msg, duration = 2, mask = false) {
    Toast.show(msg, duration, mask);
}
