import React, {Component} from 'react';
import './AttachmentList.css';
import {getAttachmentList, storeAttachments} from "../../../../util/APIUtils";
import Dropzone from 'react-dropzone'
import {notification} from "antd";
import Attachment from "./Attachment";

class AttachmentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attachmentList: [],
            isLoading: true
        };

        this.ediConnectionId = props.match.params.id;
        this.loadAttachmentList = this.loadAttachmentList.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
    }

    loadAttachmentList() {
        let promise = getAttachmentList(this.ediConnectionId);
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
                        attachmentList: response.content,
                        isLoading: false
                    });
                }
            }).catch(error => {
            this.setState({
                attachmentList: [],
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this._isMounted = true;
        this.loadAttachmentList(this.ediConnectionId);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate = nextProps => {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                isLoading: true
            });
            this.loadAttachmentList(this.ediConnectionId);
        }
    };

    uploadFiles = acceptedFiles => {
        let promise = storeAttachments(this.ediConnectionId, acceptedFiles);
        if (!promise) {
            return;
        }

        promise
            .then(response => {
                if (response.success === true) {
                    notification.success({
                        message: 'EdiConnection-Portal',
                        description: "File successfully uploaded!",
                    });
                } else {
                    notification.error({
                        message: 'EdiConnection-Portal',
                        description: response.message,
                    });
                }
                this.loadAttachmentList()
            }).catch(error => {
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message,
            });
        });
        // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    };

    render() {
        const attachments = [];
        this.state.attachmentList.forEach((attachment, index) => {
            attachments.push(<Attachment
                key={attachment.fileName}
                fileName={attachment.fileName}
                fileSize={attachment.fileSize}
                fileType={attachment.fileType}
                ediConnectionId={this.ediConnectionId}
            />)
        });

        return (
            <div className="EdiAttachments">
                <div className="AttachmentList">
                    {attachments}
                </div>
                <Dropzone onDrop={acceptedFiles => this.uploadFiles(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div className={"AttachmentDropZone"}{...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
        );
    }
}

export default AttachmentList;