import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter} from 'react-router-dom';
import {FORBIDDEN_URL, LOGIN_URL} from '../config/constants';
import Login from '../user/login/Login';
import LoadingIndicator from '../common/LoadingIndicator';

import {notification} from 'antd';
import MainApp from "./MainApp";
import {handleLogin, loadUserFunction} from "./UserFunctions"
import {createMuiTheme, responsiveFontSizes, ThemeProvider} from "@material-ui/core/styles";
import Forbidden from "../error/Forbidden";
import NotFound from "../error/NotFound";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.loadCurrentUser = loadUserFunction.bind(this);
        this.handleLogin = handleLogin.bind(this);

        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3
        });
    }


    componentDidMount() {
        this.loadCurrentUser();
    }

    render() {
        let theme = createMuiTheme();
        theme = responsiveFontSizes(theme);

        if (this.state.isLoading) {
            return <LoadingIndicator/>
        }

        // console.log(localStorage.getItem(CURRENT_USER))
        // console.log(localStorage.getItem(IS_AUTHENTICATED))
        // console.log(localStorage.getItem(IS_ADMIN))
        // console.log(localStorage.getItem(ACCESS_TOKEN))
        // console.log(window.location.pathname)

        return (
            <ThemeProvider theme={theme}>
                <Switch>
                    <Route path={LOGIN_URL} render={(props) => <Login onLogin={this.handleLogin} {...props} />}/>
                    <Route path="/" render={(props) => <MainApp appState={this.state} {...props} />}/>
                    <Route path={FORBIDDEN_URL} component={Forbidden}/>
                    <Route component={NotFound}/>
                </Switch>
            </ThemeProvider>
        );
    }
}

export default withRouter(App);