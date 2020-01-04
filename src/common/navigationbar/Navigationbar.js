import React, {Component} from 'react';
import "./Navigationbar.css"
import {
    BASE_URL,
    CREATE_ORGANIZATION_URL,
    EDICON_CREATE_URL,
    IS_ADMIN,
    IS_AUTHENTICATED,
    LOGIN_URL,
    REGISTRATION_URL
} from "../../config/constants";
import i18n from "i18next";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CreateIcon from '@material-ui/icons/Create';
import BarChartIcon from '@material-ui/icons/BarChart';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ControlDropdown from "./ControlDropdown";
import Typography from "@material-ui/core/Typography";

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: i18n.language,
        };
    }

    render() {
        if (this.props.location.pathname === LOGIN_URL) {
            return null
        }

        const changeLanguageToggle = (event, selectedLanguage) => {
            this.setState({language: selectedLanguage});
            i18n.changeLanguage(selectedLanguage);
            window.location.reload()
        };

        const navbarItemsUer = [];
        if ((localStorage.getItem(IS_ADMIN) === 'true')) {
            navbarItemsUer.push(
                <Tooltip title="Create Edi connection" key="createEdiButton">
                    <IconButton edge="start" className="NavigationButton" color="inherit" aria-label="menu"
                                onClick={() => this.props.history.push(EDICON_CREATE_URL)}>
                        <CreateIcon/>
                    </IconButton>
                </Tooltip>
            );
            navbarItemsUer.push(
                <Tooltip title="Create Organization" key="createOrgButton">
                    <IconButton edge="start" className="NavigationButton" color="inherit" aria-label="menu"
                                onClick={() => this.props.history.push(CREATE_ORGANIZATION_URL)}>
                        <GroupAddIcon/>
                    </IconButton>
                </Tooltip>
            );
            navbarItemsUer.push(
                <Tooltip title="Create User" key="createUserButton">
                    <IconButton edge="start" className="NavigationButton" color="inherit" aria-label="menu"
                                onClick={() => this.props.history.push(REGISTRATION_URL)}>
                        <PersonAddIcon/>
                    </IconButton>
                </Tooltip>
            );
        }


        const navbarItemsControl = [];
        navbarItemsControl.push(
            <ControlDropdown {...this.props} key="controlDropdown"/>
        );

        navbarItemsControl.push(
            <Tooltip title="Home" key="homeButton">
                <IconButton edge="start" className="NavigationButton" color="inherit" aria-label="menu"
                            onClick={() => this.props.history.push(BASE_URL)}>
                    <HomeIcon/>
                </IconButton>
            </Tooltip>
        );

        if (localStorage.getItem(IS_AUTHENTICATED) === 'true') {
            navbarItemsControl.push(
                <Tooltip title="Statistics" key="statisticsButton">
                    <IconButton edge="start" className="NavigationButton" color="inherit" aria-label="menu"
                                onClick={() => this.props.history.push("STATISTICS")}>
                        <BarChartIcon/>
                    </IconButton>
                </Tooltip>
            );
        }

        navbarItemsControl.push(
            <div className="LanguageChange" key="languageChange">
                <Tooltip title={"Language"}>
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
                </Tooltip>
            </div>
        );

        return (
            <div>
                <AppBar className="Navigationbar" position="relative">
                    <Toolbar className="Toolbar">
                        <div className="app-title">
                            {/*<img className={"HeaderLogo"} src={QDLogo}/>*/}
                            <Typography variant="h4"><Link to="/">QD Software Portal</Link></Typography>
                        </div>
                        <div className={"UserButtons"}>
                            {navbarItemsUer}
                        </div>
                        <div className="Navigation">
                            {navbarItemsControl}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navigationbar;