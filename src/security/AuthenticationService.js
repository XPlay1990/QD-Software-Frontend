import {BehaviorSubject} from 'rxjs';
import request from "./authHeader/AuthorizationHeaderRequest"
import {ACCESS_TOKEN, API_BASE_URL, USER_SELF_URL} from "../config/constants";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    }
};

// function login(loginRequest) {
// //     const requestOptions = {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(loginRequest)
// //     };
// //
// //     return fetch(`${API_BASE_URL}${LOGIN_URL}`, requestOptions)
// //         .then(handleResponse)
// //         .then(user => {
// //             // store user details and jwt token in local storage to keep user logged in between page refreshes
// //             console.log(user)
// //             localStorage.setItem('currentUser', JSON.stringify(user));
// //             currentUserSubject.next(user);
// //             return user;
// //         });
// // }

function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + USER_SELF_URL,
        method: 'GET'
    });
}

export default authenticationService;