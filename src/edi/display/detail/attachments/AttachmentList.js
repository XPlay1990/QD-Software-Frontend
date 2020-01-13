import React, {Component} from 'react';
import './AttachmentList.css';
import {getAttachmentList} from "../../../../util/APIUtils";
// import Dropzone from 'react-dropzone'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import {notification} from "antd";
import Attachment from "./Attachment";
import Box from "@material-ui/core/Box";
import {ACCESS_TOKEN, BACKEND_BASE_URL, EDICON_ATTACHMENT_UPLOAD_URL} from "../../../../config/constants";
import LinearProgress from "@material-ui/core/LinearProgress";

class AttachmentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            attachmentList: [],
            isLoading: true,
            files: [],
            isUploadActive: false,
            uploadPercentage: 0

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

    uploadFiles = (acceptedFiles, allFilesInDropZone) => {
        this.setState({isUploadActive: true});
        const formData = new FormData();
        acceptedFiles.forEach(function (entry) {
            formData.append("file", entry.file);
        });

        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = event => {
            const percentages = +((event.loaded / event.total) * 100).toFixed(2);
            this.setState({uploadPercentage: percentages})
        };

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                notification.error({
                    message: 'EdiConnection-Portal',
                    description: JSON.parse(xhr.response).message,
                });
                this.setState({isUploadActive: false, uploadPercentage: 0});
                allFilesInDropZone.forEach(f => f.remove());
            } else {
                notification.success({
                    message: 'EdiConnection-Portal',
                    description: "File successfully uploaded!",
                });
                this.setState({isUploadActive: false, uploadPercentage: 0});
                allFilesInDropZone.forEach(f => f.remove());
                this.loadAttachmentList()
            }
        };

        xhr.open("POST", `${BACKEND_BASE_URL}${EDICON_ATTACHMENT_UPLOAD_URL(this.ediConnectionId)}`);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));
        xhr.send(formData);
    };

    render() {
        const attachments = [];
        this.state.attachmentList.forEach((attachment, index) => {
            attachments.push(
                <Attachment
                    key={attachment.fileName}
                    fileName={attachment.fileName}
                    fileSize={attachment.fileSize}
                    fileType={attachment.fileType}
                    ediConnectionId={this.ediConnectionId}
                />
            )
        });

        return (
            <div className="EdiAttachments">
                <Box className="AttachmentList">
                    {attachments}
                </Box>

                <section className="AttachmentDropZone">
                    {
                        this.state.isUploadActive ?
                            <LinearProgress variant="determinate" value={this.state.uploadPercentage}
                                            color="secondary"/>
                            : null
                    }
                    < Dropzone
                        // getUploadPara ms={getUploadParams}
                        // onChangeStatus={handleChangeStatus}
                        onSubmit={this.uploadFiles}
                        // accept="image/*,audio/*,video/*"
                    />
                </section>
            </div>
        );
    }
}

export default AttachmentList;