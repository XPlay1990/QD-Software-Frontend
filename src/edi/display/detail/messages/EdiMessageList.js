import React, {Component} from 'react';
import './EdiMessageList.css';
import LoadingIndicator from "../../../../common/LoadingIndicator";
import {getEdiConnectionMessages} from "../../../../util/APIUtils";
import EdiMessageJS from "./EdiMessageJS";
import MegaDraftTextEditor from "./TextEditor/MegaDraft/MegaDraftTextEditor";
import {Box} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
// import '@atlaskit/css-reset';
// import '@atlaskit/reduced-ui-pack';
// import { Editor, CollapsedEditor } from '@atlaskit/editor-core';

// export class ExtendedEditor extends React.Component {
//     handleSave = () => {
//         this.props.actions.getValue().then(value => console.log(value));
//     }
//
//     render() {
//         const {actions, ...props} = this.props;
//         return <Editor {...props} onSave={this.handleSave}/>;
//     }
// }

class EdiMessageList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ediMessages: [],
            isLoading: true,
            isEditorExpanded: false
        };
        this.ediConnectionId = props.ediConnectionId;
        this.loadEdiMessages = this.loadEdiMessages.bind(this);
    }

    // expandEditor = () => this.setState({ isEditorExpanded: true });
    // collapseEditor = () => this.setState({ isEditorExpanded: false });
    //
    // onSave = () => {
    //     /* do something */
    // };

    loadEdiMessages() {
        let promise = getEdiConnectionMessages(this.ediConnectionId);
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
                        ediMessages: response.content,
                        isLoading: false
                    })
                }
            }).catch(error => {
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
            messageView.push(<EdiMessageJS
                key={ediMessage.message.id}
                message={ediMessage.message}
                type={ediMessage.type}
            />);
            messageView.push(<Divider variant="middle"/>
            )
        });

        return (
            <Box display={"flex"} flexDirection={"column"} className="EdiMessageList">
                <Box display={"flex"} flexDirection={"column"} className="EdiMessages">
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
                </Box>
                <MegaDraftTextEditor
                    loadEdiMessages={this.loadEdiMessages}
                    ediConnectionId={this.ediConnectionId}
                />
                {/*<MyDraftailEditor/>*/}
                {/*<CollapsedEditor*/}
                {/*    placeholder="What would you like to say?"*/}
                {/*    isExpanded={this.state.isEditorExpanded}*/}
                {/*    onFocus={this.expandEditor}*/}
                {/*>*/}
                {/*    <Editor*/}
                {/*        appearance="comment"*/}
                {/*        onSave={this.onSave}*/}
                {/*        onCancel={this.collapseEditor}*/}
                {/*    />*/}
                {/*</CollapsedEditor>*/}
            </Box>
        );
    }
}

export default EdiMessageList;