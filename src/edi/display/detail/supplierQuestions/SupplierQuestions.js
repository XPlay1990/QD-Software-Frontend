import React, {Component} from 'react';
import './SupplierQuestions.css';
import {
    getAnswers,
    getConnectionTypes,
    getMessageTypes,
    getQuestions,
    getTransferStandards,
    saveSupplierAnswers
} from "../../../../util/APIUtils";
import LoadingIndicator from "../../../../common/LoadingIndicator";
import NotFound from "../../../../error/NotFound";
import {Button, Form, Input, notification, Radio} from 'antd';
import Select from "react-select";
import i18n from "i18next";
import {Trans} from "react-i18next";
import Grid from "@material-ui/core/Grid";

const FormItem = Form.Item;

class SupplierQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AnswerList: null,
            QuestionList: null,
            MessageTypesList: null,
            ConnectionTypesList: null,
            TransferStandardsList: null,

            SelectedMessageTypesReceive: [],
            SelectedMessageTypesSend: [],
            PreferredConnectionTypes: [],
            SelectedConnectionTypes: [],
            SelectedConnectionTypesOther: [],
            SelectedTransferStandards: [],
            SelectedTransferStandardsOther: '',
            IsAlreadySupplier: false,
            WantsPDFs: false,
            SelectedPDFTransferStandards: [],
            WantsEmails: false,
            SelectedEmailMessageTypes: [],
            Email: '',
            isLoading: true
        };
        this.ediConnectionId = props.match.params.id;

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    initState() {
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

    getQuestions() {
        let promise = getQuestions(i18n.language);
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        QuestionList: response,
                    })
                }
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
                if (this._isMounted) {
                    response.forEach(element => {
                        switch (element.questionId) {
                            case 1:
                                this.setState({IsAlreadySupplier: (element.answer === 'true')});
                                break;
                            case 2:
                                this.setState({SelectedTransferStandards: (element.answer.split(','))});
                                break;
                            case 3:
                                this.setState({SelectedConnectionTypes: (element.answer.split(','))});
                                break;
                            case 4:
                                this.setState({PreferredConnectionTypes: (element.answer.split(','))});
                                break;
                            case 5:
                                this.setState({SelectedMessageTypesReceive: (element.answer.split(','))});
                                break;
                            case 6:
                                this.setState({SelectedMessageTypesSend: (element.answer.split(','))});
                                break;
                            case 7:
                                this.setState({WantsPDFs: (element.answer === 'true')});
                                break;
                            case 8:
                                this.setState({SelectedPDFTransferStandards: (element.answer.split(','))});
                                break;
                            case 9:
                                this.setState({WantsEmails: (element.answer === 'true')});
                                break;
                            case 10:
                                this.setState({SelectedEmailMessageTypes: (element.answer.split(','))});
                                break;
                            case 11:
                                this.setState({Email: element.answer});
                                break;
                            default:
                                break;
                        }
                    });
                    this.setState({
                        AnswerList: response,
                    })
                }
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
                if (this._isMounted) {
                    this.setState({
                        MessageTypesList: response
                    })
                }
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
                if (this._isMounted) {
                    this.setState({
                        ConnectionTypesList: response
                    })
                }
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
                if (this._isMounted) {
                    this.setState({
                        TransferStandardsList: response
                    })
                }
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

    handleSubmit(event) {
        event.preventDefault();
        const answerList = [];
        answerList.push({questionId: this.state.QuestionList[0].id, answer: this.state.IsAlreadySupplier.toString()});
        answerList.push({
            questionId: this.state.QuestionList[1].id,
            answer: this.state.SelectedTransferStandards.toString()
        });
        answerList.push({
            questionId: this.state.QuestionList[2].id,
            answer: this.state.SelectedConnectionTypes.toString()
        });
        answerList.push({
            questionId: this.state.QuestionList[3].id,
            answer: this.state.PreferredConnectionTypes.toString()
        });
        answerList.push({
            questionId: this.state.QuestionList[4].id,
            answer: this.state.SelectedMessageTypesReceive.toString()
        });
        answerList.push({
            questionId: this.state.QuestionList[5].id,
            answer: this.state.SelectedMessageTypesSend.toString()
        });
        answerList.push({questionId: this.state.QuestionList[6].id, answer: this.state.WantsPDFs.toString()});
        if (this.state.WantsPDFs) {
            answerList.push({
                questionId: this.state.QuestionList[7].id,
                answer: this.state.SelectedPDFTransferStandards.toString()
            });
        }
        answerList.push({questionId: this.state.QuestionList[8].id, answer: this.state.WantsEmails.toString()});
        if (this.state.WantsEmails) {
            answerList.push({
                questionId: this.state.QuestionList[9].id,
                answer: this.state.SelectedEmailMessageTypes.toString()
            });
            answerList.push({questionId: this.state.QuestionList[10].id, answer: this.state.Email});
        }


        let promise = saveSupplierAnswers(this.ediConnectionId, answerList);
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                this.getAnswers(this.ediConnectionId);
                notification.success({
                    message: 'EdiConnection-Portal',
                    description: response.message,
                });
            }).catch(error => {
            this.setError(error);
        });
    };

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

    // validateEmail = (email) => {
    //     if (!email) {
    //         return {
    //             validateStatus: 'error',
    //             errorMsg: 'Email may not be empty'
    //         }
    //     }
    //
    //     const EMAIL_REGEX = RegExp('[^@ ]+@[^@ ]+\\.[^@ ]+');
    //     if (!EMAIL_REGEX.test(email)) {
    //         return {
    //             validateStatus: 'error',
    //             errorMsg: 'Email not valid'
    //         }
    //     }
    //
    //     if (email.length > EMAIL_MAX_LENGTH) {
    //         return {
    //             validateStatus: 'error',
    //             errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
    //         }
    //     }
    //
    //     return {
    //         validateStatus: null,
    //         errorMsg: null
    //     }
    // };

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
                    !this.state.isLoading
                    && this.state.QuestionList && this.state.AnswerList
                    && this.state.MessageTypesList && this.state.TransferStandardsList && this.state.ConnectionTypesList ? (
                        <Form onSubmit={this.handleSubmit} className="signup-form">
                            <Grid container spacing={3}>
                                <Grid item md={6} className="GeneralInfos">
                                    <h2>
                                        <Trans i18nKey={`ediConnection.supplierQuestions.generalInformation`}>General
                                            information</Trans>
                                    </h2>
                                    <FormItem
                                        label={'1. ' + this.state.QuestionList[0].question}
                                        // validateStatus={this.state.name.validateStatus}
                                        // help={this.state.name.errorMsg}
                                    >
                                        <Radio.Group defaultValue={this.state.IsAlreadySupplier}
                                                     onChange={(event) => this.setState({IsAlreadySupplier: event.target.value})}>
                                            <Radio.Button value={true}><Trans
                                                i18nKey={`common.yes`}>Yes</Trans></Radio.Button>
                                            <Radio.Button value={false}><Trans
                                                i18nKey={`common.no`}>No</Trans></Radio.Button>
                                        </Radio.Group>
                                    </FormItem>
                                </Grid>

                                <Grid item md={6} className="SaveBtn">
                                    <FormItem>
                                        <Button type="primary"
                                                htmlType="submit"
                                                size="default"
                                                className="Edi-questions-form-button"
                                                disabled={this.isFormInvalid()}>
                                            <Trans i18nKey={`common.save`}>Save</Trans></Button>
                                    </FormItem>
                                </Grid>

                                <Grid item md={6} className="SupportedProtocols">
                                    <h2><Trans i18nKey={`ediConnection.supplierQuestions.supportedProtocols`}>Supported
                                        Protocols</Trans></h2>
                                    <FormItem
                                        label={'2. ' + this.state.QuestionList[1].question}
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
                                        {/*    size="default"*/}
                                        {/*    name="name"*/}
                                        {/*    autoComplete="off"*/}
                                        {/*    placeholder="Other"*/}
                                        {/*    value={this.state.SelectedTransferStandardsOther}*/}
                                        {/*    onChange={(event) => this.setState({SelectedTransferStandardsOther: event.target.value})}*/}
                                        {/*/>*/}
                                    </FormItem>

                                    <FormItem
                                        label={'3. ' + this.state.QuestionList[2].question}
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
                                        {/*    size="default"*/}
                                        {/*    name="name"*/}
                                        {/*    autoComplete="off"*/}
                                        {/*    placeholder="Other"*/}
                                        {/*    value={this.state.SelectedConnectionTypesOther}*/}
                                        {/*    onChange={(event) => this.setState({SelectedConnectionTypesOther: event.target.value})}*/}
                                        {/*/>*/}
                                    </FormItem>

                                    <FormItem
                                        label={'4. ' + this.state.QuestionList[3].question}
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
                                        {/*    size="default"*/}
                                        {/*    name="name"*/}
                                        {/*    autoComplete="off"*/}
                                        {/*    placeholder="Other"*/}
                                        {/*    value={''}*/}
                                        {/*    // onChange={(event) => this.handleInputChange(event, this.validateName)}*/}
                                        {/*/>*/}
                                    </FormItem>
                                </Grid>

                                <Grid item md={6} className="Transfer">
                                    <h2><Trans i18nKey={`ediConnection.supplierQuestions.transfer`}>Transfer</Trans>
                                    </h2>
                                    <FormItem
                                        label={'5. ' + this.state.QuestionList[4].question}
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
                                        {/*    size="default"*/}
                                        {/*    name="name"*/}
                                        {/*    autoComplete="off"*/}
                                        {/*    placeholder="Other"*/}
                                        {/*    value={''}*/}
                                        {/*    // onChange={(event) => this.handleInputChange(event, this.validateName)}*/}
                                        {/*/>*/}
                                    </FormItem>

                                    <FormItem
                                        label={'6. ' + this.state.QuestionList[5].question}
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
                                        {/*    size="default"*/}
                                        {/*    name="name"*/}
                                        {/*    autoComplete="off"*/}
                                        {/*    placeholder="Other"*/}
                                        {/*    value={''}*/}
                                        {/*    // onChange={(event) => this.handleInputChange(event, this.validateName)}*/}
                                        {/*/>*/}
                                    </FormItem>
                                </Grid>

                                <Grid item md={12} className="Additional">
                                    <h2 className="Additional_Heading"><Trans
                                        i18nKey={`ediConnection.supplierQuestions.additional`}>Additional</Trans>
                                    </h2>

                                    <Grid container spacing={3}>
                                        <Grid item md={6}>
                                            <FormItem
                                                label={'7. ' + this.state.QuestionList[6].question}
                                                // validateStatus={this.state.name.validateStatus}
                                                // help={this.state.name.errorMsg}
                                                className="Q1"
                                            >
                                                <Radio.Group defaultValue={this.state.WantsPDFs}
                                                             onChange={(event) => this.setState({WantsPDFs: event.target.value})}>
                                                    <Radio.Button value={true}><Trans
                                                        i18nKey={`common.yes`}>Yes</Trans></Radio.Button>
                                                    <Radio.Button value={false}><Trans
                                                        i18nKey={`common.no`}>No</Trans></Radio.Button>
                                                </Radio.Group>

                                                {this.state.WantsPDFs ? (
                                                        <Select name="PDFTransfer"
                                                                autosize={false}
                                                                value={this.state.SelectedPDFTransferStandards || ''}
                                                                isMulti={true}
                                                                placeholder={this.state.QuestionList[7].question}
                                                                onChange={(value) => this.setState({SelectedPDFTransferStandards: value})}
                                                                options={this.state.TransferStandardsList}
                                                                getOptionLabel={(option) => option}
                                                                getOptionValue={(option) => option}
                                                        />
                                                    ) :
                                                    (
                                                        <Select name="PDFTransfer"
                                                                autosize={false}
                                                                value={this.state.SelectedPDFTransferStandards || ''}
                                                                isMulti={true}
                                                                placeholder={this.state.QuestionList[7].question}
                                                                onChange={(value) => this.setState({SelectedPDFTransferStandards: value})}
                                                                options={this.state.TransferStandardsList}
                                                                getOptionLabel={(option) => option}
                                                                getOptionValue={(option) => option}
                                                                isDisabled={true}
                                                        />
                                                    )
                                                }
                                                {/*<Input*/}
                                                {/*    size="default"*/}
                                                {/*    name="name"*/}
                                                {/*    autoComplete="off"*/}
                                                {/*    placeholder="Other"*/}
                                                {/*    value={''}*/}
                                                {/*    onChange={(event) => this.handleInputChange(event, this.validateName)}*/}
                                                {/*/>*/}
                                            </FormItem>
                                        </Grid>

                                        <Grid item md={6}>
                                            <FormItem
                                                label={'9. ' + this.state.QuestionList[8].question}
                                                // validateStatus={this.state.name.validateStatus}
                                                // help={this.state.name.errorMsg}
                                                className="Q2"
                                            >
                                                <Radio.Group defaultValue={this.state.WantsEmails}
                                                             onChange={(event) => this.setState({WantsEmails: event.target.value})}>
                                                    <Radio.Button value={true}><Trans
                                                        i18nKey={`common.yes`}>Yes</Trans></Radio.Button>
                                                    <Radio.Button value={false}><Trans
                                                        i18nKey={`common.no`}>No</Trans></Radio.Button>
                                                </Radio.Group>
                                                {this.state.WantsEmails ? (
                                                        <div>
                                                            <Select name="EmailTransfer"
                                                                    autosize={false}
                                                                    value={this.state.SelectedEmailMessageTypes || ''}
                                                                    isMulti={true}
                                                                    placeholder={this.state.QuestionList[9].question}
                                                                    onChange={(value) => this.setState({SelectedEmailMessageTypes: value})}
                                                                    options={this.state.MessageTypesList}
                                                                    getOptionLabel={(option) => option}
                                                                    getOptionValue={(option) => option}
                                                            />
                                                            <Input
                                                                size="default"
                                                                name="email"
                                                                type="email"
                                                                autoComplete="on"
                                                                placeholder={this.state.QuestionList[10].question}
                                                                value={this.state.Email}
                                                                // hasFeedback
                                                                // validateStatus={this.state.email.validateStatus}
                                                                // help={this.state.email.errorMsg}>
                                                                onChange={(event) => this.setState({Email: event.target.value})}
                                                            />
                                                        </div>
                                                    ) :
                                                    (
                                                        <div>
                                                            <Select name="EmailTransfer"
                                                                    autosize={false}
                                                                    value={this.state.SelectedEmailMessageTypes || ''}
                                                                    isMulti={true}
                                                                    placeholder={this.state.QuestionList[9].question}
                                                                    onChange={(value) => this.setState({SelectedEmailMessageTypes: value})}
                                                                    options={this.state.MessageTypesList}
                                                                    getOptionLabel={(option) => option}
                                                                    getOptionValue={(option) => option}
                                                                    isDisabled={true}
                                                            />
                                                            <Input
                                                                size="default"
                                                                name="email"
                                                                type="email"
                                                                autoComplete="on"
                                                                placeholder={this.state.QuestionList[10].question}
                                                                value={this.state.Email}
                                                                // hasFeedback
                                                                // validateStatus={this.state.email.validateStatus}
                                                                // help={this.state.email.errorMsg}>
                                                                onChange={(event) => this.setState({Email: event.target.value})}
                                                                disabled={true}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            </FormItem>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Form>) : null
                }
            </div>
        );
    }
}

export default SupplierQuestions;