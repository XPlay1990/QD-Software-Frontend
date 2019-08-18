import React, {Component} from 'react';
import {convertToRaw} from 'draft-js';
import {editorStateFromRaw, MegadraftEditor} from 'megadraft';
// import Button from './Button/Button';
// import '../draftjs/MegaDraftTextEditor.css';
import 'megadraft/dist/css/megadraft.css';
import Divider from '@material-ui/core/Divider';


const intialState = editorStateFromRaw({
    "blocks": [
        {
            "key": "74jdl",
            "text": "asdgg",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        },
        {
            "key": "f6e8q",
            "text": "asdgfg",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        },
        {
            "key": "2om5f",
            "text": "asdggh",
            "type": "unstyled",
            "depth": 0,
            "inlineStyleRanges": [],
            "entityRanges": [],
            "data": {}
        }
    ],
    "entityMap": {}
});

class EdiMessageJS extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: intialState,
            isLoading: true,
        };
    }

    render() {
        return (
            <div className="EdiMessage">
                <MegadraftEditor
                    editorState={this.state.editorState}
                    // onChange={this.handleUpdate}
                    showSidebar={false}
                    // theme='white-thin'
                    // actions={actions}
                    // placeholder={"Type your message"}
                    readOnly={true}
                    // language={'de-DE'}
                />
                <Divider variant="middle" component={"MegadraftEditor"}/>
                {/*<Divider variant="inset"  />*/}
            </div>
        );
    }
}

export default EdiMessageJS;