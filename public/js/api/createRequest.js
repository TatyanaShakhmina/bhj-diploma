/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const { URL, data, method, callback } = options;
    const xhr = new XMLHttpRequest();
    let curUrl = URL;

    xhr.responseType = 'json';

    const formData = new FormData();
    try {
        if (method === 'GET' && data) {
            const queryParams = new URLSearchParams(data).toString();
            curUrl = `${URL}?${queryParams}`;
            xhr.send();
        } else {
            for (let key in data) {
                formData.append(key, data[key]);
            }
        }

        xhr.open(method, curUrl);
        if (method === 'GET')
            xhr.send();
        else
        {
            xhr.send(formData);
        }

        xhr.onload = function () {
            if (xhr.status === 200) {
                if (callback) callback(null, xhr.response);
            } else {
                if (callback) callback(new Error(`Request failed with status: ${xhr.status}`), null);
            }
        };

        xhr.onerror = function () {
            if (callback) callback(new Error('Network error'), null);
        };

    } catch (e) {
        if (callback) callback(e, null);
    }
};
