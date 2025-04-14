/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const { url, data, method, callback = () => {} } = options;

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    let curUrl = url;
    let formData = null;

    if (method === 'GET' && data) {
        const queryParams = new URLSearchParams(data).toString();
        curUrl = `${url}?${queryParams}`;
    } else if (data) {
        formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
    }

    xhr.onload = function () {
        callback(null, xhr.response);
    };

    xhr.onerror = function () {
        callback(new Error('Network error'), null);
    };

    try {
        xhr.open(method, curUrl);
        xhr.send(formData);
    } catch (e) {
        callback(e, null);
    }
};
