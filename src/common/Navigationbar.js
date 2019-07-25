import React, {Component} from 'react';
import "./Navigationbar.css"

import {ReactComponent as ArrowLeft} from "../resources/navbar/md-arrow-round-back.svg"
import {ReactComponent as ArrowRight} from "../resources/navbar/md-arrow-round-forward.svg"
import {ReactComponent as AddButton} from "../resources/navbar/md-add.svg"

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
        navbarItems.push(<ArrowLeft className="NavigationButton" onClick={this.props.history.goBack}/>);
        navbarItems.push(<ArrowRight className="NavigationButton" onClick={this.props.history.goForward}/>);

        if (this.state.isAdmin) {
            navbarItems.push(<AddButton className="NavigationButton" onClick={this.props.history.goForward}/>);
        }


        return (
            <div className="Navigationbar">
                {navbarItems}
            </div>
        );
    }
}

export default Navigationbar;