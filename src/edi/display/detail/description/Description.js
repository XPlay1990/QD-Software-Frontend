import React, {Component} from 'react';
import './Description.css';
import Select from "react-select";
import {getDeveloperList} from "../../../../util/APIUtils";


class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status,
            creationTime: props.creationTime,
            updateTime: props.updateTime,
            customerName: props.customerName,
            supplierName: props.supplierName,
            developerList: [],
            assignedDev: props.assignedDev
        };
        this.loadDeveloperList = this.loadDeveloperList.bind(this);
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

    componentDidMount() {
        this._isMounted = true;
        this.loadDeveloperList();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {
        return (
            <div className="ediDescription">
                <div className="ediDescriptionGrid">
                    <div className="ediDescriptionStatus">
                        <h1>State:</h1>
                        {this.state.status}
                    </div>
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
                </div>
            </div>
        );
    }
}

export default Description;