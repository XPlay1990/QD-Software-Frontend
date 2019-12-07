import React, {Component} from 'react';
import {activateAndSetPassword, getUsernameFromVerificationToken} from '../../util/APIUtils';
import './ActivateUserRegistration.css';
import {LOGIN_URL, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from '../../config/constants';

import {Button, Form, Input, notification} from 'antd';

const FormItem = Form.Item;

class ActivateUserRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: new URLSearchParams(window.location.search).get('token'),
            username: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    getUserNameFromToken() {
        let promise = getUsernameFromVerificationToken(this.state.token);
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        username: response.message,
                    })
                }
            }).catch(error => {
            this.setError(error);
        });
    }

    setError(error) {
        if (error.status === 404) {
            this.setState({
                notFound: true,
            });
        } else if (error.status === 403) {
            this.setState({
                forbidden: true,
            });
        } else {
            this.setState({
                serverError: true,
            });
        }
        notification.error({
            message: 'EdiConnection-Portal',
            description: error.message,
        });
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const registrationActivationRequest = {
            token: this.state.token,
            password: this.state.password.value
        };
        activateAndSetPassword(registrationActivationRequest)
            .then(response => {
                notification.success({
                    message: 'EdiConnection-Portal',
                    description: "Thank you! You're successfully registered. Please Login to continue!",
                });
                this.props.history.push(LOGIN_URL, this.state.username);
            }).catch(error => {
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.password.validateStatus === 'success');
    }

    componentDidMount() {
        this._isMounted = true;
        this.getUserNameFromToken();
        // this.getAnswers(this.ediConnectionId);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate = nextProps => {
    };

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Sign Up</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem label="Username"
                                  hasFeedback
                                  validateStatus={this.state.username.validateStatus}
                                  help={this.state.username.errorMsg}>
                            <Input
                                size="large"
                                name="username"
                                autoComplete="off"
                                placeholder="A unique username"
                                value={this.state.username}
                                disabled={true}
                                // onBlur={this.validateUsernameAvailability}
                                // onChange={(event) => this.handleInputChange(event, this.validateUsername)}
                            />
                        </FormItem>
                        <FormItem
                            label="Password"
                            validateStatus={this.state.password.validateStatus}
                            help={this.state.password.errorMsg}>
                            <Input
                                size="large"
                                name="password"
                                type="password"
                                autoComplete="off"
                                placeholder="A password between 6 to 20 characters"
                                value={this.state.password.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)}/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}>Sign up</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    validatePassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

}

export default ActivateUserRegistration;