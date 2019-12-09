import {BehaviorSubject} from 'rxjs';
import customJSONRequest from "./authHeader/AuthorizationHeaderRequest"
import {ACCESS_TOKEN, BACKEND_BASE_URL, LOGIN_URL, SELF_URL} from "../config/constants";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    }
};

function login(loginRequest) {
    return customJSONRequest({
        url: BACKEND_BASE_URL + LOGIN_URL,
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    currentUserSubject.next(null);
}

export function getCurrentUserWithRoles() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return customJSONRequest({
        url: BACKEND_BASE_URL + SELF_URL + '/withroles',
        method: 'GET'
    });
}

export default authenticationService;