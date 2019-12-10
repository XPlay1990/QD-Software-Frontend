import React, {Component} from 'react';
import {convertToRaw} from 'draft-js';
import {editorStateFromRaw, editorStateToJSON, MegadraftEditor} from 'megadraft';
import Button from './Button/Button';
import './MegaDraftTextEditor.css';
// import 'megadraft/dist/css/megadraft.css';
// import 'megadraft/dist/css/sidebar.css';
// import 'megadraft/dist/css/toolbar.css';
// import 'megadraft/dist/css/block.css';
// import 'megadraft/dist/css/media.css';
// import 'megadraft/dist/css/typography.css';
import icons from 'megadraft/lib/icons/';
import {sendEdiMessage} from "../../../../../../util/APIUtils";
import {notification} from "antd";

const initialState = editorStateFromRaw(null);

class MegaDraftTextEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: initialState,
            // raw: convertToRaw(initialState.getCurrentContent()),
            // paste: false,
        };
        this.reloadEdiMessages = props.loadEdiMessages;
        this.ediConnectionId = props.ediConnectionId;
        this.sendMessage = this.sendMessage.bind(this)
    }


    handleUpdate = (editorState) => {
        this.setState({
            editorState,
            // raw: convertToRaw(editorState.getCurrentContent()),
            paste: false,
        });
    };

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    sendMessage() {
        const {editorState} = this.state;

        if (!editorState.getCurrentContent().hasText()) {
            return;
        }

        const content = editorStateToJSON(editorState);

        let promise = sendEdiMessage(this.ediConnectionId, content);
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
                        editorState: editorStateFromRaw(null),
                        // raw: convertToRaw(initialState.getCurrentContent()),
                        isLoading: false
                    })
                }
                notification.success({
                    message: 'EdiConnection-Portal',
                    description: response.message,
                });
                this.reloadEdiMessages()
            }).catch(error => {
            this.setState({
                isLoading: false
            });
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    render() {
        const actions = [
            {type: "inline", label: "B", style: "BOLD", icon: icons.BoldIcon},
            {type: "inline", label: "I", style: "ITALIC", icon: icons.ItalicIcon},
            // these actions correspond with the entityInputs above
            {type: "entity", label: "Link", style: "link", entity: "LINK", icon: icons.LinkIcon},
            {type: "separator"},
            {type: "block", label: "UL", style: "unordered-list-item", icon: icons.ULIcon},
            {type: "block", label: "OL", style: "ordered-list-item", icon: icons.OLIcon},
            {type: "block", label: "H2", style: "header-two", icon: icons.H2Icon},
            {type: "block", label: "QT", style: "blockquote", icon: icons.BlockQuoteIcon}
        ];
        // const {raw, editorState, paste} = this.state;
        return (
            <div className="MessageEditor">
                <div className="EditorLabel">editor</div>
                <MegadraftEditor
                    editorState={this.state.editorState}
                    onChange={this.handleUpdate}
                    showSidebar={false}
                    // theme='white-thin'
                    actions={actions}
                    placeholder={"Type your message"}
                    // readOnly={true}
                    // language={'de-DE'}
                />
                <Button className="SendButton" label="Send" handleClick={this.sendMessage}/>
            </div>
        );
    }
}

export default MegaDraftTextEditor;