import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './MyEditor.css'

export default class MyEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
    }

    _onClick = (e) => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, e.target.name));
    };

    render() {
        const styles = ['BOLD', 'ITALIC', 'UNDERLINE', 'CODE'];
        const buttons = styles.map(style => {
            return <button key={style} onClick={this._onClick} name={style}>{style}</button>
        });
        return (
            <div className="TextEditor">
                <div className='toolbar'>
                    {buttons}
                </div>
                <Editor editorState={this.state.editorState} onChange={this.onChange}/>
            </div>
        );
    }
}