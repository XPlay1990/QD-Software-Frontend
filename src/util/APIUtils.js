import request from "../security/authHeader/AuthorizationHeaderRequest"
import {
    BACKEND_BASE_URL,
    EDI_LIST_SIZE,
    EDICON_LIST_URL,
    EDICON_MESSAGES_URL,
    GET_CUSTOMER_ORGANIZATIONS_URL,
    GET_DEVELOPERS,
    GET_ORGANIZATION_MEMBERS_URL,
    GET_SUPPLIER_ORGANIZATIONS_URL
} from '../config/constants';

export function getEdiConnections(pageNumber, pageSize, pageSorting, additiveSorting) {
    pageNumber = pageNumber || 0;
    pageSize = pageSize || EDI_LIST_SIZE;
    if (pageSorting.length === 0) {
        pageSorting = ""
    }
    pageSorting = JSON.stringify(pageSorting);
    var sortString = "";
    // console.log(pageSorting)
    // var sortArray = JSON.parse(pageSorting)
    // sortArray.forEach(function (sortElement) {
    //     sortString += `pagesorting.id=${sortElement.id}&pageSorting.desc=${sortElement.desc}&`
    // });
    console.log(sortString);
    console.log(`${BACKEND_BASE_URL}${EDICON_LIST_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}&${sortString}additiveSorting=${additiveSorting}`,);
    return request({
        url: `${BACKEND_BASE_URL}${EDICON_LIST_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}&${sortString}additiveSorting=${additiveSorting}`,
        method: 'GET',
    });
}

export function getEdiConnection(id) {
    return request({
        url: `${BACKEND_BASE_URL}${EDICON_LIST_URL}/${id}`,
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

export function getDeveloperList() {
    return request({
        url: `${BACKEND_BASE_URL}${GET_DEVELOPERS}`,
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