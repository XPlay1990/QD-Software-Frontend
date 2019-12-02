// BACKEND
export const BACKEND_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9020';

// API URLS
export const BASE_URL = '/';
export const LOGIN_URL = '/auth/login';
export const LOGOUT_URL = '/auth/logout';
export const REGISTER_URL = '/tbd';
export const CREATE_USER_URL = '/tbd';
export const CREATE_ORGANIZATION_URL = '/tbd';
export const GET_ORGANIZATION_MEMBERS_URL = (id) => `/org/${id}/members`;
export const GET_DEVELOPERS = '/org/nicando/members';
export const GET_CUSTOMER_ORGANIZATIONS_URL = '/org/customers';
export const GET_SUPPLIER_ORGANIZATIONS_URL = '/org/suppliers';
export const USER_URL= '/user';
export const SELF_URL = USER_URL + '/me';
export const GET_USERLIST_URL = USER_URL + '/all';
export const SWITCH_USER_URL = '/switchUser';
export const EDICON_LIST_URL = '/edi_connection';
export const QUESTION_URL = `${EDICON_LIST_URL}/question/list`;
export const ANSWER_URL = (id) => `${EDICON_LIST_URL}/${id}/question/answer`;
export const CONNECTION_TYPES_URL = `${EDICON_LIST_URL}/question/connectionTypes`;
export const MESSAGE_TYPES_URL = `${EDICON_LIST_URL}/question/messageTypes`;
export const TRANSFER_STANDARDS_URL = `${EDICON_LIST_URL}/question/transferStandards`;
export const GET_EDISTATES = `${EDICON_LIST_URL}/possibleStates`;
export const SAVE_DEVELOPER_AND_STATE = `${EDICON_LIST_URL}/saveDeveloperAndState`;
export const EDICON_MESSAGES_URL = (id) => `${EDICON_LIST_URL}/${id}/messages`;
export const EDICON_ATTACHMENT_BASE_URL = (id) => `${EDICON_LIST_URL}/${id}/attachment`;
export const EDICON_ATTACHMENT_UPLOAD_URL = (id) => `${EDICON_ATTACHMENT_BASE_URL(id)}/upload`;
export const EDICON_ATTACHMENT_DOWNLOAD_URL = (id, fileName) => `${EDICON_ATTACHMENT_BASE_URL(id)}/download/${fileName}`;
export const EDICON_CREATE_URL = `${EDICON_LIST_URL}/create`;

export const FORBIDDEN_URL = `/forbidden`;
export const NOT_FOUND_URL = `/notFound`;

// STORAGE
export const ACCESS_TOKEN = 'accessToken';
export const CURRENT_USER = 'currentUser';
export const IS_ADMIN = 'isAdmin';

export const EDI_LIST_SIZE = 15;
export const MAX_CHOICES = 6;
export const POLL_QUESTION_MAX_LENGTH = 140;
export const POLL_CHOICE_MAX_LENGTH = 40;

export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;
