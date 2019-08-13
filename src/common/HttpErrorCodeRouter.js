import {FORBIDDEN_URL, NOT_FOUND_URL} from "../config/constants";

export function routeErrorCodes(error) {
    switch (error.status) {
        case 403:
            return FORBIDDEN_URL;
        case 404:
            return NOT_FOUND_URL;
        default:
            return null
    }
}