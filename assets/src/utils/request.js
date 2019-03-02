import { objectToUrlParams } from './common';

const defaultHeaders = {
    'Content-Type': 'application/json',
};

const request = {
    get: (url, params, callback) => {
        const urlWithParams = `${url}?${objectToUrlParams(params)}`;
        // eslint-disable-next-line no-undef
        fetch(urlWithParams)
            .then(callback)
            .catch((error) => {
                console.warn(error);
            });
    },
    post: (url, body, callback, errorCallback) => {
        const stringbody = JSON.stringify(body);
        // eslint-disable-next-line no-undef
        fetch(url, { body: stringbody, method: 'POST', headers: defaultHeaders })
            .then(response => response.json())
            .then(callback)
            .catch((error) => {
                if (errorCallback) {
                    errorCallback(error);
                } else {
                    // eslint-disable-next-line
                    alert(error);
                }
            });
    },
};

export default request;
