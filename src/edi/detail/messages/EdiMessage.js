import React, {Component} from 'react';
import './EdiMessage.css';
import TextMessageIcon from "../../../resources/ediConnection/md-mail.png"
import AttachmentMessageIcon from "../../../resources/ediConnection/md-attach.png"
import PhoneMessageIcon from "../../../resources/ediConnection/md-call.png"


class EdiMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: props.message,
            type: props.type
            // status: props.status,
            // creationTime: props.creationTime,
            // updateTime: props.updateTime,
            // customerName: props.customerName,
            // supplierName: props.supplierName,
            // assignedDev: props.assignedDev
        };
    }


    render() {
        return (
            <div className="EdiMessage">
                {
                    this.state.type.includes("TextMessage") ?
                        <img src={TextMessageIcon} className="MessageTypeIcon" alt=""/> : null
                }
                {
                    this.state.type.includes("Attachment") ?
                        <img src={AttachmentMessageIcon} className="MessageTypeIcon" alt=""/> : null
                }
                {
                    this.state.type.includes("PhoneMessage") ?
                        <img src={PhoneMessageIcon} className="MessageTypeIcon" alt=""/> : null
                }
                <h1>{this.state.message.subject}</h1>
                {this.state.message.text}
                {/*    <h1>State:</h1>*/}
                {/*    {this.state.status}*/}
                {/*</div>*/}
                {/*<div className="ediDescriptionCreationTime"><h1>Created:</h1>{this.state.creationTime}</div>*/}
                {/*<div className="ediDescriptionUpdateTime"><h1>Last Modified:</h1>{this.state.updateTime}</div>*/}
                {/*<div className="ediDescriptionCustomerName"><h1>Customer:</h1>{this.state.customerName}</div>*/}
                {/*<div className="ediDescriptionSupplierName"><h1>Supplier:</h1>{this.state.supplierName}</div>*/}
                {/*<div className="ediDescriptionAssignedDev"><h1>Developer:</h1>{this.state.assignedDev}</div>*/}
            </div>
        );
    }
}

export default EdiMessage;