import customJSONRequest, {
    customFileDownloadRequest,
    customFileUploadRequest
} from "../security/authHeader/AuthorizationHeaderRequest"
import {
    ANSWER_URL,
    BACKEND_BASE_URL,
    CONNECTION_TYPES_URL,
    EDI_LIST_SIZE,
    EDICON_ATTACHMENT_BASE_URL,
    EDICON_ATTACHMENT_UPLOAD_URL,
    EDICON_LIST_URL,
    EDICON_MESSAGES_URL, GENDER_URL,
    GET_CUSTOMER_ORGANIZATIONS_URL,
    GET_DEVELOPERS,
    GET_EDISTATES,
    GET_ORGANIZATION_MEMBERS_URL,
    GET_SUPPLIER_ORGANIZATIONS_URL,
    GET_USERLIST_URL, LANGUAGE_URL,
    MESSAGE_TYPES_URL,
    ORGANIZATION_GET_ALL_URL,
    QUESTION_URL,
    REGISTRATION_ACTIVATE_URL, REGISTRATION_URL,
    SAVE_DEVELOPER_AND_STATE,
    SELF_URL,
    SWITCH_USER_URL,
    TRANSFER_STANDARDS_URL, USER_ROLES_BASE_URL
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

export function getAnswers(id) {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${ANSWER_URL(id)}`,
        method: 'GET'
    });
}

export function getQuestions(language) {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${QUESTION_URL}?language=${language}`,
        method: 'GET'
    });
}

export function getUsernameFromVerificationToken(token) {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${REGISTRATION_ACTIVATE_URL}?token=${token}`,
        method: 'GET'
    });
}

export function getMessageTypes() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${MESSAGE_TYPES_URL}`,
        method: 'GET'
    });
}

export function getTransferStandards() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${TRANSFER_STANDARDS_URL}`,
        method: 'GET'
    });
}

export function getConnectionTypes() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${CONNECTION_TYPES_URL}`,
        method: 'GET'
    });
}

export function saveSupplierAnswers(ediConnectionId, answerList) {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${ANSWER_URL(ediConnectionId)}`,
        method: 'PUT',
        body: JSON.stringify(answerList)
    });
}

export function getAllUsers() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${GET_USERLIST_URL}`,
        method: 'GET'
    });
}
export function switchUser(username) {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${SWITCH_USER_URL}?username=${username}`,
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
        url: BACKEND_BASE_URL + REGISTRATION_URL,
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function activateAndSetPassword(activationRequest) {
    return customJSONRequest({
        url: BACKEND_BASE_URL + REGISTRATION_ACTIVATE_URL,
        method: 'PUT',
        body: JSON.stringify(activationRequest)
    });
}

export function checkUsernameAvailability(username) {
    return customJSONRequest({
        url: BACKEND_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

// export function checkEmailAvailability(email) {
//     return customJSONRequest({
//         url: BACKEND_BASE_URL + "/user/checkEmailAvailability?email=" + email,
//         method: 'GET'
//     });
// }

export function getUserProfile() {
    return customJSONRequest({
        url: BACKEND_BASE_URL + SELF_URL,
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

export function getAllOrganizations() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${ORGANIZATION_GET_ALL_URL}`,
        method: 'GET'
    });
}

export function getAllRoles() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${USER_ROLES_BASE_URL}`,
        method: 'GET'
    });
}

export function getAllLanguages() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${LANGUAGE_URL}`,
        method: 'GET'
    });
}

export function getAllGenders() {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${GENDER_URL}`,
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

export function getAttachmentList(ediConnectionId) {
    return customJSONRequest({
        url: `${BACKEND_BASE_URL}${EDICON_ATTACHMENT_BASE_URL(ediConnectionId)}`,
        method: 'GET'
    });
}
export function storeAttachments(ediConnectionId, files) {
    let formData = new FormData();
    files.forEach(function (entry) {
        formData.append("file", entry);
    });
    return customFileUploadRequest({
        url: `${BACKEND_BASE_URL}${EDICON_ATTACHMENT_UPLOAD_URL(ediConnectionId)}`,
        method: 'POST',
        body: formData
    });
}

export function downloadEdiAttachment(ediConnectionId, fileName) {
    return customFileDownloadRequest({
        url: `${BACKEND_BASE_URL}${EDICON_ATTACHMENT_UPLOAD_URL(ediConnectionId)}`,
        method: 'GET',
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