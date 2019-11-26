import React, {Component} from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';

import {getCurrentUser} from '../security/AuthenticationService';
import {
    CURRENT_USER,
    EDICON_CREATE_URL,
    EDICON_LIST_URL,
    FORBIDDEN_URL,
    LOGIN_URL,
    REGISTER_URL
} from '../config/constants';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import EdiList from '../edi/display/EdiList';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../error/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import RoleRestrictedRoute from '../security/RoleRestrictedRoute';

import {Layout, notification} from 'antd';
import EdiConnection from "../edi/display/detail/EdiConnection";
import {Role} from "../security/Roles";
import Navigationbar from "../common/Navigationbar";
import EdiCreate from "../edi/create/EdiCreate";
import Forbidden from "../error/Forbidden";
import SwitchUser from "../admin_functions/SwitchUser";

const {Content} = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAdmin: false,
            isAuthenticated: false,
            isLoading: false
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.loadCurrentUser = this.loadCurrentUser.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    loadCurrentUser() {
        this.setState({
            isLoading: true
        });
        getCurrentUser()
            .then(response => {
                this.setState({
                    currentUser: response,
                    isAdmin: response && response.authorities.includes(Role.Admin),
                    isAuthenticated: true,
                    isLoading: false
                });
                localStorage.setItem(CURRENT_USER, JSON.stringify(response))
            }).catch(error => {
            this.setState({
                isLoading: false
            });
        });
    }

    componentDidMount() {
        this.loadCurrentUser();
    }

    handleLogout(notificationType = "success", description = "You're successfully logged out.") {
        localStorage.clear();

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(LOGIN_URL);

        notification[notificationType]({
            message: 'EdiConnection-Portal',
            description: description,
        });
    }

    handleLogin() {
        notification.success({
            message: 'EdiConnection-Portal',
            description: "You're successfully logged in.",
        });
        this.loadCurrentUser();
        this.props.history.push(EDICON_LIST_URL);
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }
        return (
            <Layout className="app-container">
                <AppHeader isAuthenticated={this.state.isAuthenticated}
                           currentUser={this.state.currentUser}
                           isAdmin={this.state.isAdmin}
                           onLogout={this.handleLogout}/>

                <Content className="app-content">
                    <div className="container">
                        <Navigationbar isAuthenticated={this.state.isAuthenticated}
                                       history={this.props.history}
                                       isAdmin={this.state.isAdmin}/>
                        <Switch>
                            <Route exact path="/" render={() => (<Redirect to={EDICON_LIST_URL}/>)}/>
                            <Route path={LOGIN_URL}
                                   render={(props) => <Login onLogin={this.handleLogin}
                                                             isAuthenticated={this.state.isAuthenticated} {...props} />}/>
                            <Route path={REGISTER_URL} component={Signup}/>
                            <RoleRestrictedRoute isAuthenticated={this.state.isAuthenticated}
                                                 isAdmin={this.state.isAdmin}
                                                 exact path={EDICON_LIST_URL}
                                                 component={EdiList}/>
                            <RoleRestrictedRoute isAuthenticated={this.state.isAuthenticated}
                                                 exact path={EDICON_CREATE_URL}
                                                 component={EdiCreate}/>
                            <Route isAuthenticated={this.state.isAuthenticated} path="/users/:username"
                                   render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}
                                                               currentUser={this.state.currentUser} {...props}  />}/>
                            {/*<ProtectedRoute isAuthenticated={this.state.isAuthenticated}*/}
                            {/*                path={EDICON_LIST_URL + "/:id"}*/}
                            {/*                component={EdiConnection}/>*/}
                            <Route isAuthenticated={this.state.isAuthenticated}
                                   path={EDICON_LIST_URL + "/:id"}
                                   component={EdiConnection}/>
                            <Route isAuthenticated={this.state.isAuthenticated}
                                   path={"/switchuser/"}
                                   component={SwitchUser}/>
                            <Route path={FORBIDDEN_URL} component={Forbidden}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(App);
