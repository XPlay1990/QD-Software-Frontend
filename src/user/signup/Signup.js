import React, {Component} from 'react';
import {
    checkEmailAvailability,
    checkUsernameAvailability,
    getAllGenders,
    getAllLanguages,
    getAllOrganizations,
    getAllRoles,
    signup
} from '../../util/APIUtils';
import './Signup.css';
import {
    EMAIL_MAX_LENGTH,
    LOGIN_URL,
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH
} from '../../config/constants';

import {Button, Form, Icon, Input, notification} from 'antd';
import Select from "react-select";

const FormItem = Form.Item;

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: ''
            },
            email: {
                value: ''
            },
            firstName: {
                value: ''
            },
            lastName: {
                value: ''
            },
            organization: {
                value: null
            },
            roles: {
                value: []
            },
            language: {
                value: null
            },
            gender: {
                value: []
            },
            availableOrganizations: [],
            availableRoles: [],
            availableLanguages: [],
            availableGenders: []
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateEmailAvailability = this.validateEmailAvailability.bind(this);
        this.validateOrganization = this.validateOrganization.bind(this);
        this.validateLanguage = this.validateLanguage.bind(this);
        this.validateRoles = this.validateRoles.bind(this);
        this.validateGender = this.validateGender.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    initAvailableSelects() {
        this.getAllOrganizations();
        this.getAllRoles();
        this.getAllGenders();
        this.getAllLanguages()
    }

    getAllOrganizations() {
        let promise = getAllOrganizations();
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                if (this._isMounted) {
                    this.setState({availableOrganizations: response})
                }
            }).catch(error => {
            this.setError(error);
            return null
        });
    }

    getAllRoles() {
        let promise = getAllRoles();
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                if (this._isMounted) {
                    this.setState({availableRoles: response})
                }
            }).catch(error => {
            this.setError(error);
            return null
        });
    }

    getAllGenders() {
        let promise = getAllGenders();
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                if (this._isMounted) {
                    this.setState({availableGenders: response})
                }
            }).catch(error => {
            this.setError(error);
            return null
        });
    }

    getAllLanguages() {
        let promise = getAllLanguages();
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                if (this._isMounted) {
                    this.setState({availableLanguages: response})
                }
            }).catch(error => {
            this.setError(error);
            return null
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

        console.log(this.state.language.value)

        const signupRequest = {
            firstName: this.state.firstName.value,
            lastName: this.state.lastName.value,
            email: this.state.email.value,
            username: this.state.username.value,
            organizationId: this.state.organization.value.id,
            roles: this.state.roles.value,
            language: this.state.language.value[0].isoLanguage,
            gender: this.state.gender.value[0]
        };
        signup(signupRequest)
            .then(response => {
                notification.success({
                    message: 'EdiConnection-Portal',
                    description: response.message,
                });
                this.props.history.push(LOGIN_URL);
            }).catch(error => {
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.firstName.validateStatus === 'success' &&
            this.state.lastName.validateStatus === 'success' &&
            this.state.username.validateStatus === 'success' &&
            this.state.email.validateStatus === 'success' &&
            this.state.organization.validateStatus === 'success' &&
            this.state.roles.validateStatus === 'success' &&
            this.state.language.validateStatus === 'success' &&
            this.state.gender.validateStatus === 'success'
        );
    }

    componentDidMount() {
        this._isMounted = true;
        this.initAvailableSelects();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate = nextProps => {
    };

    render() {
        return (
            <div className="signup-container">
                <Form onSubmit={this.handleSubmit} className="signup-form">
                    <div className="signup-contentGrid">
                        <h1 className="page-title Header">Create User</h1>
                        <FormItem label="Username"
                                  hasFeedback
                                  validateStatus={this.state.username.validateStatus}
                                  help={this.state.username.errorMsg}
                                  className="Username"
                        >
                            <Input
                                size="default"
                                name="username"
                                type="username"
                                autoComplete="on"
                                placeholder="Enter username"
                                prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                value={this.state.username.value}
                                onBlur={this.validateUsernameAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateUsername)}/>
                        </FormItem>
                        <FormItem
                            label="Email"
                            hasFeedback
                            validateStatus={this.state.email.validateStatus}
                            help={this.state.email.errorMsg}
                            className="Email"
                        >
                            <Input
                                size="default"
                                name="email"
                                type="email"
                                autoComplete="on"
                                placeholder="Your email"
                                value={this.state.email.value}
                                onBlur={this.validateEmailAvailability}
                                onChange={(event) => this.handleInputChange(event, this.validateEmail)}/>
                        </FormItem>
                        <FormItem
                            label="First name"
                            validateStatus={this.state.firstName.validateStatus}
                            help={this.state.firstName.errorMsg}
                            className="FirstName"
                        >
                            <Input
                                size="default"
                                name="firstName"
                                type="name"
                                autoComplete="on"
                                placeholder="Your first name"
                                value={this.state.firstName.value}
                                onChange={(event) => this.handleInputChange(event, this.validateName)}/>
                        </FormItem>
                        <FormItem
                            label="Last Name"
                            validateStatus={this.state.lastName.validateStatus}
                            help={this.state.lastName.errorMsg}
                            className="LastName"
                        >
                            <Input
                                size="default"
                                name="lastName"
                                type="name"
                                autoComplete="on"
                                placeholder="Your last name"
                                value={this.state.lastName.value}
                                onChange={(event) => this.handleInputChange(event, this.validateName)}/>
                        </FormItem>
                        <FormItem
                            label="Organization"
                            validateStatus={this.state.organization.validateStatus}
                            help={this.state.organization.errorMsg}
                            className="Organization"
                        >
                            <Select name="FormatSelect"
                                    cl
                                    autosize={false}
                                    value={this.state.organization.value || ''}
                                    onChange={(value) => {
                                        this.setState({organization: {value: value}}, this.validateOrganization)
                                    }}
                                    options={this.state.availableOrganizations}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                            />
                        </FormItem>
                        <FormItem
                            label="Roles"
                            validateStatus={this.state.roles.validateStatus}
                            help={this.state.roles.errorMsg}
                            className="Roles"
                        >
                            <Select name="FormatSelect"
                                    cl
                                    autosize={false}
                                    value={this.state.roles.value || ''}
                                    isMulti={true}
                                    onChange={(value) => {
                                        this.setState({roles: {value: value}}, this.validateRoles)
                                    }}
                                    options={this.state.availableRoles}
                                    getOptionLabel={(option) => option}
                                    getOptionValue={(option) => option}
                            />
                        </FormItem>
                        <FormItem
                            label="Language"
                            validateStatus={this.state.language.validateStatus}
                            help={this.state.language.errorMsg}
                            className="Language"
                        >
                            <Select name="FormatSelect"
                                    cl
                                    autosize={false}
                                    value={this.state.language.value || ''}
                                    onChange={(value) => {
                                        this.setState({language: {value: [value]}}, this.validateLanguage)
                                    }}
                                    options={this.state.availableLanguages}
                                    getOptionLabel={(option) => option.localizedLanguage}
                                    getOptionValue={(option) => option}
                            />
                        </FormItem>
                        <FormItem
                            label="Gender"
                            validateStatus={this.state.gender.validateStatus}
                            help={this.state.gender.errorMsg}
                            className="Gender"
                        >
                            <Select name="FormatSelect"
                                    cl
                                    autosize={false}
                                    value={this.state.gender.value || ''}
                                    onChange={(value) => {
                                        this.setState({gender: {value: [value]}}, this.validateGender)
                                    }}
                                    options={this.state.availableGenders}
                                    getOptionLabel={(option) => option}
                                    getOptionValue={(option) => option}
                            />
                        </FormItem>
                        <FormItem className="Submit">
                            <Button type="primary"
                                    htmlType="submit"
                                    size="default"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}>Sign up</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        );
    }

    // Validation Functions

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    };

    validateEmail = (email) => {
        if (!email) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email may not be empty'
            }
        }

        const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
        if (!EMAIL_REGEX.test(email)) {
            return {
                validateStatus: 'error',
                errorMsg: 'Email not valid'
            }
        }

        if (email.length > EMAIL_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    };

    validateUsername = (username) => {
        if (username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    };

    validateUsernameAvailability() {
        // First check for client side errors in username
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);

        if (usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
            .then(response => {
                if (response) {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'error',
                            errorMsg: 'This username is already taken'
                        }
                    });
                }
            }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'error',
                    errorMsg: "Username already taken"
                }
            });
        });
    }

    validateEmailAvailability() {
        // First check for client side errors in email
        const emailValue = this.state.email.value;
        const emailValidation = this.validateEmail(emailValue);

        if (emailValidation.validateStatus === 'error') {
            this.setState({
                email: {
                    value: emailValue,
                    ...emailValidation
                }
            });
            return;
        }

        this.setState({
            email: {
                value: emailValue,
                validateStatus: 'success',
                errorMsg: null
            }
        });

        // checkEmailAvailability(emailValue)
        //     .then(response => {
        //         if (response.available) {
        //             this.setState({
        //                 email: {
        //                     value: emailValue,
        //                     validateStatus: 'success',
        //                     errorMsg: null
        //                 }
        //             });
        //         } else {
        //             this.setState({
        //                 email: {
        //                     value: emailValue,
        //                     validateStatus: 'error',
        //                     errorMsg: 'This Email is already registered'
        //                 }
        //             });
        //         }
        //     }).catch(error => {
        //     // Marking validateStatus as success, Form will be rechecked at server
        //     this.setState({
        //         email: {
        //             value: emailValue,
        //             validateStatus: 'success',
        //             errorMsg: null
        //         }
        //     });
        // });
    }

    validateOrganization() {
        if (this.state.organization.value) {
            this.setState({
                organization: {
                    value: this.state.organization.value,
                    validateStatus: 'success',
                    errorMsg: null
                }
            })
        } else {
            this.setState({
                organization: {
                    validateStatus: 'error',
                    errorMsg: "Please select an organization!"
                }
            })
        }
    }

    validateRoles() {
        if (this.state.roles.value) {
            this.setState({
                roles: {
                    value: this.state.roles.value,
                    validateStatus: 'success',
                    errorMsg: null
                }
            })
        } else {
            this.setState({
                roles: {
                    validateStatus: 'error',
                    errorMsg: "Please select a role!"
                }
            })
        }
    }

    validateGender() {
        if (this.state.gender.value) {
            this.setState({
                gender: {
                    value: this.state.gender.value,
                    validateStatus: 'success',
                    errorMsg: null
                }
            })
        } else {
            this.setState({
                gender: {
                    validateStatus: 'error',
                    errorMsg: "Please select a gender!"
                }
            })
        }
    }

    validateLanguage() {
        if (this.state.language.value) {
            this.setState({
                language: {
                    value: this.state.language.value,
                    validateStatus: 'success',
                    errorMsg: null
                }
            })
        } else {
            this.setState({
                language: {
                    validateStatus: 'error',
                    errorMsg: "Please select a language!"
                }
            })
        }
    }
}

export default Signup;