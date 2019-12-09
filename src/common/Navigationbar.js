import React, {Component} from 'react';
import "./Navigationbar.css"

import {ReactComponent as ArrowLeft} from "../resources/navbar/md-arrow-round-back.svg"
import {ReactComponent as ArrowRight} from "../resources/navbar/md-arrow-round-forward.svg"
import {ReactComponent as AddButton} from "../resources/navbar/md-add.svg"
import {ReactComponent as CreateUser} from "../resources/navbar/md-person-add.svg"
import {ReactComponent as CreateOrg} from "../resources/navbar/md-people.svg"
import {
    CREATE_ORGANIZATION_URL,
    EDICON_CREATE_URL,
    IS_ADMIN,
    IS_AUTHENTICATED,
    LOGIN_URL,
    REGISTRATION_URL
} from "../config/constants";
import i18n from "i18next";
import {Radio} from "antd";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: i18n.language
        };
    }

    render() {
        if (this.props.location.pathname === LOGIN_URL) {
            return null
        }

        let navbarItems = [];
        if (localStorage.getItem(IS_AUTHENTICATED) === 'true') {
            navbarItems.push(<ArrowLeft key="BackButton" className="NavigationButton"
                                        onClick={this.props.history.goBack}/>);
            navbarItems.push(<ArrowRight key="ForwardButton" className="NavigationButton"
                                         onClick={this.props.history.goForward}/>);
        }

        if ((localStorage.getItem(IS_ADMIN) === 'true')) {
            navbarItems.push(<AddButton key="EDICREATEBUTTON" className="NavigationButton"
                                        onClick={() => this.props.history.push(EDICON_CREATE_URL)}>
            </AddButton>);
            navbarItems.push(<CreateOrg key="ORGANIZATIONCREATEBUTTON" className="NavigationButton"
                                        onClick={() => this.props.history.push(CREATE_ORGANIZATION_URL)}/>);
            navbarItems.push(<CreateUser key="USERCREATEBUTTON" className="NavigationButton"
                                         onClick={() => this.props.history.push(REGISTRATION_URL)}/>);
        }

        const changeLanguage = (selectedLanguage) => {
            this.setState({language: selectedLanguage});
            i18n.changeLanguage(selectedLanguage);
            window.location.reload()
        };

        const changeLanguageToggle = (event, selectedLanguage) => {
            this.setState({language: selectedLanguage});
            i18n.changeLanguage(selectedLanguage);
            window.location.reload()
        };

        return (
            <div className="Navigationbar">
                <div className="NavigationItems">
                    {navbarItems}
                </div>
                <div className="LanguageChange">
                    <ToggleButtonGroup
                        value={this.state.language}
                        exclusive
                        size="small"

                        onChange={changeLanguageToggle}
                        aria-label="text alignment"
                        className="ToggleButtonGroup"
                    >
                        <ToggleButton value='de' aria-label="centered">
                            de
                        </ToggleButton>
                        <ToggleButton value='en' aria-label="centered">
                            en
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <Radio.Group className="ToggleButtonGroup" defaultValue={this.state.language}
                                 onChange={(event) => changeLanguage(event.target.value)}>
                        <Radio.Button value={'de'}>de</Radio.Button>
                        <Radio.Button value={'en'}>en</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
        );
    }
}

export default Navigationbar;