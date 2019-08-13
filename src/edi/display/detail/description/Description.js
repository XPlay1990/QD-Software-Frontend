import React, {Component} from 'react';
import './Description.css';
import Select from "react-select";
import {getDeveloperList, getEdiStatusList, saveDeveloperAndStatus} from "../../../../util/APIUtils";
import {notification} from "antd";


class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: {label: props.status, value: props.status},
            statusList: [],
            creationTime: props.creationTime,
            updateTime: props.updateTime,
            customerName: props.customerName,
            supplierName: props.supplierName,
            developerList: [],
            assignedDev: props.assignedDev,
            isSaving: false
        };
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
                        statusList.push({label: element, value: element})
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
                //TODO:ERRORMSG
                this.setState({
                    isSaving: false
                })
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
                    <div className="ediDescriptionCreationTime"><h1>Created:</h1>{this.state.creationTime}</div>
                    <div className="ediDescriptionUpdateTime"><h1>Last Modified:</h1>{this.state.updateTime}</div>
                    <div className="ediDescriptionCustomerName"><h1>Customer:</h1>{this.state.customerName}</div>
                    <div className="ediDescriptionSupplierName"><h1>Supplier:</h1>{this.state.supplierName}</div>
                    <div className="ediDescriptionAssignedDev">
                        <h1>Developer:</h1>
                        <Select name="DeveloperSelect"
                                autosize={false}
                                value={this.state.assignedDev || ''}
                                onChange={(value) => this.setState({assignedDev: value})}
                                options={this.state.developerList}
                                getOptionLabel={(option) => (`${option.firstName} ${option.lastName} (@${option.username})`)}
                                getOptionValue={(option) => option.id}
                        />
                    </div>
                    <div className="ediDescriptionStatus">
                        <h1>State:</h1>
                        <Select name="StateSelect"
                                autosize={false}
                                value={this.state.status || ''}
                                onChange={(value) => this.setState({status: value})}
                                getOptionKey={(option) => option.index}
                                options={this.state.statusList}
                            // getOptionLabel={(option) => option}
                            // getOptionValue={(option) => option}
                        />
                    </div>
                    <button
                        className={"saveButton " + (this.state.isSaving ? "save-animation" : "")}
                        onClick={this.saveDeveloperAndState}
                    />
                </div>
            </div>
        );
    }
}

export default Description;