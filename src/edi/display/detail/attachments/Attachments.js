import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {storeAttachments} from "../../../../util/APIUtils";
import {notification} from "antd";

function AttachmentDropZone(ediConnectionId) {
    const onDrop = useCallback(acceptedFiles => {
        const reader = new FileReader();

        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
            // Do whatever you want with the file contents
            const binaryStr = reader.result;
            console.log(binaryStr)
        };
        let promise = storeAttachments(ediConnectionId, acceptedFiles);
        if (!promise) {
            return;
        }
        console.log("file upload")

        promise
            .then(response => {
                notification.success({
                    message: 'EdiConnection-Portal',
                    description: response.message,
                });
            }).catch(error => {
                console.log(error)
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message,
            });
        });

        acceptedFiles.forEach(file => reader.readAsBinaryString(file))
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div className="ediAttachments" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
    )
}

export default AttachmentDropZone