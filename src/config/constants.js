// BACKEND
export const BACKEND_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9020';

// API URLS
export const LOGIN_URL = '/auth/login';
export const LOGOUT_URL = '/auth/logout';
export const REGISTER_URL = '/tbd';
export const CREATE_USER_URL = '/tbd';
export const CREATE_ORGANIZATION_URL = '/tbd';
export const GET_ORGANIZATION_MEMBERS_URL = (id) => `/org/${id}/members`;
export const GET_CUSTOMER_ORGANIZATIONS_URL = '/org/customers';
export const GET_SUPPLIER_ORGANIZATIONS_URL = '/org/suppliers';
export const USER_SELF_URL = '/user/me';
export const EDICON_LIST_URL = '/edi_connection';
export const EDICON_MESSAGES_URL = (id) => `${EDICON_LIST_URL}/${id}/messages`;
export const EDICON_CREATE_URL = `${EDICON_LIST_URL}/create`;

// STORAGE
export const ACCESS_TOKEN = 'accessToken';
export const CURRENT_USER = 'currentUser';

export const EDI_LIST_SIZE = 10;
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
