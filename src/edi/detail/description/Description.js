import React, {Component} from 'react';
import './Description.css';


class Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: props.status,
            creationTime: props.creationTime,
            updateTime: props.updateTime,
            customerName: props.customerName,
            supplierName: props.supplierName,
            assignedDev: props.assignedDev
        };
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
                    <div className="ediDescriptionAssignedDev"><h1>Developer:</h1>{this.state.assignedDev}</div>
                </div>
            </div>
        );
    }
}

export default Description;