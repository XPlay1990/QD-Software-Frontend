import React from "react"
import {DraftailEditor, BLOCK_TYPE, INLINE_STYLE} from "draftail"
import "draft-js/dist/Draft.css"
import "draftail/dist/draftail.css"
// const initial = JSON.parse(sessionStorage.getItem("draftail:content"));


export default class MyDraftailEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: null
        };
        // this.onSave = (editorState) => this.setState({editorState});
    }

    onSave = (editorState) => {
        console.log("saving", editorState);
        // sessionStorage.setItem("draftail:content", JSON.stringify(editorState))
    };


    render() {
        return (
            <DraftailEditor
                rawContentState={this.state.editorState || null}
                onSave={this.onSave}
                blockTypes={[
                    {type: BLOCK_TYPE.HEADER_THREE},
                    {type: BLOCK_TYPE.UNORDERED_LIST_ITEM},
                    {type: BLOCK_TYPE.UNORDERED_LIST_ITEM},
                ]}
                inlineStyles={[
                    {type: INLINE_STYLE.BOLD},
                    {type: INLINE_STYLE.ITALIC},
                    {type: INLINE_STYLE.CODE},
                    {type: INLINE_STYLE.QUOTATION},
                    {type: INLINE_STYLE.SUBSCRIPT},
                    {type: INLINE_STYLE.UNDERLINE}
                ]}
                
            />
        );
    }
}

// ReactDOM.render(editor, document.querySelector("[data-mount]"))
