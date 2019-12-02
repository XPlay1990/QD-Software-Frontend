import React, {Component} from 'react';
import './SupplierQuestions.css';
import {
    getAnswers,
    getConnectionTypes,
    getMessageTypes,
    getQuestions,
    getTransferStandards
} from "../../../../util/APIUtils";
import LoadingIndicator from "../../../../common/LoadingIndicator";
import NotFound from "../../../../error/NotFound";
import {Button, Form, Input, notification, Radio} from 'antd';
import Select from "react-select";

const FormItem = Form.Item;

class SupplierQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AnswerList: {},
            QuestionList: [],
            SelectedMessageTypesReceive: [],
            SelectedMessageTypesSend: [],
            MessageTypesList: [],
            PreferredConnectionTypes: [],
            SelectedConnectionTypes: [],
            SelectedConnectionTypesOther: [],
            ConnectionTypesList: [],
            SelectedTransferStandards: [],
            SelectedTransferStandardsOther: '',
            TransferStandardsList: [],
            IsAlreadySupplier: false,
            WantsPDFs: false,
            SelectedPDFTransferStandards: [],
            WantsEmails: false,
            SelectedEmailMessageTypes: [],
            Email: '',
            isLoading: true
        };
        this.ediConnectionId = props.match.params.id;
    }

    initState() {
        if (this._isMounted) {
            this.setState({
                isLoading: true
            });

            this.getQuestions();
            this.getAnswers(this.ediConnectionId);
            this.getMessageTypes();
            this.getConnectionTypes();
            this.getTransferStandards();

            this.setState({
                isLoading: false
            });
        }
    }

    getQuestions() {
        let promise = getQuestions();
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                this.setState({
                    QuestionList: response,
                })
            }).catch(error => {
            this.setError(error);
        });
    }

    getAnswers(id) {
        let promise = getAnswers(id);
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                this.setState({
                    AnswerList: response,
                })
            }).catch(error => {
            this.setError(error);
        });
    }

    getMessageTypes() {
        let promise = getMessageTypes();
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                this.setState({
                    MessageTypesList: response
                })
            }).catch(error => {
            this.setError(error);
        });
    };

    getConnectionTypes() {
        let promise = getConnectionTypes();
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                this.setState({
                    ConnectionTypesList: response
                })
            }).catch(error => {
            this.setError(error);
        });
    };

    getTransferStandards() {
        let promise = getTransferStandards();
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                this.setState({
                    TransferStandardsList: response
                })
            }).catch(error => {
            this.setError(error);
        });
    };

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

    componentDidMount() {
        this._isMounted = true;
        this.initState();
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
                    !this.state.isLoading && this.state.QuestionList.length === 11 ? (
                        <Form onSubmit={this.handleSubmit} className="signup-form">
                            <FormItem
                                label={'1. ' + this.state.QuestionList[0].question_en}
                                // validateStatus={this.state.name.validateStatus}
                                // help={this.state.name.errorMsg}
                            >
                                <Radio.Group defaultValue={this.state.IsAlreadySupplier}
                                             onChange={(event) => this.setState({IsAlreadySupplier: event.target.value})}>
                                    <Radio.Button value={true}>Yes</Radio.Button>
                                    <Radio.Button value={false}>No</Radio.Button>
                                </Radio.Group>
                            </FormItem>

                            <FormItem
                                label={'2. ' + this.state.QuestionList[1].question_en}
                                // validateStatus={this.state.name.validateStatus}
                                // help={this.state.name.errorMsg}
                            >
                                <Select name="FormatSelect"
                                        autosize={false}
                                        value={this.state.SelectedTransferStandards || ''}
                                        isMulti={true}
                                        onChange={(value) => this.setState({SelectedTransferStandards: value})}
                                        options={this.state.TransferStandardsList}
                                        getOptionLabel={(option) => option}
                                        getOptionValue={(option) => option}
                                />
                                {/*<Input*/}
                                {/*    size="medium"*/}
                                {/*    name="name"*/}
                                {/*    autoComplete="off"*/}
                                {/*    placeholder="Other"*/}
                                {/*    value={this.state.SelectedTransferStandardsOther}*/}
                                {/*    onChange={(event) => this.setState({SelectedTransferStandardsOther: event.target.value})}*/}
                                {/*/>*/}
                            </FormItem>

                            <FormItem
                                label={'3. ' + this.state.QuestionList[2].question_en}
                                // validateStatus={this.state.name.validateStatus}
                                // help={this.state.name.errorMsg}
                            >
                                <Select name="ConnectionTypes"
                                        autosize={false}
                                        value={this.state.SelectedConnectionTypes || ''}
                                        isMulti={true}
                                        onChange={(value) => this.setState({SelectedConnectionTypes: value})}
                                        options={this.state.ConnectionTypesList}
                                        getOptionLabel={(option) => option}
                                        getOptionValue={(option) => option}
                                />
                                {/*<Input*/}
                                {/*    size="medium"*/}
                                {/*    name="name"*/}
                                {/*    autoComplete="off"*/}
                                {/*    placeholder="Other"*/}
                                {/*    value={this.state.SelectedConnectionTypesOther}*/}
                                {/*    onChange={(event) => this.setState({SelectedConnectionTypesOther: event.target.value})}*/}
                                {/*/>*/}
                            </FormItem>

                            <FormItem
                                label={'4. ' + this.state.QuestionList[3].question_en}
                                // validateStatus={this.state.name.validateStatus}
                                // help={this.state.name.errorMsg}
                            >
                                <Select name="ConnectionTypes"
                                        autosize={false}
                                        isMulti={true}
                                        value={this.state.PreferredConnectionTypes || ''}
                                        onChange={(value) => this.setState({PreferredConnectionTypes: value})}
                                        options={this.state.ConnectionTypesList}
                                        getOptionLabel={(option) => option}
                                        getOptionValue={(option) => option}
                                />
                                {/*<Input*/}
                                {/*    size="medium"*/}
                                {/*    name="name"*/}
                                {/*    autoComplete="off"*/}
                                {/*    placeholder="Other"*/}
                                {/*    value={''}*/}
                                {/*    // onChange={(event) => this.handleInputChange(event, this.validateName)}*/}
                                {/*/>*/}
                            </FormItem>

                            <FormItem
                                label={'5. ' + this.state.QuestionList[4].question_en}
                                // validateStatus={this.state.name.validateStatus}
                                // help={this.state.name.errorMsg}
                            >
                                <Select name="MessageTypes"
                                        autosize={false}
                                        value={this.state.SelectedMessageTypesReceive || ''}
                                        isMulti={true}
                                        onChange={(value) => this.setState({SelectedMessageTypesReceive: value})}
                                        options={this.state.MessageTypesList}
                                        getOptionLabel={(option) => option}
                                        getOptionValue={(option) => option}
                                />
                                {/*<Input*/}
                                {/*    size="medium"*/}
                                {/*    name="name"*/}
                                {/*    autoComplete="off"*/}
                                {/*    placeholder="Other"*/}
                                {/*    value={''}*/}
                                {/*    // onChange={(event) => this.handleInputChange(event, this.validateName)}*/}
                                {/*/>*/}
                            </FormItem>

                            <FormItem
                                label={'6. ' + this.state.QuestionList[5].question_en}
                                // validateStatus={this.state.name.validateStatus}
                                // help={this.state.name.errorMsg}
                            >
                                <Select name="MessageTypes"
                                        autosize={false}
                                        value={this.state.SelectedMessageTypesSend || ''}
                                        isMulti={true}
                                        onChange={(value) => this.setState({SelectedMessageTypesSend: value})}
                                        options={this.state.MessageTypesList}
                                        getOptionLabel={(option) => option}
                                        getOptionValue={(option) => option}
                                />
                                {/*<Input*/}
                                {/*    size="medium"*/}
                                {/*    name="name"*/}
                                {/*    autoComplete="off"*/}
                                {/*    placeholder="Other"*/}
                                {/*    value={''}*/}
                                {/*    // onChange={(event) => this.handleInputChange(event, this.validateName)}*/}
                                {/*/>*/}
                            </FormItem>

                            <FormItem
                                label={'7. ' + this.state.QuestionList[6].question_en}
                                // validateStatus={this.state.name.validateStatus}
                                // help={this.state.name.errorMsg}
                            >
                                <Radio.Group defaultValue={this.state.WantsPDFs}
                                             onChange={(event) => this.setState({WantsPDFs: event.target.value})}>
                                    <Radio.Button value={true}>Yes</Radio.Button>
                                    <Radio.Button value={false}>No</Radio.Button>
                                </Radio.Group>

                                {this.state.WantsPDFs ? (
                                    <Select name="PDFTransfer"
                                            autosize={false}
                                            value={this.state.SelectedPDFTransferStandards || ''}
                                            isMulti={true}
                                            placeholder={this.state.QuestionList[7].question_en}
                                            onChange={(value) => this.setState({SelectedPDFTransferStandards: value})}
                                            options={this.state.TransferStandardsList}
                                            getOptionLabel={(option) => option}
                                            getOptionValue={(option) => option}
                                    />) : null
                                }
                                {/*<Input*/}
                                {/*    size="medium"*/}
                                {/*    name="name"*/}
                                {/*    autoComplete="off"*/}
                                {/*    placeholder="Other"*/}
                                {/*    value={''}*/}
                                {/*    onChange={(event) => this.handleInputChange(event, this.validateName)}*/}
                                {/*/>*/}
                            </FormItem>

                            <FormItem
                                label={'9. ' + this.state.QuestionList[8].question_en}
                                // validateStatus={this.state.name.validateStatus}
                                // help={this.state.name.errorMsg}
                            >
                                <Radio.Group defaultValue={this.state.WantsEmails}
                                             onChange={(event) => this.setState({WantsEmails: event.target.value})}>
                                    <Radio.Button value={true}>Yes</Radio.Button>
                                    <Radio.Button value={false}>No</Radio.Button>
                                </Radio.Group>
                                {this.state.WantsEmails ? (
                                    <div>
                                        <Select name="EmailTransfer"
                                                autosize={false}
                                                value={this.state.SelectedEmailMessageTypes || ''}
                                                isMulti={true}
                                                placeholder={this.state.QuestionList[9].question_en}
                                                onChange={(value) => this.setState({SelectedEmailMessageTypes: value})}
                                                options={this.state.MessageTypesList}
                                                getOptionLabel={(option) => option}
                                                getOptionValue={(option) => option}
                                        />
                                        <Input
                                            size="medium"
                                            name="name"
                                            autoComplete="on"
                                            placeholder={this.state.QuestionList[10].question_en}
                                            value={this.state.Email}
                                            onChange={(event) => this.setState({Email: event.target.value})}
                                        />
                                    </div>) : null
                                }
                            </FormItem>

                            <FormItem>
                                <Button type="primary"
                                        htmlType="submit"
                                        size="medium"
                                        className="Edi-questions-form-button"
                                        disabled={this.isFormInvalid()}>Save</Button>
                            </FormItem>
                        </Form>) : <NotFound/>
                }
            </div>
        );
    }
}

export default SupplierQuestions;