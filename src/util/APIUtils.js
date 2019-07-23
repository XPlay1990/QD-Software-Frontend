import request from "../security/authHeader/AuthorizationHeaderRequest"
import {API_BASE_URL, EDI_CONNECTION_MESSAGES_URL, EDI_CONNECTIONS_URL, EDI_LIST_SIZE} from '../config/constants';

export function getEdiConnections(pageNumber, size) {
    pageNumber = pageNumber || 0;
    size = size || EDI_LIST_SIZE;

    return request({
        url: API_BASE_URL + `${EDI_CONNECTIONS_URL}?pageNumber=` + pageNumber + "&pageSize=" + size,
        method: 'GET'
    });
}

export function getEdiConnection(id) {
    return request({
        url: API_BASE_URL + `${EDI_CONNECTIONS_URL}/` + id,
        method: 'GET'
    });
}

export function getEdiConnectionMessages(ediConnectionId) {
    return request({
        url: API_BASE_URL + `${EDI_CONNECTIONS_URL}/` + ediConnectionId + `${EDI_CONNECTION_MESSAGES_URL}`,
        method: 'GET'
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || EDI_LIST_SIZE;

    return request({
        url: API_BASE_URL + "/users/" + username + "/votes?pageNumber=" + page + "&pageSize=" + size,
        method: 'GET'
    });
}