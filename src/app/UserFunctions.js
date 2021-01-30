import {getCurrentUserWithRoles} from "../security/AuthenticationService";
import {Role} from "../security/Roles";
import {CURRENT_USER, EDICON_LIST_URL, IS_ADMIN, IS_AUTHENTICATED, LOGIN_URL} from "../config/constants";
import {notification} from "antd";
import ReactGA from "react-ga";
import i18next from "i18next";

export const loadUserFunction =
    function loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUserWithRoles()
            .then(response => {
                localStorage.setItem(CURRENT_USER, JSON.stringify(response));
                localStorage.setItem(IS_AUTHENTICATED, 'true');
                localStorage.setItem(IS_ADMIN, `${response && response.authorities.includes(Role.Admin)}`);
                this.setState({
                    isLoading: false
                });
                ReactGA.set({
                    selectedLanguage: i18next.language,
                    user: localStorage.getItem(CURRENT_USER),
                    isAdmin: localStorage.getItem(IS_ADMIN)
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
            this.handleLogout()
        });
    };

export const handleLogout =
    function handleLogout(notificationType = "success", description = "You're successfully logged out.") {
        localStorage.clear();

        this.props.history.push(LOGIN_URL);

        notification[notificationType]({
            message: 'EdiConnection-Portal',
            description: description
        });
    };

export const handleLogin =
    function handleLogin() {
        notification.success({
            message: 'EdiConnection-Portal',
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push(EDICON_LIST_URL);
    };