import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './EdiCreate.css';
import "react-table/react-table.css";
import LoadingIndicator from "../../common/LoadingIndicator";
import Select from "react-select";
import {getCustomerOrganizations, getOrganizationMembers, getSupplierOrganizations} from "../../util/APIUtils";

class EdiCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            customerSelect: null,
            customerContactSelect: null,
            supplierSelect: null,
            supplierContactSelect: null,

            customerList: [],
            customerContactList: [],
            supplierList: [],
            supplierContactList: []
        };
        this.loadCustomerList = this.loadCustomerList.bind(this);
    }

    handleChange = (selectedOption, actionMeta) => {
        this.setState({
            [actionMeta.name]: selectedOption,
        });

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
                    console.log(response)
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
        const {selectedOption} = this.state;

        return (
            <div className="ediCreateContainer">
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
                            <div className={"CustomerSelect"}>
                                <span>Select Customer</span>
                                <Select
                                    name="customerSelect"
                                    // value={this.state.customerSelect}
                                    onChange={this.handleChange}
                                    options={this.state.customerList}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                />
                            </div>

                            <div className={"CustomerContactAddList"}>
                                <span>Select Contact</span>
                                <Select
                                    name="customerContactSelect"
                                    isMulti
                                    value={this.state.customerContactSelect || ''}
                                    onChange={this.handleChange}
                                    options={this.state.customerContactList}
                                    getOptionLabel={(option) => (`${option.firstName} ${option.lastName} (@${option.username})`)}
                                    getOptionValue={(option) => option.id}
                                />
                            </div>

                            <div className={"SupplierSelect"}>
                                <span>Select Supplier</span>
                                <Select
                                    name="supplierSelect"
                                    // value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.supplierList}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                />
                            </div>

                            <div className={"SupplierContactAddList"}>
                                <span>Select Contact</span>
                                <Select
                                    name="supplierContactSelect"
                                    isMulti
                                    value={this.state.supplierContactSelect || ''}
                                    onChange={this.handleChange}
                                    options={this.state.supplierContactList}
                                    getOptionLabel={(option) => (`${option.firstName} ${option.lastName} (@${option.username})`)}
                                    getOptionValue={(option) => option.id}
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
                <button className={"ButtonCreate"}>Create</button>
            </div>
        );
    }
}

export default withRouter(EdiCreate);