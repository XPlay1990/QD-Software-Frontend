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
    options = Object.assign({}, {crossDomain: true}, options);

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

export const customFileDownloadRequest = (fileDownloadUrl) => {
    let anchor = document.createElement("a");
    document.body.appendChild(anchor);
    let encodedFileDownloadUrl = encodeURI(fileDownloadUrl);

    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));

    let fileName;
    fetch(encodedFileDownloadUrl, {headers})
        .then(response => {
            fileName = response.headers.get('content-disposition')
                .substring(response.headers.get('content-disposition')
                    .lastIndexOf('filename=') + 9).replace(new RegExp('"', 'g'), '');
            return response.blob()
        })
        .then(blob => {
            let objectUrl = URL.createObjectURL(blob);
            anchor.href = objectUrl;
            anchor.download = fileName;
            anchor.click();
            window.URL.revokeObjectURL(objectUrl);
        });
};

export default customJSONRequest