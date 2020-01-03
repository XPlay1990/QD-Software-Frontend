import React, {Component} from 'react';
import "./Attachment.css"
// import {ReactComponent as PdfIcon} from "../../../../resources/fileIcons/pdf.svg"
// import {ReactComponent as TxtIcon} from "../../../../resources/fileIcons/txt.svg"
// import {ReactComponent as PngIcon} from "../../../../resources/fileIcons/png.svg"
// import {ReactComponent as JpgIcon} from "../../../../resources/fileIcons/jpg.svg"
// import {ReactComponent as DocxIcon} from "../../../../resources/fileIcons/docx.svg"
// import {ReactComponent as DefaultIcon} from "../../../../resources/fileIcons/clip.svg"
import {ReactComponent as DownloadIcon} from "../../../../resources/fileIcons/md-download.svg"
import {BACKEND_BASE_URL, EDICON_ATTACHMENT_DOWNLOAD_URL} from "../../../../config/constants";
import Button from "@material-ui/core/Button";
import formatBytes from '../../../../util/DataSizeHelper';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {customFileDownloadRequest} from "../../../../security/authHeader/AuthorizationHeaderRequest";

// import Divider from '@material-ui/core/Divider';


class Attachment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: props.fileName,
            fileSize: props.fileSize,
            fileType: props.fileType,
            ediConnectionId: props.ediConnectionId
        };
        this.downloadFile = this.downloadFile.bind(this)
    }

    downloadFile() {
        customFileDownloadRequest(`${BACKEND_BASE_URL}${EDICON_ATTACHMENT_DOWNLOAD_URL(this.state.ediConnectionId, this.state.fileName)}`);
    }

    render() {
        let fileSymbol =
            <Button onClick={this.downloadFile} className="EdiFileIcon">
                <DownloadIcon/>
            </Button>;


        // switch (this.state.fileType) {
        //     //TODO: LICENSE FLATICONS
        //     case "application/pdf":
        //         fileSymbol =
        //             <PdfIcon
        //                 className="EdiFileIcon"
        //                 onClick={this.downloadFile}
        //             />;
        //         break;
        //     case "text/plain":
        //         fileSymbol =
        //             <TxtIcon
        //                 className="EdiFileIcon"
        //                 onClick={this.downloadFile}
        //             />;
        //         break;
        //     case "image/png":
        //         fileSymbol =
        //             <PngIcon
        //                 className="EdiFileIcon"
        //                 onClick={this.downloadFile}
        //             />;
        //         break;
        //     case "image/jpeg":
        //         fileSymbol =
        //             <JpgIcon
        //                 className="EdiFileIcon"
        //                 onClick={this.downloadFile}
        //             />;
        //         break;
        //     case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        //         fileSymbol =
        //             <DocxIcon
        //                 className="EdiFileIcon"
        //                 onClick={this.downloadFile}
        //             />;
        //         break;
        //     default:
        //         fileSymbol =
        //             <DefaultIcon
        //                 className="EdiFileIcon"
        //                 onClick={this.downloadFile}
        //             />;
        //         break;
        // }
        return (
            <Paper className="Attachment">
                <Grid container spacing={0}>
                    <Grid item xs={6}>{fileSymbol}</Grid>
                    <Grid item container direction={"column"} xs={6}>
                        <Grid item><Box whiteSpace="nowrap" className="fileName">{this.state.fileName}</Box></Grid>
                        <Grid item><Box whiteSpace="nowrap" className="fileSize">{formatBytes(this.state.fileSize)}</Box></Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Attachment;