import React, {Component} from 'react';
import {EDI_LIST_SIZE} from '../../config/constants';
import {withRouter} from 'react-router-dom';
import './EdiCreate.css';
import "react-table/react-table.css";
import LoadingIndicator from "../../common/LoadingIndicator";
import Select from "react-select";
import {getCustomerOrganizations, getSupplierOrganizations} from "../../util/APIUtils";

class EdiCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            selectedCustomer: null,
            selectedSupplier: null,
            customerList: [],
            supplierList: []
        };
        this.loadCustomerList = this.loadCustomerList.bind(this);
    }

    handleChange = selectedOption => {
        this.setState({selectedCustomer: selectedOption});
        // TODO: do distinguish between customerselect and supplierselect!
        console.log(selectedOption)
    };

    loadCustomerList(page = 0, size = EDI_LIST_SIZE) {
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
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.customerList}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                />
                            </div>

                            <div className={"CustomerContactAddList"}>
                                <span>Select Contact</span>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.supplierList}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                />
                            </div>

                            <div className={"SupplierSelect"}>
                                <span>Select Supplier</span>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.supplierList}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.id}
                                />
                            </div>

                            <div className={"SupplierContactAddList"}>
                                <span>Select Contact</span>
                                <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.supplierList}
                                    getOptionLabel={(option) => option.name}
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