import React, {Component} from 'react';
import "./Attachment.css"
import {ReactComponent as PdfIcon} from "../../../../resources/fileIcons/pdf.svg"
import {ReactComponent as TxtIcon} from "../../../../resources/fileIcons/txt.svg"
import {ReactComponent as PngIcon} from "../../../../resources/fileIcons/png.svg"
import {ReactComponent as JpgIcon} from "../../../../resources/fileIcons/jpg.svg"
import {ReactComponent as DocxIcon} from "../../../../resources/fileIcons/docx.svg"
import {ReactComponent as DefaultIcon} from "../../../../resources/fileIcons/clip.svg"

// import Divider from '@material-ui/core/Divider';


class Attachment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: props.fileName,
            fileSize: props.fileSize,
            fileType: props.fileType,
        };
    }

    render() {
        let fileSymbol;
        switch (this.state.fileType) {
            //TODO: LICENSE FLATICONS
            case "application/pdf":
                fileSymbol =
                    <PdfIcon
                        className="EdiFileIcon"
                    />;
                break;
            case "text/plain":
                fileSymbol =
                    <TxtIcon
                        className="EdiFileIcon"
                    />;
                break;
            case "image/png":
                fileSymbol =
                    <PngIcon
                        className="EdiFileIcon"
                    />;
                break;
            case "image/jpeg":
                fileSymbol =
                    <JpgIcon
                        className="EdiFileIcon"
                    />;
                break;
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                fileSymbol =
                    <DocxIcon
                        className="EdiFileIcon"
                    />;
                break;
            default:
                fileSymbol =
                    <DefaultIcon
                        className="EdiFileIcon"
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