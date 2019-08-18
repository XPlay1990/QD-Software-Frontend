import React, {Component} from 'react';
import {convertFromRaw, convertToRaw, EditorState} from 'draft-js';
import {editorStateFromRaw, editorStateToJSON, MegadraftEditor} from 'megadraft';
import Button from './Button/Button';
import './MegaDraftTextEditor.css';
import 'megadraft/dist/css/megadraft.css';
import icons from 'megadraft/lib/icons/';

const intialState = editorStateFromRaw(null);

class MegaDraftTextEditor extends Component {
    state = {
        editorState: intialState,
        raw: convertToRaw(intialState.getCurrentContent()),
        paste: false,
    };

    handleUpdate = (editorState) => {
        this.setState({
            editorState,
            raw: convertToRaw(editorState.getCurrentContent()),
            paste: false,
        });
    };

    onSaveClick = () => {
        const {editorState} = this.state;
        const content = editorStateToJSON(editorState);
        // Your function to save the content
        // save_my_content(content);
        console.log(content);
    };

    render() {
        const actions = [
            {type: "inline", label: "B", style: "BOLD", icon: icons.BoldIcon},
            {type: "inline", label: "I", style: "ITALIC", icon: icons.ItalicIcon},
            // these actions correspond with the entityInputs above
            {type: "entity", label: "Link", style: "link", entity: "LINK", icon: icons.LinkIcon},
            {type: "separator"},
            {type: "block", label: "UL", style: "unordered-list-item", icon: icons.ULIcon},
            {type: "block", label: "OL", style: "ordered-list-item", icon: icons.OLIcon},
            {type: "block", label: "H2", style: "header-two", icon: icons.H2Icon},
            {type: "block", label: "QT", style: "blockquote", icon: icons.BlockQuoteIcon}
        ];
        const {raw, editorState, paste} = this.state;
        return (
            <div className="MessageEditor">
                <div className="EditorLabel">editor</div>
                <MegadraftEditor
                    editorState={editorState}
                    onChange={this.handleUpdate}
                    showSidebar={false}
                    // theme='white-thin'
                    actions={actions}
                    placeholder={"Type your message"}
                    // readOnly={true}
                    // language={'de-DE'}
                />
                <Button className="SendButton" label="Send" handleClick={this.onSaveClick}/>
            </div>
        );
    }
}

export default MegaDraftTextEditor;