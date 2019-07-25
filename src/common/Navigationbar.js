import React, {Component} from 'react';
import "./Navigationbar.css"

import {ReactComponent as ArrowLeft} from "../resources/navbar/md-arrow-round-back.svg"
import {ReactComponent as ArrowRight} from "../resources/navbar/md-arrow-round-forward.svg"
import {ReactComponent as AddButton} from "../resources/navbar/md-add.svg"
import {EDICON_CREATE_URL} from "../config/constants";

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: props.isAdmin,
        };
    }

    render() {
        if (!this.props.isAuthenticated) {
            return null
        }

        let navbarItems = [];
        navbarItems.push(<ArrowLeft key="BackButton" className="NavigationButton" onClick={this.props.history.goBack}/>);
        navbarItems.push(<ArrowRight key="ForwardButton" className="NavigationButton"
                                     onClick={this.props.history.goForward}/>);

        if (this.state.isAdmin) {
            navbarItems.push(<AddButton key="EDICREATEBUTTON" className="NavigationButton"
                                        onClick={() => this.props.history.push(EDICON_CREATE_URL)}/>);
        }

        return (
            <div className="Navigationbar">
                {navbarItems}
            </div>
        );
    }
}

export default Navigationbar;