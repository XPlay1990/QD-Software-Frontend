import React, {Component} from 'react';
import "./Navigationbar.css"

import {ReactComponent as ArrowLeft} from "../resources/navbar/md-arrow-round-back.svg"
import {ReactComponent as ArrowRight} from "../resources/navbar/md-arrow-round-forward.svg"
import {ReactComponent as AddButton} from "../resources/navbar/md-add.svg"
import {ReactComponent as CreateUser} from "../resources/navbar/md-person-add.svg"
import {ReactComponent as CreateOrg} from "../resources/navbar/md-people.svg"
import {CREATE_ORGANIZATION_URL, CREATE_USER_URL, EDICON_CREATE_URL} from "../config/constants";

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: props.isAdmin
        };
    }

    render() {
        if (!this.props.isAuthenticated) {
            return null
        }

        let navbarItems = [];
        navbarItems.push(<ArrowLeft key="BackButton" className="NavigationButton"
                                    onClick={this.props.history.goBack}/>);
        navbarItems.push(<ArrowRight key="ForwardButton" className="NavigationButton"
                                     onClick={this.props.history.goForward}/>);


        // navbarItems.push(<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        //     <ArrowRight key="ForwardButton" className="NavigationButton"
        //                 onClick={this.props.history.goForward}/>
        //     <text x="20" y="35" className="small">forward</text>
        // </svg>);

        if (this.state.isAdmin) {
            navbarItems.push(<AddButton key="EDICREATEBUTTON" className="NavigationButton"
                                        onClick={() => this.props.history.push(EDICON_CREATE_URL)}>
               </AddButton>);
            navbarItems.push(<CreateUser key="USERCREATEBUTTON" className="NavigationButton"
                                         onClick={() => this.props.history.push(CREATE_USER_URL)}/>);
            navbarItems.push(<CreateOrg key="ORGANIZATIONCREATEBUTTON" className="NavigationButton"
                                        onClick={() => this.props.history.push(CREATE_ORGANIZATION_URL)}/>);
        }

        return (
            <div className="Navigationbar">
                {navbarItems}
            </div>
        );
    }
}

export default Navigationbar;