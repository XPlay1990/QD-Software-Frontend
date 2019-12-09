import {getCurrentUserWithRoles} from "../security/AuthenticationService";
import {Role} from "../security/Roles";
import {CURRENT_USER, EDICON_LIST_URL, IS_ADMIN, IS_AUTHENTICATED, LOGIN_URL} from "../config/constants";
import {notification} from "antd";

export const loadUserFunction =
    function loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUserWithRoles()
            .then(response => {
                console.log("WTF")
                localStorage.setItem(CURRENT_USER, JSON.stringify(response));
                console.log("WTF2")
                localStorage.setItem(IS_AUTHENTICATED, 'true');
                console.log("WTF2")
                localStorage.setItem(IS_ADMIN, `${response && response.authorities.includes(Role.Admin)}`);
                this.setState({
                    isLoading: false
                });
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    };

export const handleLogout =
    function handleLogout(notificationType = "success", description = "You're successfully logged out.") {
        localStorage.clear();

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

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