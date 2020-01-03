import React from 'react';
import './App.css';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {
    BACKEND_BASE_URL,
    EDICON_CREATE_URL,
    EDICON_EXCEL_URL,
    EDICON_LIST_URL,
    FEEDBACK_URL,
    FORBIDDEN_URL,
    PDF_URL,
    REGISTRATION_ACTIVATE_URL,
    REGISTRATION_URL,
    STATISTICS_URL,
    SWITCH_USER_URL
} from '../config/constants';
import Signup from '../user/signup/Signup';
import EdiList from '../edi/display/EdiList';
import Profile from '../user/profile/Profile';
import NotFound from '../error/NotFound';
import RoleRestrictedRoute from '../security/RoleRestrictedRoute';
import EdiConnection from "../edi/display/detail/EdiConnection";
import Navigationbar from "../common/navigationbar/Navigationbar";
import EdiCreate from "../edi/create/EdiCreate";
import Forbidden from "../error/Forbidden";
import SwitchUser from "../admin_functions/SwitchUser";
import SupplierQuestions from "../edi/display/detail/supplierQuestions/SupplierQuestions";
import ActivateUserRegistration from "../user/signup/ActivateUserRegistration";
import {loadUserFunction} from "./UserFunctions"
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Trans} from "react-i18next";
import Statistics from "../statistics/Statistics";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import excelIcon from "../resources/fileIcons/excel.png"
import pdfIcon from "../resources/fileIcons/pdf.png"
import {customFileDownloadRequest} from "../security/authHeader/AuthorizationHeaderRequest";

class MainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            selectedTab: 'Edi' // possibleTabs[0]
        };
        this.loadCurrentUser = loadUserFunction.bind(this);
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

        // console.log("MAIN: ")
        // console.log(localStorage.getItem(CURRENT_USER))
        // console.log(localStorage.getItem(IS_AUTHENTICATED))
        // console.log(localStorage.getItem(IS_ADMIN))
        // console.log(localStorage.getItem(ACCESS_TOKEN))
        // console.log("MAIN: " + window.location.pathname)
        let tabBar = null;
        if (Array.from(this.moduleMap.values()).includes(this.props.location.pathname)) {
            // Check if correct tab is selected (might have been changed due to browser-back etc.
            if (this.state.selectedTab !== this.reverseModuleMap.get(this.props.location.pathname)) {
                this.setState({selectedTab: this.reverseModuleMap.get(this.props.location.pathname)});
            }

            tabBar =
                <Paper className="TabBar">
                    <Box className="TabsContainer">
                        <Tabs value={this.state.selectedTab} onChange={(event, newValue) => {
                            this.setState({selectedTab: newValue});
                            this.props.history.push(this.moduleMap.get(newValue))
                        }}>
                            <Tab value="Edi" label={<Trans i18nKey="tabs.Edi">Edi</Trans>}/>
                            {/*<div><Divider orientation="vertical"/></div>*/}
                            <Tab value="Statistics" label={<Trans i18nKey="tabs.Statistics">Statistics</Trans>}/>
                            {/*<div><Divider orientation="vertical"/></div>*/}
                            <Tab value="Feedback" label={<Trans i18nKey="tabs.Contact">Contact</Trans>}/>
                        </Tabs>
                    </Box>
                    <Box display="flex" flexDirection="row-reverse" className="CsvPdfDownloadContainer">
                        <Tooltip title="Download excel file" key="downloadXLSX">
                            <IconButton edge="start" className="NavigationButton" color="inherit" aria-label="menu"
                                        onClick={() => customFileDownloadRequest(`${BACKEND_BASE_URL}${EDICON_EXCEL_URL}`)}>
                                <img src={excelIcon} className={"excelDownloadIcon"} alt={"excel"}/>
                                {/*<div>Icons erstellt von <a href="https://www.flaticon.com/de/autoren/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a  href="https://www.flaticon.com/de/" title="Flaticon">www.flaticon.com</a></div>*/}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Download Pdf" key="downloadPdf">
                            <IconButton edge="start" className="NavigationButton" color="inherit" aria-label="menu"
                                        onClick={() => customFileDownloadRequest(`${BACKEND_BASE_URL}${PDF_URL}`)}>
                                <img src={pdfIcon} className={"excelDownloadIcon"} alt={"excel"}/>
                                {/*<div>Icons erstellt von <a href="https://www.flaticon.com/de/autoren/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/de/" title="Flaticon">www.flaticon.com</a></div>*/}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Paper>
        }

        return (
            <div className="app">
                <Navigationbar history={this.props.history} {...this.props}/>

                <Paper className="app-paper">
                    {tabBar}
                    <div className="app-content">
                        <Switch>
                            <Route exact path="/" render={() => (<Redirect to={EDICON_LIST_URL}/>)}/>
                            <Route path={REGISTRATION_ACTIVATE_URL}
                                   render={(props) => <ActivateUserRegistration {...props} />}/>
                            <Route path={REGISTRATION_URL} component={Signup}/>
                            <RoleRestrictedRoute exact path={EDICON_LIST_URL} component={EdiList}/>
                            <RoleRestrictedRoute exact path={EDICON_CREATE_URL} component={EdiCreate}/>
                            <Route path="/users/:username" render={(props) =>
                                <Profile {...props}  />}/>
                            <Route exact path={EDICON_LIST_URL + "/:id"} component={EdiConnection}/>
                            <Route path={EDICON_LIST_URL + "/:id/question/answer"} //ANSWER_URL
                                   component={SupplierQuestions}/>
                            <Route path={SWITCH_USER_URL} component={SwitchUser}/>
                            <Route path={STATISTICS_URL} component={Statistics}/>
                            <Route path={FORBIDDEN_URL} component={Forbidden}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default withRouter(MainApp);