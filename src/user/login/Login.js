import React, {Component} from 'react';
import './Login.css';
import {Redirect} from 'react-router-dom';
import loginBackground from '../../resources/login/Login_Background_fullhd.png';
import qdLogo from '../../resources/Logo_black.png';
import AuthenticationService from "../../security/AuthenticationService"

import {Button, Form, Icon, Input, notification} from 'antd';
import {ACCESS_TOKEN, EDICON_LIST_URL, IS_AUTHENTICATED} from "../../config/constants";
import {Trans} from "react-i18next";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ReactGA from 'react-ga';

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: (props.location.state) ? props.location.state.username : null
        };
    }

    render() {
        if (localStorage.getItem(IS_AUTHENTICATED) === 'true') {
            return <Redirect to={EDICON_LIST_URL}/>
        }
        return (
            <div className="fullContainer">
                <img src={loginBackground} id="loginBackgroundImage" alt=""/>

                <Box className="login-container">
                    <Typography variant="h5"
                                style={{overflowWrap: "break-word", textOverflow: "ellipsis", marginBottom: '.5em'}}>
                        Login
                    </Typography>
                    <LoginForm onLogin={this.props.onLogin} username={this.state.username}/>
                </Box>
            </div>
        );
    }
}

class LoginForm extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            username: props.username
        };
    }

    componentDidMount() {
        notification.info({
            message: <Trans i18nKey="demo.loginInfoTitle"/>,
            description: <Trans i18nKey="demo.loginInfoText"/>,
            duration: 10
        });
    }


    onFinish = values => {
        const loginRequest = Object.assign({}, values);
        AuthenticationService.login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                this.props.onLogin();
                ReactGA.event({
                    category: "Login",
                    action: "login",
                });
            }).catch(error => {
            if (error.status === 401) {
                notification.error({
                    message: 'EdiConnection-Portal',
                    description: error.message
                });
            } else {
                notification.error({
                    message: 'EdiConnection-Portal',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }

    render() {
        return (
            <Form onFinish={this.onFinish} className="login-form" ref={this.formRef}>
                <FormItem name='usernameOrEmail'
                          rules={[{required: true, message: 'Please input your username or email!'}]}
                          initialValue={this.state.username || ''}>
                    <Input
                        prefix={<Icon type="user"/>}
                        size="large"
                        name="usernameOrEmail"
                        placeholder="Username or Email"
                    />
                </FormItem>
                <FormItem name={"password"} rules={[{required: true, message: 'Please input your Password!'}]}>
                    <Input
                        prefix={<Icon type="lock"/>}
                        size="large"
                        name="password"
                        type="password"
                        placeholder="Password"/>
                </FormItem>
                <FormItem className="LoginButton">
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                </FormItem>
                <img src={qdLogo} className="footer" alt=""/>
            </Form>
        );
    }
}


export default Login;