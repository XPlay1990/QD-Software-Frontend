import React, {Component} from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';

import {getCurrentUser} from '../security/AuthenticationService';
import {ACCESS_TOKEN, CURRENT_USER, EDI_CONNECTIONS_URL} from '../config/constants';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import EdiList from '../edi/EdiList';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../error/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import RoleRestrictedRoute from '../security/RoleRestrictedRoute';

import {Layout, notification} from 'antd';
import EdiConnection from "../edi/detail/EdiConnection";
import {Role} from "../security/Roles";

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
                    isAdmin: response && response.authorities.includes({authority: Role.Admin}),
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

    handleLogout(redirectTo = "/login", notificationType = "success", description = "You're successfully logged out.") {
        localStorage.removeItem(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);

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
        this.props.history.push(EDI_CONNECTIONS_URL);
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
                        <Switch>
                            <Route exact path="/" render={() => (<Redirect to={EDI_CONNECTIONS_URL}/>)}/>
                            <Route authenticated={this.state.isAuthenticated} path="/login"
                                   render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                            <Route path="/signup" component={Signup}/>
                            <RoleRestrictedRoute authenticated={this.state.isAuthenticated} exact
                                                 path={EDI_CONNECTIONS_URL}
                                                 component={EdiList}/>
                            <Route authenticated={this.state.isAuthenticated} path="/users/:username"
                                   render={(props) => <Profile isAuthenticated={this.state.isAuthenticated}
                                                               currentUser={this.state.currentUser} {...props}  />}/>
                            <RoleRestrictedRoute authenticated={this.state.isAuthenticated}
                                                 path={EDI_CONNECTIONS_URL + "/:id"}
                                                 component={EdiConnection}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(App);
