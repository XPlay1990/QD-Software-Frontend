import React, {Component} from 'react';
import './SupplierQuestions.css';
import {getAnswers, getQuestions} from "../../../../util/APIUtils";
import LoadingIndicator from "../../../../common/LoadingIndicator";
import NotFound from "../../../../error/NotFound";
import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class SupplierQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AnswerList: {},
            QuestionList: {},
            isLoading: true
        };
        this.ediConnectionId = props.match.params.id;
    }

    getAnswers(id) {
        let promise = getAnswers(id);
        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        AnswerList: response,
                        isLoading: false
                    })
                }
            }).catch(error => {
            if (this._isMounted) {

                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else if (error.status === 403) {
                    this.setState({
                        forbidden: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
                this.setState({
                    AnswerList: null,
                    isLoading: false
                });
            }
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message,
            });
        });
    }

    getQuestions() {
        let promise = getQuestions();
        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                if (this._isMounted) {
                    console.log(response)
                    this.setState({
                        QuestionList: response,
                        isLoading: false
                    })
                }
            }).catch(error => {
            if (this._isMounted) {
                if (error.status === 404) {
                    this.setState({
                        notFound: true,
                        isLoading: false
                    });
                } else if (error.status === 403) {
                    this.setState({
                        forbidden: true,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        serverError: true,
                        isLoading: false
                    });
                }
                this.setState({
                    QuestionList: null,
                    isLoading: false
                });
            }
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message,
            });
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this.getQuestions();
        // this.getAnswers(this.ediConnectionId);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate = nextProps => {
    };

    isFormInvalid() {
        // return !(this.state.name.validateStatus === 'success' &&
        //     this.state.username.validateStatus === 'success' &&
        //     this.state.email.validateStatus === 'success' &&
        //     this.state.password.validateStatus === 'success'
        // );
    }

    render() {
        if (this.state.notFound) {
            return <NotFound/>;
        }

        return (
            <div className="questionContent">
                {
                    this.state.isLoading ?
                        <LoadingIndicator/> : null
                }
                {
                    // !this.state.isLoading && this.state.ediConnection === null ? (
                    //     <div className="noEdiConnectionsFound">
                    //         <span>No Edi-Connection with Id {this.ediConnectionId} Found.</span>
                    //     </div>
                    // ) : null
                }
                {
                    !this.state.isLoading && this.state.QuestionList != null ? (
                        <Form onSubmit={this.handleSubmit} className="signup-form">
                            <FormItem>

                                <p>{this.state.QuestionList[0].question_en}</p>
                            </FormItem>

                            <FormItem
                                label="Full Name"
                                // validateStatus={this.state.name.validateStatus}
                                // help={this.state.name.errorMsg}
                                >
                                <Input
                                    size="large"
                                    name="name"
                                    autoComplete="off"
                                    placeholder="Your full name"
                                    value={this.state.QuestionList[0].question_en}
                                    onChange={(event) => this.handleInputChange(event, this.validateName)} />
                            </FormItem>

                            <p>{this.state.QuestionList[1].question_en}</p>


                            <FormItem>
                                <Button type="primary"
                                        htmlType="submit"
                                        size="large"
                                        className="Edi-questions-form-button"
                                        disabled={this.isFormInvalid()}>Send</Button>
                            </FormItem>
                        </Form>) : <NotFound/>
                }
            </div>
        );
    }
}

export default SupplierQuestions;