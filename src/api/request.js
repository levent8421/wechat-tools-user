import http from './http';
import {showError} from './uiPrompt';

export const request = config => {
    return new Promise((resolve, reject) => {
        http(config).then(res => {
            const {code, msg, data} = res.data;
            if (code === 200) {
                resolve(data);
            } else {
                showError(`ServiceError:${code}/${msg}`)
                reject(res);
            }
        });
    });
};