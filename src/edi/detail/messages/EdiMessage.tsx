import * as React from 'react';
import {MessageBox} from "react-chat-elements"
import {ChatItem} from 'react-chat-elements'
import 'react-chat-elements/dist/main.css';
import './EdiMessage.css';
import TextMessageIcon from "../../../resources/ediConnection/md-mail.png"
import AttachmentMessageIcon from "../../../resources/ediConnection/md-attach.png"
import PhoneMessageIcon from "../../../resources/ediConnection/md-call.png"

interface EdiMessageData {
    subject: String
    text: String
    creationTime: String
}

interface EdiMessageProps {
    message: EdiMessageData
    type: String
}

class EdiMessage extends React.Component <EdiMessageProps, EdiMessageProps> {
    constructor(props: EdiMessageProps) {
        super(props);
        this.state = props
    }


    render() {
        let messageType: String;
        if (this.state.type.includes("TextMessage")) {
            messageType = "Text"
        } else if (this.state.type.includes("Attachment")) {
            messageType = "file"
        }

        return (
            <div className="EdiMessage">
                {/*<ChatItem*/}
                {/*    avatar={'https://facebook.github.io/react/img/logo.svg'}*/}
                {/*    alt={'Reactjs'}*/}
                {/*    title={'Facebook'}*/}
                {/*    subtitle={'What are you doing?'}*/}
                {/*    date={new Date()}*/}
                {/*    unread={0} />*/}
                <MessageBox
                    position={'left'}
                    type={'text'}
                    title={this.state.message.subject}
                    text={this.state.message.text}
                    dateString={this.state.message.creationTime}
                    data={{
                        status: {
                            click: false,
                            loading: 0,
                        }
                    }}/>
                {/*{*/}
                {/*    this.state.type.includes("TextMessage") ?*/}
                {/*        <img src={TextMessageIcon} className="MessageTypeIcon" alt=""/> : null*/}
                {/*}*/}
                {/*{*/}
                {/*    this.state.type.includes("Attachment") ?*/}
                {/*        <img src={AttachmentMessageIcon} className="MessageTypeIcon" alt=""/> : null*/}
                {/*}*/}
                {/*{*/}
                {/*    this.state.type.includes("PhoneMessage") ?*/}
                {/*        <img src={PhoneMessageIcon} className="MessageTypeIcon" alt=""/> : null*/}
                {/*}*/}
                {/*<h1>{this.state.message.subject}</h1>*/}
                {/*{this.state.message.text}*/}
                {/*{this.state.message.creationTime}*/}
                {/*{this.state.message.updateTime}*/}
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