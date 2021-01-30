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
import {Box} from "@material-ui/core";
import QD_Logo from '../../resources/Logo_black.png'
import Button from "@material-ui/core/Button";

// import QD_Logo from '../../resources/login/qd_software_non_licensed.png'

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
                    <Button edge="start" className="NavigationButton" aria-label="menu"
                            onClick={() => this.props.history.push(EDICON_CREATE_URL)}
                            variant={"contained"}
                            color={"primary"}
                            startIcon={<CreateIcon/>}
                    >
                        Create Edi connection
                    </Button>
                </Tooltip>
            );
            navbarItemsUer.push(
                <Tooltip title="Create Organization" key="createOrgButton">
                    <Button edge="start" className="NavigationButton" color="primary" aria-label="menu"
                            onClick={() => this.props.history.push(CREATE_ORGANIZATION_URL)}
                            variant={"contained"}
                            startIcon={<GroupAddIcon/>}
                    >
                        Create Organization
                    </Button>
                </Tooltip>
            );
            navbarItemsUer.push(
                <Tooltip title="Create User" key="createUserButton">
                    <Button edge="start" className="NavigationButton" color="primary" aria-label="menu"
                            onClick={() => this.props.history.push(REGISTRATION_URL)}
                            variant={"contained"}
                            startIcon={<PersonAddIcon/>}
                    >
                        Create User
                    </Button>
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
            <AppBar className="Navigationbar" position="relative">
                <Toolbar className="Toolbar">

                    <Box display={"flex"} flexDirection={"row"} className="UserButtons">
                        {navbarItemsUer}
                    </Box>
                    <Link to="/" className='app-title'><img src={QD_Logo} alt={""}/></Link>
                    <Box display={"flex"} flexDirection={"row-reverse"} className="Navigation">
                        {navbarItemsControl}
                    </Box>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Navigationbar;