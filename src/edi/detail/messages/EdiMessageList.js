import React, {Component} from 'react';
import './EdiMessageList.css';
import LoadingIndicator from "../../../common/LoadingIndicator";
import {getEdiConnectionMessages} from "../../../util/APIUtils";
import EdiMessage from "./EdiMessage";
import {Editor, EditorState} from 'draft-js';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js/dist/Draft.css';

class EdiMessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ediMessages: [],
            isLoading: true,
            editorState: EditorState.createEmpty()
        };
        this.ediConnectionId = props.ediConnectionId;
        this.loadEdiMessages = this.loadEdiMessages.bind(this);
        this.onChange = (editorState) => this.setState({editorState});
        this.setEditor = (editor) => {
            this.editor = editor;
        };
    }

    loadEdiMessages(ediConnectionId) {
        let promise = getEdiConnectionMessages(ediConnectionId);
        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                console.log(response.content);
                if (this._isMounted) {
                    this.setState({
                        ediMessages: response.content,
                        isLoading: false
                    })
                }
            }).catch(error => {
            console.log(error);
            this.setState({
                ediMessages: [],
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this._isMounted = true;
        this.loadEdiMessages(this.ediConnectionId);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate = nextProps => {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                ediMessages: [],
                isLoading: true
            });
            this.loadEdiMessages(this.ediConnectionId);
        }
    };

    render() {
        const messageView = [];
        this.state.ediMessages.forEach((ediMessage, index) => {
            messageView.push(<EdiMessage
                key={ediMessage.message.id}
                message={ediMessage.message}
                type={ediMessage.type}
            />)
        });

        const styles = {
            editor: {
                border: '1px solid gray',
                minHeight: '6em'
            }
        };
        const toolbarPlugin = createToolbarPlugin();


        return (
            <div className="EdiMessageList">
                {messageView}
                {
                    this.state.isLoading ?
                        <LoadingIndicator/> : null
                }
                {
                    !this.state.isLoading && this.state.ediMessages === [] ? (
                        <div className="noEdiConnectionsFound">
                            <span>No Messages Found.</span>
                        </div>
                    ) : null
                }
                {
                    // !this.state.isLoading && this.state.ediMessages !== [] ? (
                    // ) : null
                }
                <div style={styles.editor} onClick={this.focusEditor}>
                    <Editor
                        ref={this.setEditor}
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={[toolbarPlugin]}
                    />
                </div>
            </div>
        );
    }
}

export default EdiMessageList;