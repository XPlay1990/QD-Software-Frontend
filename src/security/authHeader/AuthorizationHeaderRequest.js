import {ACCESS_TOKEN} from "../../config/constants";

const customJSONRequest = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    return createRequest(options, headers)
};

export const customFileUploadRequest = (options) => {
    const headers = new Headers();

    return createRequest(options, headers)
};

const createRequest = (options, headers) => {
    headers.append("Access-Control-Allow-Origin", "*");
    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    options.append("mode", 'cors');

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export const customFileDownloadRequest = (options) => {

    const headers = new Headers();

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);


    return fetch(options.url, options)
        .then(response => {
                if (!response.ok) {
                    return Promise.reject(response);
                }
                return response;
            }
        );
};

export default customJSONRequest