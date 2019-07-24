import React, {Component} from 'react';
import "./Navigationbar.css"

class Navigationbar extends Component {
    render() {
        if (!this.props.isAuthenticated) {
            return null
        }

        return (
            <div className="Navigationbar">
                <button className="NavigationButton icon-arrow-left" onClick={this.props.history.goBack}>Return</button>
                <button className="NavigationButton icon-arrow-right" onClick={this.props.history.goForward}>Forward</button>
            </div>
        );
    }
}

export default Navigationbar;