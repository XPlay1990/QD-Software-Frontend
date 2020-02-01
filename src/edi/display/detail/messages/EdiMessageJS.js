import React, {Component} from 'react';
import {editorStateFromRaw, MegadraftEditor} from "megadraft";
// import Button from './Button/Button';
// import 'megadraft/dist/css/megadraft.css';
import "./TextEditor/MegaDraft/MegaDraftTextEditor.css";
import "./EdiMessage.css"
import Grid from "@material-ui/core/Grid";
import {getAvatarColor} from "../../../../util/Colors";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";


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
            <Grid spacing={3} container className="EdiMessage">
                <Grid item xs={6} className="Sender EdiMessageHeader">
                    <Typography variant="h6" style={{overflowWrap: "break-word", textOverflow: "ellipsis"}}>
                        {this.state.sender}
                    </Typography>
                </Grid>
                <Grid item xs={6} className="CreationTime EdiMessageHeader">
                    <Typography variant="h6" style={{overflowWrap: "break-word", textOverflow: "ellipsis"}}>
                        {this.state.creationTime}
                    </Typography>
                </Grid>
                <Grid item xs={12} className="EdiMessageText">
                    <Box className="user-avatar">
                        <Avatar className="user-avatar-circle"
                                style={{backgroundColor: getAvatarColor(this.state.sender)}}>
                            {`${this.state.sender[0].toUpperCase()}`}
                        </Avatar>
                    </Box>

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
                </Grid>
            </Grid>
        );
    }
}

export default EdiMessageJS;