import React, {Component} from 'react';
import './App.css';
import './LoginApp.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import {ACCESS_TOKEN, CURRENT_USER, IS_ADMIN, IS_AUTHENTICATED, LOGIN_URL} from '../config/constants';
import Login from '../user/login/Login';
import LoadingIndicator from '../common/LoadingIndicator';

import {notification} from 'antd';
import MainApp from "./MainApp";
import {handleLogin, handleLogout, loadUserFunction} from "./UserFunctions"

class App extends Component {
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
            duration: 3000
        });
    }


    componentDidMount() {
        this.loadCurrentUser();
    }

    render() {
        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }

        // console.log(localStorage.getItem(CURRENT_USER))
        // console.log(localStorage.getItem(IS_AUTHENTICATED))
        // console.log(localStorage.getItem(IS_ADMIN))
        // console.log(localStorage.getItem(ACCESS_TOKEN))
        // console.log(window.location.pathname)

        return (
            <Switch>
                <Route path={LOGIN_URL} render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                <Route path="/" render={(props) => <MainApp appState={this.state} {...props} />}/>
            </Switch>
        );
    }
}

export default withRouter(App);