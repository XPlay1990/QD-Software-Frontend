import React, {Component} from 'react';
import {editorStateFromRaw, MegadraftEditor} from "megadraft";
// import Button from './Button/Button';
// import 'megadraft/dist/css/megadraft.css';
import "./TextEditor/MegaDraft/MegaDraftTextEditor.css";
import "./EdiMessage.css"
import Divider from '@material-ui/core/Divider';


class EdiMessageJS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sender: props.message.sender.username,
            creationTime: props.message.creationTime,
            editorState: editorStateFromRaw(JSON.parse(props.message.text)),
            isLoading: true,
        };
    }

    render() {
        return (
            <div className="EdiMessage">
                <div className="Sender">
                    <h1>{this.state.sender}</h1>
                </div>
                <div className="CreationTime">
                    <h1>{this.state.creationTime}</h1>
                </div>

                <div className="EdiMessageText">
                    <MegadraftEditor
                        editorState={this.state.editorState}
                        // onChange={this.handleUpdate}
                        showSidebar={false}
                        // theme='white-thin'
                        // actions={actions}
                        // placeholder={"Type your message"}
                        readOnly={true}
                        // language={'de-DE'}
                    />
                </div>
                <div className="MessageDivider">
                <Divider variant="middle" absolute/>
                    {/*<Divider variant="inset"  />*/}
                </div>
            </div>
        );
    }
}

export default EdiMessageJS;