import React, {Component} from 'react';
import "./Attachment.css"
// import {ReactComponent as PdfIcon} from "../../../../resources/fileIcons/pdf.svg"
// import {ReactComponent as TxtIcon} from "../../../../resources/fileIcons/txt.svg"
// import {ReactComponent as PngIcon} from "../../../../resources/fileIcons/png.svg"
// import {ReactComponent as JpgIcon} from "../../../../resources/fileIcons/jpg.svg"
// import {ReactComponent as DocxIcon} from "../../../../resources/fileIcons/docx.svg"
// import {ReactComponent as DefaultIcon} from "../../../../resources/fileIcons/clip.svg"
import {ReactComponent as DownloadIcon} from "../../../../resources/fileIcons/md-download.svg"
import {ACCESS_TOKEN, BACKEND_BASE_URL, EDICON_ATTACHMENT_DOWNLOAD_URL} from "../../../../config/constants";
import Button from "@material-ui/core/Button";
import formatBytes from '../../../../util/DataSizeHelper';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
        let anchor = document.createElement("a");
        document.body.appendChild(anchor);
        let fileDownloadUrl = encodeURI(`${BACKEND_BASE_URL}${EDICON_ATTACHMENT_DOWNLOAD_URL(this.state.ediConnectionId, this.state.fileName)}`);

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));

        fetch(fileDownloadUrl, {headers})
            .then(response => {
                this.filename = decodeURI(response.url).substring(response.url.lastIndexOf('/') + 1);
                return response.blob()
            })
            .then(blob => {
                let objectUrl = URL.createObjectURL(blob);
                anchor.href = objectUrl;
                anchor.download = this.filename;
                anchor.click();
                window.URL.revokeObjectURL(objectUrl);
            });
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
                        <Grid item><Box noWrap className="fileName">{this.state.fileName}</Box></Grid>
                        <Grid item><Box className="fileSize">{formatBytes(this.state.fileSize)}</Box></Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default Attachment;