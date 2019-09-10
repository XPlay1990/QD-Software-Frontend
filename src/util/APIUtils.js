import customJSONRequest, {customFileRequest} from "../security/authHeader/AuthorizationHeaderRequest"
import {
    BACKEND_BASE_URL,
    EDI_LIST_SIZE,
    EDICON_LIST_URL,
    EDICON_MESSAGES_URL,
    GET_CUSTOMER_ORGANIZATIONS_URL,
    GET_DEVELOPERS,
    GET_EDISTATES,
    GET_ORGANIZATION_MEMBERS_URL,
    GET_SUPPLIER_ORGANIZATIONS_URL,
    SAVE_DEVELOPER_AND_STATE
} from '../config/constants';

export function getEdiConnections(pageNumber, pageSize, pageSorting, additiveSorting) {
    pageNumber = pageNumber || 0;
    pageSize = pageSize || EDI_LIST_SIZE;

    let sortingArray = [];
    pageSorting.forEach(function (sortElement) {
            if (sortElement.desc) {
                sortingArray.push(`${sortElement.id},desc`)
            } else {
                sortingArray.push(`${sortElement.id},asc`)
            }
        }
    );
    let sortString = sortingArray.join("&sort=");
    if (!sortString) {
        sortString = "updateTime,desc"
    }
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${EDICON_LIST_URL}?page=${pageNumber}&size=${pageSize}&sort=${sortString}`,
        method: 'GET',
    });
}

export function getEdiConnection(id) {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${EDICON_LIST_URL}/${id}`,
        method: 'GET'
    });
}

export function getEdiConnectionMessages(ediConnectionId) {
    return customJSONRequest({
        url: BACKEND_BASE_URL + `${EDICON_MESSAGES_URL(ediConnectionId)}`,
        method: 'GET'
    });
}

export function signup(signupRequest) {
    return customJSONRequest({
        url: BACKEND_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return customJSONRequest({
        url: BACKEND_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return customJSONRequest({
        url: BACKEND_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return customJSONRequest({
        url: BACKEND_BASE_URL + "/users/" + username,
        method: 'GET'
    });
}

export function createEdiCon(customerOrgId, custmerContactIdList, supplierOrgId, supplierContactIdList) {
    return customJSONRequest({
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
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${GET_ORGANIZATION_MEMBERS_URL(id)}`,
        method: 'GET'
    });
}

export function getCustomerOrganizations() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${GET_CUSTOMER_ORGANIZATIONS_URL}`,
        method: 'GET'
    });
}

export function getSupplierOrganizations() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${GET_SUPPLIER_ORGANIZATIONS_URL}`,
        method: 'GET'
    });
}

export function getDeveloperList() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${GET_DEVELOPERS}`,
        method: 'GET'
    });
}

export function getEdiStatusList() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${GET_EDISTATES}`,
        method: 'GET'
    });
}

export function sendEdiMessage(ediConnectionId, messageContent) {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${EDICON_MESSAGES_URL(ediConnectionId)}`,
        method: 'POST',
        body: messageContent
    });
}

export function storeAttachments(ediConnectionId, files){
    return customFileRequest({
        url: `${BACKEND_BASE_URL}${EDICON_MESSAGES_URL(ediConnectionId)}`,
        method: 'POST',
        body: files
    });
}

export function saveDeveloperAndStatus(ediConnectionId, assignedDev, state) {
    let assignedDevId = assignedDev ? assignedDev.id : null;
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${SAVE_DEVELOPER_AND_STATE}`,
        method: 'POST',
        body: JSON.stringify({
            ediConnectionId: ediConnectionId,
            developerId: assignedDevId,
            state: state.value,
        })
    });
}