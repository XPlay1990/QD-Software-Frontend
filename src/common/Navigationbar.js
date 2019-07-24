import React, {Component} from 'react';
import "./Navigationbar.css"
import {ReactComponent as BackArrow} from "../resources/navbar/md-arrow-round-back.svg";

class Navigationbar extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            return null
        }

        return (
            <div className="Navigationbar">
                <BackArrow className="BackArrow"/>
                <button
                    className="button icon-right"
                    onClick={this.props.history.goForward}>
                    Forward
                </button>
            </div>
        );
    }
}

export default Navigationbar;