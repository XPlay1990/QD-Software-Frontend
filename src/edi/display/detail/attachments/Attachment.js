import React, {Component} from 'react';
import "./Attachment.css"
import {ReactComponent as PdfIcon} from "../../../../resources/fileIcons/pdf.svg"
import {ReactComponent as TxtIcon} from "../../../../resources/fileIcons/txt.svg"
import {ReactComponent as PngIcon} from "../../../../resources/fileIcons/png.svg"
import {ReactComponent as JpgIcon} from "../../../../resources/fileIcons/jpg.svg"
import {ReactComponent as DocxIcon} from "../../../../resources/fileIcons/docx.svg"
import {ReactComponent as DefaultIcon} from "../../../../resources/fileIcons/clip.svg"
import {ACCESS_TOKEN} from "../../../../config/constants";

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
        let file = `http://localhost:9020/edi_connection/${this.state.ediConnectionId}/attachment/download/${this.state.fileName}`;

        let headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN));

        fetch(file, {headers})
            .then(response => {
                this.filename = response.url.substring(response.url.lastIndexOf('/') + 1);
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
        let fileSymbol;
        switch (this.state.fileType) {
            //TODO: LICENSE FLATICONS
            case "application/pdf":
                fileSymbol =
                    <PdfIcon
                        className="EdiFileIcon"
                        onClick={this.downloadFile}
                    />;
                break;
            case "text/plain":
                fileSymbol =
                    <TxtIcon
                        className="EdiFileIcon"
                        onClick={this.downloadFile}
                    />;
                break;
            case "image/png":
                fileSymbol =
                    <PngIcon
                        className="EdiFileIcon"
                        onClick={this.downloadFile}
                    />;
                break;
            case "image/jpeg":
                fileSymbol =
                    <JpgIcon
                        className="EdiFileIcon"
                        onClick={this.downloadFile}
                    />;
                break;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                fileSymbol =
                    <DocxIcon
                        className="EdiFileIcon"
                        onClick={this.downloadFile}
                    />;
                break;
            default:
                fileSymbol =
                    <DefaultIcon
                        className="EdiFileIcon"
                        onClick={this.downloadFile}
                    />;
                break;
        }
        return (
            <div className="Attachment">
                {fileSymbol}
                {this.state.fileName}
            </div>
        );
    }
}

export default Attachment;