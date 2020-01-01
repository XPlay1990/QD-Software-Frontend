import React, {Component} from 'react';
import "./Navigationbar.css"
import {
    BASE_URL,
    CREATE_ORGANIZATION_URL,
    EDICON_CREATE_URL,
    EDICON_LIST_URL,
    FEEDBACK_URL,
    IS_ADMIN,
    IS_AUTHENTICATED,
    LOGIN_URL,
    REGISTRATION_URL,
    STATISTICS_URL
} from "../../config/constants";
import i18n from "i18next";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Trans} from "react-i18next";

class Navigationbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: i18n.language,
            selectedTab: 'Edi' // possibleTabs[0]
        };

        this.moduleMap = new Map();
        this.moduleMap.set("Edi", EDICON_LIST_URL);
        this.moduleMap.set("Statistics", STATISTICS_URL);
        this.moduleMap.set("Feedback", FEEDBACK_URL);

        this.reverseModuleMap = new Map();
        this.moduleMap.forEach((value, key, map) =>
            this.reverseModuleMap.set(value, key)
        )
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

        let navbarItemsBackForward = [];
        if (localStorage.getItem(IS_AUTHENTICATED) === 'true') {
            if (this.props.location.pathname === BASE_URL || this.props.location.pathname === EDICON_LIST_URL) {
                navbarItemsBackForward.push(
                    <IconButton key="backButton" edge="start" className="NavigationButton" color="inherit"
                                aria-label="menu"
                                onClick={this.props.history.goBack} disabled={true}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                );
            } else {
                navbarItemsBackForward.push(
                    <Tooltip title="Back" key="backButton">
                        <IconButton edge="start" className="NavigationButton" color="inherit" aria-label="menu"
                                    onClick={this.props.history.goBack}>
                            <ArrowBackIosIcon/>
                        </IconButton>
                    </Tooltip>
                );
            }

        }

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

        const tabs = [];
        if (Array.from(this.moduleMap.values()).includes(this.props.location.pathname)) {
            // Check if correct tab is selected (might have been changed due to browser-back etc.
            if (this.state.selectedTab !== this.reverseModuleMap.get(this.props.location.pathname)) {
                this.setState({selectedTab: this.reverseModuleMap.get(this.props.location.pathname)});
            }

            tabs.push(<Tabs value={this.state.selectedTab} onChange={(event, newValue) => {
                this.setState({selectedTab: newValue});
                this.props.history.push(this.moduleMap.get(newValue))
            }}>
                <Tab value="Edi" label={<Trans i18nKey="tabs.Edi">Edi</Trans>}/>
                <Tab value="Statistics" label={<Trans i18nKey="tabs.Statistics">Statistics</Trans>}/>
                <Tab value="Feedback" label={<Trans i18nKey="tabs.Feedback">Feedback</Trans>}/>
            </Tabs>)
        }

        return (
            <div>
                <AppBar className="Navigationbar" position="static">
                    <Toolbar className="Toolbar">
                        <div className="app-title">
                            {/*<img className={"HeaderLogo"} src={QDLogo}/>*/}
                            <Typography variant="h4"><Link to="/">QD Software Portal</Link></Typography>
                        </div>
                        <div className="BackForwardNav">
                            {navbarItemsBackForward}
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