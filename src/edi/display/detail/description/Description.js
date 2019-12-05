import React, {Component} from 'react';
import './Description.css';
import Select from "react-select";
import {getDeveloperList, getEdiStatusList, saveDeveloperAndStatus} from "../../../../util/APIUtils";
import {notification} from "antd";
import {CURRENT_USER} from "../../../../config/constants";
import {Role} from "../../../../security/Roles";
import Button from '@material-ui/core/Button';
import {Trans} from "react-i18next";

class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {label: <Trans i18nKey={`ediConnection.state.${props.status}`}>props.status</Trans>, value: props.status},
            statusList: [],
            creationTime: props.creationTime,
            updateTime: props.updateTime,
            customerName: props.customerName,
            supplierName: props.supplierName,
            developerList: [],
            assignedDev: props.assignedDev,
            isSaving: false
        };
        this.isAdmin = JSON.parse(localStorage.getItem(CURRENT_USER))["authorities"].includes(Role.Admin);
        this.ediConnectionId = props.ediConnectionId;

        this.loadDeveloperList = this.loadDeveloperList.bind(this);
        this.loadEdiStatusList = this.loadEdiStatusList.bind(this);
        this.saveDeveloperAndState = this.saveDeveloperAndState.bind(this);
    }

    loadDeveloperList() {
        let promise = getDeveloperList();
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
                        developerList: response,
                        isLoading: false
                    })
                }
            })
            .catch(error => {
            });
        this.setState({
            isLoading: false
        })
    }

    loadEdiStatusList() {
        let promise = getEdiStatusList();
        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                if (this._isMounted) {
                    let statusList = [];
                    response.forEach(function (element) {
                        statusList.push({
                            label: <Trans i18nKey={`ediConnection.state.${element}`}>element:</Trans>,
                            value: element
                        })
                    });
                    this.setState({
                        statusList: statusList,
                        isLoading: false
                    })
                }
            })
            .catch(error => {
            });
        this.setState({
            isLoading: false
        })
    }

    saveDeveloperAndState() {
        let promise = saveDeveloperAndStatus(this.ediConnectionId, this.state.assignedDev, this.state.status);
        if (!promise) {
            return;
        }

        this.setState({
            isSaving: true
        });

        promise
            .then(response => {
                if (this._isMounted) {
                    setTimeout(() => {
                        this.setState({
                            isSaving: false
                        })
                    }, 150);
                }
                notification.success({
                    message: 'EdiConnection-Portal',
                    description: response.message,
                });
            })
            .catch(error => {
                this.setState({
                    isSaving: false
                });
                notification.error({
                    message: 'EdiConnection-Portal',
                    description: error.message,
                });
            });
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadDeveloperList();
        this.loadEdiStatusList();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        return (
            <div className="ediDescription">
                <div className="ediDescriptionGrid">
                    <div className="ediDescriptionCreationTime">
                        <h1>
                            <Trans i18nKey="ediConnection.description.created">Created:</Trans>
                        </h1>
                        {this.state.creationTime}
                    </div>
                    <div className="ediDescriptionUpdateTime">
                        <h1>
                            <Trans i18nKey="ediConnection.description.lastModified">Last Modified:</Trans>
                        </h1>
                        {this.state.updateTime}
                    </div>
                    <div className="ediDescriptionCustomerName">
                        <h1>
                            <Trans i18nKey="ediConnection.description.customer">Customer:</Trans>
                        </h1>
                        {this.state.customerName}
                    </div>
                    <div className="ediDescriptionSupplierName">
                        <h1>
                            <Trans i18nKey="ediConnection.description.supplier">Supplier:</Trans>
                        </h1>
                        {this.state.supplierName}
                    </div>
                    <div className="ediDescriptionAssignedDev">
                        <h1><Trans i18nKey="ediConnection.description.developer">Developer:</Trans></h1>
                        {
                            this.isAdmin ? (
                                <Select name="DeveloperSelect"
                                        autosize={false}
                                        value={this.state.assignedDev || ''}
                                        onChange={(value) => this.setState({assignedDev: value})}
                                        options={this.state.developerList}
                                        getOptionLabel={(option) => (`${option.firstName} ${option.lastName} (@${option.username})`)}
                                        getOptionValue={(option) => option.id}
                                />) : (
                                //TODO: Link to Developer Profile
                                <p>
                                    {
                                        this.state.assignedDev ?
                                            `${this.state.assignedDev.firstName} ${this.state.assignedDev.lastName} (@${this.state.assignedDev.username})` : 'Not Assigned'
                                    }
                                </p>
                            )
                        }
                    </div>
                    <div className="ediDescriptionStatus">
                        <h1><Trans i18nKey="ediConnection.description.state">State:</Trans></h1>
                        {
                            this.isAdmin ? (
                                    <Select name="StateSelect"
                                            autosize={false}
                                            value={this.state.status || ''}
                                            onChange={(value) => this.setState({status: value})}
                                            getOptionKey={(option) => option.index}
                                            options={this.state.statusList}
                                        // getOptionLabel={(option) => option}
                                        // getOptionValue={(option) => option}
                                    />)
                                : (`${this.state.status.label}`)
                        }
                    </div>
                    {
                        this.isAdmin ? (
                            <Button variant="contained" color="primary" size="medium"
                                    className={"ApplyChangesButton saveButton " + (this.state.isSaving ? "save-animation" : "")}
                                    onClick={this.saveDeveloperAndState}>
                                <Trans i18nKey="ediConnection.applyChanges">Apply Changes</Trans>
                            </Button>) : null
                    }
                </div>
            </div>
        );
    }
}

export default Description;