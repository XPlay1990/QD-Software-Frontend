import * as React from 'react';
import {MessageBox} from "react-chat-elements"
import 'react-chat-elements/dist/main.css';
import './EdiMessage.css';
// import TextMessageIcon from "../../../resources/ediConnection/md-mail.png"
// import AttachmentMessageIcon from "../../../resources/ediConnection/md-attach.png"
// import PhoneMessageIcon from "../../../resources/ediConnection/md-call.png"

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

    render() {
        // let messageType: String;
        // if (this.props.type.includes("TextMessage")) {
        //     messageType = "text"
        // } else if (this.props.type.includes("Attachment")) {
        //     messageType = "file"
        // }

        return (
            <div className="EdiMessage">
                <MessageBox
                    position={'left'}
                    type={'file'}
                    title={this.props.message.subject}
                    text={this.props.message.text}
                    dateString={this.props.message.creationTime}
                    data={{
                        status: {
                            click: false,
                            loading: 0,
                        }
                    }}/>
            </div>
        );
    }
}

export default EdiMessage;