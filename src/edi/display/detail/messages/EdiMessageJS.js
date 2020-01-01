import React, {Component} from 'react';
import {editorStateFromRaw, MegadraftEditor} from "megadraft";
// import Button from './Button/Button';
// import 'megadraft/dist/css/megadraft.css';
import "./TextEditor/MegaDraft/MegaDraftTextEditor.css";
import "./EdiMessage.css"
import Avatar from '@atlaskit/avatar';
import Divider from '@material-ui/core/Divider';
import Grid from "@material-ui/core/Grid";
import {getAvatarColor} from "../../../../util/Colors";


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
            <div>
                <Grid spacing={3} container className="EdiMessage">
                    <Grid item xs={6} className="Sender">
                        <h1>{this.state.sender}</h1>
                    </Grid>
                    <Grid item xs={6} className="CreationTime">
                        <h1>{this.state.creationTime}</h1>
                    </Grid>
                    <Grid item xs={12} className="EdiMessageText">
                        <div className="Avatar">
                            {/*<Avatar*/}
                            {/*    // className="Avatar"*/}
                            {/*    name={this.state.sender}*/}
                            {/*    size="medium" presence="online"*/}
                            {/*    enableTooltip={true}*/}
                            {/*    label={this.state.sender}*/}
                            {/*    href={BASE_URL}*/}
                            {/*    // src={img url}*/}
                            {/*/>*/}
                            <Avatar className="user-avatar-circle"
                                    style={{backgroundColor: getAvatarColor(this.state.sender)}}>
                                {`${this.state.sender[0].toUpperCase()}`}
                            </Avatar>
                        </div>

                        {/*<Paper className="ediMessageText">*/}
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
                        {/*</Paper>*/}
                    </Grid>
                    {/*<Divider variant="inset"  />*/}
                </Grid>
                <Divider variant="middle"/>
            </div>
        );
    }
}

export default EdiMessageJS;