export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:9020';
export const LOGIN_URL = '/auth/login';
export const USER_SELF_URL = '/user/me';
export const EDI_CONNECTIONS_URL = '/edi_connection';
export const EDI_CONNECTION_MESSAGES_URL = '/messages';
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
