import React, {Component} from 'react';
import {activateAndSetPassword, getUsernameFromVerificationToken} from '../../util/APIUtils';
import './ActivateUserRegistration.css';
import {LOGIN_URL, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from '../../config/constants';
import {Button, Form, Input, notification} from 'antd';
import {Trans, withTranslation} from "react-i18next";

const FormItem = Form.Item;

class ActivateUserRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: new URLSearchParams(window.location.search).get('token'),
            username: '',
            password: {
                value: '',
            },
            passwordRepeat: {
                value: ''
            }
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
                this.props.history.push({
                    pathname: LOGIN_URL,
                    state: {username: this.state.username}
                })
            }).catch(error => {
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.password.validateStatus === 'success' && this.state.passwordRepeat.validateStatus === 'success');
    }

    componentDidMount() {
        this._isMounted = true;
        localStorage.clear();
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
            <div className="activation-container">
                <h1 className="page-title">{<Trans i18nKey="registration.activationTitle">Sign up</Trans>}</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem label="Username" hasFeedback>
                            <Input
                                size="large"
                                name="username"
                                autoComplete="off"
                                placeholder={this.props.t('common.username')}
                                value={this.state.username}
                                disabled={true}
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
                                placeholder={this.props.t('registration.placeholderPassword')}
                                value={this.state.password.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePassword)}/>
                        </FormItem>
                        <FormItem
                            label="Password"
                            validateStatus={this.state.passwordRepeat.validateStatus}
                            help={this.state.passwordRepeat.errorMsg}>
                            <Input
                                size="large"
                                name="passwordRepeat"
                                type="password"
                                autoComplete="off"
                                placeholder={this.props.t('registration.placeholderPasswordRepeat')}
                                value={this.state.passwordRepeat.value}
                                onChange={(event) => this.handleInputChange(event, this.validateRepeatPassword)}/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}><Trans i18nKey="registration.setPassword">Set
                                password</Trans></Button>
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
                errorMsg: null
            };
        }
    };

    validateRepeatPassword = (repeatPassword) => {
        if (repeatPassword === this.state.password.value) {
            return {
                validateStatus: 'success',
                errorMsg: null
            };
        } else {
            return {
                validateStatus: 'error',
                errorMsg: `Password does not match!`
            }
        }
    };
}

export default withTranslation()(ActivateUserRegistration);