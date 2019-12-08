import React from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {
    CURRENT_USER,
    EDICON_CREATE_URL,
    EDICON_LIST_URL,
    FORBIDDEN_URL,
    IS_ADMIN,
    IS_AUTHENTICATED,
    REGISTRATION_ACTIVATE_URL,
    REGISTRATION_URL
} from '../config/constants';
import Signup from '../user/signup/Signup';
import EdiList from '../edi/display/EdiList';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../error/NotFound';
import RoleRestrictedRoute from '../security/RoleRestrictedRoute';

import {Layout, notification} from 'antd';
import EdiConnection from "../edi/display/detail/EdiConnection";
import Navigationbar from "../common/Navigationbar";
import EdiCreate from "../edi/create/EdiCreate";
import Forbidden from "../error/Forbidden";
import SwitchUser from "../admin_functions/SwitchUser";
import SupplierQuestions from "../edi/display/detail/supplierQuestions/SupplierQuestions";
import ActivateUserRegistration from "../user/signup/ActivateUserRegistration";
import {handleLogin, handleLogout, loadUserFunction} from "./UserFunctions"

const {Content} = Layout;

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.loadCurrentUser = loadUserFunction.bind(this);
        this.handleLogin = handleLogin.bind(this);
        this.handleLogout = handleLogout.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3
        });
    }

    render() {
        // console.log("MAIN: ")
        // console.log(localStorage.getItem(CURRENT_USER))
        // console.log(localStorage.getItem(IS_AUTHENTICATED))
        // console.log(localStorage.getItem(IS_ADMIN))
        // console.log("MAIN: " + JSON.stringify(this.state))
        // console.log("MAIN: " + window.location.pathname)
        return (
            <div className="app-container">
                <AppHeader isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)}
                           currentUser={localStorage.getItem(CURRENT_USER)}
                           isAdmin={localStorage.getItem(IS_ADMIN)}
                           onLogout={this.handleLogout}/>

                <Content className="container">
                    {/*<SimpleBarReact className="app-scrollbar">*/}
                    <div className="app">
                        <Navigationbar isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)}
                                       history={this.props.history}
                                       isAdmin={localStorage.getItem(IS_ADMIN)} {...this.props}/>

                        <div className="app-content">
                            <Switch>
                                <Route exact path="/" render={() => (<Redirect to={EDICON_LIST_URL}/>)}/>
                                <Route path={REGISTRATION_ACTIVATE_URL}
                                       render={(props) => <ActivateUserRegistration {...props} />}/>
                                <Route path={REGISTRATION_URL} component={Signup}/>
                                <RoleRestrictedRoute isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)}
                                                     isAdmin={localStorage.getItem(IS_ADMIN)}
                                                     exact path={EDICON_LIST_URL}
                                                     component={EdiList}/>
                                <RoleRestrictedRoute isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)}
                                                     exact path={EDICON_CREATE_URL}
                                                     component={EdiCreate}/>
                                <Route isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)}
                                       path="/users/:username"
                                       render={(props) => <Profile
                                           isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)}
                                           currentUser={localStorage.getItem(CURRENT_USER)} {...props}  />}/>
                                {/*<ProtectedRoute isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)}*/}
                                {/*                path={EDICON_LIST_URL + "/:id"}*/}
                                {/*                component={EdiConnection}/>*/}
                                <Route isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)}
                                       exact path={EDICON_LIST_URL + "/:id"}
                                       component={EdiConnection}/>
                                <Route isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)}
                                       path={EDICON_LIST_URL + "/:id/question/answer"} //ANSWER_URL
                                       component={SupplierQuestions}/>
                                <Route isAuthenticated={localStorage.getItem(IS_AUTHENTICATED)}
                                       path={"/switchuser/"}
                                       component={SwitchUser}/>
                                <Route path={FORBIDDEN_URL} component={Forbidden}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </div>
                    </div>
                    {/*</SimpleBarReact>*/}
                </Content>
            </div>
        )
    }
}

export default withRouter(MainApp);