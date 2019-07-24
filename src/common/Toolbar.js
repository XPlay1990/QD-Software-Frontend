import React, {Component} from 'react';
import { Button, ButtonGroup, SplitButton, SplitButtonItem, DropDownButton, DropDownButtonItem, Toolbar, ToolbarItem, ToolbarSeparator } from '@progress/kendo-react-buttons'

import "./Toolbar.css"

class ToolbarContainer extends Component {
    render() {
        return (
            <Toolbar>
                <ToolbarItem>
                    <ButtonGroup>
                        <Button icon="bold" title="Bold" togglable={true} />
                        <Button icon="italic" title="Italic" togglable={true} />
                        <Button icon="underline" title="Underline" togglable={true} />
                    </ButtonGroup>
                </ToolbarItem>
                <ToolbarItem>
                    <ButtonGroup>
                        <Button icon="align-left" title="Align Left" togglable={true} />
                        <Button icon="align-center" title="Align Center" togglable={true} />
                        <Button icon="align-right" title="Align Right" togglable={true} />
                        <Button icon="align-justify" title="Align Justify" togglable={true} />
                    </ButtonGroup>
                </ToolbarItem>
                <ToolbarItem>
                    <SplitButton text="Insert">
                        <SplitButtonItem icon="image" text="Image" />
                        <SplitButtonItem icon="table" text="Table" />
                    </SplitButton>
                </ToolbarItem>
                <ToolbarSeparator />
                <ToolbarItem>
                    <Button icon="cut" title="Cut">Cut</Button>
                </ToolbarItem>
                <ToolbarItem>
                    <Button icon="copy" title="Copy">Copy</Button>
                </ToolbarItem>
                <ToolbarItem>
                    <DropDownButton text="Paste" icon="paste">
                        <DropDownButtonItem icon="text" text="Plain Text" />
                        <DropDownButtonItem icon="html" text="HTML" />
                    </DropDownButton>
                </ToolbarItem>
            </Toolbar>
        );
    }
}

export default ToolbarContainer;