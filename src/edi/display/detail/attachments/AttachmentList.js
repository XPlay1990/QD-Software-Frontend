import React, {Component} from 'react';
import './AttachmentList.css';
import {getAttachmentList, storeAttachments} from "../../../../util/APIUtils";
import Dropzone from 'react-dropzone'
import {notification} from "antd";

class AttachmentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attachmentList: [],
            isLoading: true
        };

        this.ediConnectionId = props.ediConnectionId;
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
                    console.log(this.state.attachmentList)
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
            }).catch(error => {
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message,
            });
        });
        this.loadAttachmentList()
        // const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    };

    render() {
        const attachments = [];
        this.state.attachmentList.forEach((attachment, index) => {
            // attachmentList.push(<EdiMessageJS
            //     key={ediMessage.message.id}
            //     message={ediMessage.message}
            //     type={ediMessage.type}
            // />)
        });

        return (
            <div className="EdiAttachments">
                <Dropzone onDrop={acceptedFiles => this.uploadFiles(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
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