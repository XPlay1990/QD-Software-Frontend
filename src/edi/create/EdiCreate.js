import React, {Component} from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import './EdiCreate.css';
import LoadingIndicator from "../../common/LoadingIndicator";
import BaseSelect from "react-select";
import {
    createEdiCon,
    getCustomerOrganizations,
    getOrganizationMembers,
    getSupplierOrganizations
} from "../../util/APIUtils";
import {notification} from "antd";
import {BASE_URL} from "../../config/constants";
import CustomRequiredSelect from "../../common/CustomRequiredSelect";

const RequiredSelect = props => (
    <CustomRequiredSelect
        {...props}
        SelectComponent={BaseSelect}
    />
);

class EdiCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            customerSelect: null,
            customerContactSelect: null,
            supplierSelect: null,
            supplierContactSelect: null,

            isSuccessfullyCreated: false,

            customerList: [],
            customerContactList: [],
            supplierList: [],
            supplierContactList: []
        };
        this.loadCustomerList = this.loadCustomerList.bind(this);
        this.createEdiCon = this.createEdiCon.bind(this);
        notification.config({
            placement: 'topRight',
            top: 70,
            duration: 3,
        });
    }

    createEdiCon(event) {
        event.preventDefault();

        let tmpCustomerList = [];
        this.state.customerContactSelect.forEach(function (customerContact) {
            tmpCustomerList.push(customerContact.id)
        });

        let tmpSupplierList = [];
        this.state.supplierContactSelect.forEach(function (supplierContact) {
            tmpSupplierList.push(supplierContact.id)
        });

        let promise = createEdiCon(this.state.customerSelect.id, tmpCustomerList,
            this.state.supplierSelect.id, tmpSupplierList);
        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise.then(response => {
            notification.success({
                message: 'EdiConnection-Portal',
                description: "Successfully created new Edi Connection!",
            });
            this.setState({
                isSuccessfullyCreated: true
            })
        })
            .catch(function (err) {
                notification.error({
                    message: 'EdiConnection-Portal',
                    description: err.toString(),
                });
            });

        this.setState({
            isLoading: false
        })
    }

    handleSelectsChange = (selectedOption, actionMeta) => {
        this.setState({
            [actionMeta.name]: selectedOption,
        });
        if (actionMeta.name === "customerSelect") {
            this.setState({
                customerContactSelect: null
            })
        } else if (actionMeta.name === "supplierSelect") {
            this.setState({
                supplierContactSelect: null
            })
        }

        this.loadOrganizationMembers(selectedOption.id, actionMeta.name)
    };

    loadOrganizationMembers(organizationId, selectName) {
        let promise = getOrganizationMembers(organizationId);
        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                if (this._isMounted) {
                    switch (selectName) {
                        case "customerSelect":
                            this.setState({
                                customerContactList: response
                            });
                            break;
                        case "supplierSelect":
                            this.setState({
                                supplierContactList: response
                            });
                            break;
                        default:
                            break;
                    }
                }
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
        this.setState({
            isLoading: false
        })
    }

    loadCustomerList() {
        let promise = getCustomerOrganizations();
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
                        customerList: response,
                        isLoading: false
                    })
                }
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
        this.setState({
            isLoading: false
        })
    }

    loadSupplierList() {
        let promise = getSupplierOrganizations();
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
                        supplierList: response,
                        isLoading: false
                    })
                }
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
        this.setState({
            isLoading: false
        })
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadCustomerList();
        this.loadSupplierList();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate = nextProps => {
        // Reset State
        // this.setState({
        // });
        // this.loadCustomerList();
    };

    render() {
        return (
            <div className="ediCreateContainer">
                <form onSubmit={this.createEdiCon}>

                    {
                        this.state.isSuccessfullyCreated ? <Redirect to={BASE_URL} push={true}/> : null
                    }
                    {
                        this.state.isLoading ?
                            <LoadingIndicator/> : null
                    }
                    {/*{*/}
                    {/*    !this.state.isLoading && this.state.ediConnections.length === 0 ? (*/}
                    {/*        <div className="noEdiConnectionsFound">*/}
                    {/*            <span>No Edi-Connections Found.</span>*/}
                    {/*        </div>*/}
                    {/*    ) : null*/}
                    {/*}*/}
                    {
                        !this.state.isLoading ? (
                            <div className="EdiCreateGrid">
                                <div className={["CustomerSelect"]}>
                                    <span>Select Customer</span>
                                    <RequiredSelect
                                        name="customerSelect"
                                        // value={this.state.customerSelect}
                                        onChange={this.handleSelectsChange}
                                        options={this.state.customerList}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.id}
                                        required
                                    />
                                </div>

                                <div className={["CustomerContactAddList"]}>
                                    <span>Select Contact</span>
                                    <RequiredSelect
                                        name="customerContactSelect"
                                        isMulti
                                        value={this.state.customerContactSelect || ''}
                                        onChange={(value) => this.setState({customerContactSelect: value})}
                                        options={this.state.customerContactList}
                                        getOptionLabel={(option) => (`${option.firstName} ${option.lastName} (@${option.username})`)}
                                        getOptionValue={(option) => option.id}
                                        required
                                    />
                                </div>

                                <div className={["SupplierSelect"]}>
                                    <span>Select Supplier</span>
                                    <RequiredSelect
                                        name="supplierSelect"
                                        // value={selectedOption}
                                        onChange={this.handleSelectsChange}
                                        options={this.state.supplierList}
                                        getOptionLabel={(option) => option.name}
                                        getOptionValue={(option) => option.id}
                                        required
                                    />
                                </div>

                                <div className={["SupplierContactAddList"]}>
                                    <span>Select Contact</span>
                                    <RequiredSelect
                                        name="supplierContactSelect"
                                        isMulti
                                        autosize={false}
                                        value={this.state.supplierContactSelect || ''}
                                        onChange={(value) => this.setState({supplierContactSelect: value})}
                                        options={this.state.supplierContactList}
                                        getOptionLabel={(option) => (`${option.firstName} ${option.lastName} (@${option.username})`)}
                                        getOptionValue={(option) => option.id}
                                        required
                                    />
                                </div>
                            </div>
                        ) : null
                    }
                    {/*{*/}
                    {/*    !this.state.isLoading && this.state.ediConnections.length > 0 ? (*/}
                    {/*        <div className="ediConnectionsTable">*/}


                    {/*        </div>*/}
                    {/*    ) : null*/}

                    {/*}*/}
                    <button type="submit" className={"ButtonCreate"}>Create</button>
                </form>
            </div>
        );
    }
}

export default withRouter(EdiCreate);