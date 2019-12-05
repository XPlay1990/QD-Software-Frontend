import React, {Component} from 'react';
import './Login.css';
import {Link, Redirect} from 'react-router-dom';
import loginBackground from '../../resources/login/CHANGE_ME_NOT_FREE.png';
import abbinoLogo from '../../resources/login/abbino_nicando.png';
import AuthenticationService from "../../security/AuthenticationService"

import {Button, Form, Icon, Input, notification} from 'antd';
import {ACCESS_TOKEN, EDICON_LIST_URL} from "../../config/constants";

const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: props.isAuthenticated
        };
    }

    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm);
        if (this.state.isAuthenticated) {
            return <Redirect to={EDICON_LIST_URL}/>
        }
        return (
            <div className="loginBackground">
                <img src={loginBackground} id="loginBackgroundImage" alt=""/>
                <div className="login-container">
                    <h1 className="page-title">Login</h1>
                    <div className="login-content">
                        <AntWrappedLoginForm onLogin={this.props.onLogin}/>
                    </div>
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                AuthenticationService.login(loginRequest)
                    .then(response => {
                        console.log(response.accessToken)
                        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                        this.props.onLogin();
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
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{required: true, message: 'Please input your username or email!'}],
                    })(
                        <Input
                            prefix={<Icon type="user"/>}
                            size="large"
                            name="usernameOrEmail"
                            placeholder="Username or Email"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input
                            prefix={<Icon type="lock"/>}
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                    Or <Link to="/signup">register now!</Link>
                </FormItem>
                <div className={"LoginFooter"}>
                    <img src={abbinoLogo} className="LoginBackground" alt=""/>
                </div>
            </Form>
        );
    }
}


export default Login;