import request from "../security/authHeader/AuthorizationHeaderRequest"
import {
    BACKEND_BASE_URL,
    EDICON_MESSAGES_URL,
    EDICON_LIST_URL,
    EDI_LIST_SIZE,
    GET_CUSTOMER_ORGANIZATIONS_URL, GET_SUPPLIER_ORGANIZATIONS_URL, GET_ORGANIZATION_MEMBERS_URL
} from '../config/constants';

export function getEdiConnections(pageNumber, size) {
    pageNumber = pageNumber || 0;
    size = size || EDI_LIST_SIZE;

    return request({
        url: BACKEND_BASE_URL + `${EDICON_LIST_URL}?pageNumber=` + pageNumber + "&pageSize=" + size,
        method: 'GET'
    });
}

export function getEdiConnection(id) {
    return request({
        url: BACKEND_BASE_URL + `${EDICON_LIST_URL}/` + id,
        method: 'GET'
    });
}

export function getEdiConnectionMessages(ediConnectionId) {
    return request({
        url: BACKEND_BASE_URL + `${EDICON_MESSAGES_URL(ediConnectionId)}`,
        method: 'GET'
    });
}

export function signup(signupRequest) {
    return request({
        url: BACKEND_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: BACKEND_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: BACKEND_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: BACKEND_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function createEdiCon(customerOrgId, custmerContactIdList, supplierOrgId, supplierContactIdList) {
    return request({
        url: `${BACKEND_BASE_URL}${EDICON_LIST_URL}`,
        method: 'POST',
        body: JSON.stringify({
            customerOrgId: customerOrgId,
            custmerContactIdList: custmerContactIdList,
            supplierOrgId: supplierOrgId,
            supplierContactIdList: supplierContactIdList
        })
    });
}
export function getOrganizationMembers(id) {
    return request({
        url: `${BACKEND_BASE_URL}${GET_ORGANIZATION_MEMBERS_URL(id)}`,
        method: 'GET'
    });
}
export function getCustomerOrganizations() {
    return request({
        url: `${BACKEND_BASE_URL}${GET_CUSTOMER_ORGANIZATIONS_URL}`,
        method: 'GET'
    });
}
export function getSupplierOrganizations() {
    return request({
        url: `${BACKEND_BASE_URL}${GET_SUPPLIER_ORGANIZATIONS_URL}`,
        method: 'GET'
    });
}

export function getUserVotedPolls(username, page, size) {
    page = page || 0;
    size = size || EDI_LIST_SIZE;

    return request({
        url: BACKEND_BASE_URL + "/users/" + username + "/votes?pageNumber=" + page + "&pageSize=" + size,
        method: 'GET'
    });
}