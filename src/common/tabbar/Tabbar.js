import React, {Component} from 'react';
import "./Tabbar.css"
import {
    BACKEND_BASE_URL,
    BASE_URL,
    CONTACT_URL,
    EDICON_DETAILS_URL,
    EDICON_EXCEL_URL,
    EDICON_LIST_URL,
    IS_AUTHENTICATED,
    PDF_URL,
    STATISTICS_URL
} from "../../config/constants";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Tooltip from "@material-ui/core/Tooltip";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {Trans} from "react-i18next";
import Box from "@material-ui/core/Box";
import {customFileDownloadRequest} from "../../security/authHeader/AuthorizationHeaderRequest";
import excelIcon from "../../resources/fileIcons/excel.png";
import pdfIcon from "../../resources/fileIcons/pdf.png";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import './Tabbar.css'

class Tabbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: null // possibleTabs[0]
        };

        this.moduleMap = new Map();
        this.moduleMap.set("Edi", EDICON_LIST_URL);
        this.moduleMap.set("Statistics", STATISTICS_URL);
        this.moduleMap.set("ContactMe", CONTACT_URL);

        this.reverseModuleMap = new Map();
        this.moduleMap.forEach((value, key, map) =>
            this.reverseModuleMap.set(value, key)
        );

        this.moduleTabs = [];
        this.moduleMap.forEach((url, moduleName) => {
            this.moduleTabs.push(<Tab key={moduleName} value={moduleName}
                                      label={<Trans i18nKey={`tabs.${moduleName}`}/>}/>)
        });

        this.ediConnectionTabNames = ['overview', 'question/answer', 'attachments'];
        this.ediConnectionTabs = [];
        this.ediConnectionTabNames.forEach(tabName => {
            this.ediConnectionTabs.push(<Tab key={tabName} value={tabName}
                                             label={<Trans i18nKey={`tabs.ediconnection.${tabName}`}/>}/>)
        });
    }

    buildBackButton() {
        if (localStorage.getItem(IS_AUTHENTICATED) === 'true') {
            if (this.props.location.pathname === BASE_URL || this.props.location.pathname === EDICON_LIST_URL) {
                return (
                    <IconButton key="backButton" className="NavigationButton" color="inherit"
                                aria-label="menu"
                                onClick={this.props.history.goBack} disabled={true}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                );
            } else {
                return (
                    <Tooltip title="Back" key="backButton">
                        <IconButton className="NavigationButton" color="inherit" aria-label="menu"
                            // onClick={this.props.history.goBack}
                                    onClick={() => this.props.history.push(BASE_URL)}
                        >
                            <ArrowBackIosIcon/>
                        </IconButton>
                    </Tooltip>
                );
            }
        }
    }

    buildTabs() {
        this.setSelectedTab();

        if (this.reverseModuleMap.has(this.props.location.pathname)) {
            return (
                <Tabs className="TabsContainer" value={this.state.selectedTab} onChange={(event, newValue) => {
                    this.setState({selectedTab: newValue});
                    this.props.history.push(this.moduleMap.get(newValue))
                }}>
                    {this.moduleTabs}
                </Tabs>
            )
        } else if (new RegExp(`${EDICON_LIST_URL}/*/*`).test(this.props.location.pathname)) {
            let ediConnectionId = this.props.location.pathname.split("/")[2];

            return (
                <Tabs className="TabsContainer" value={this.state.selectedTab} onChange={(event, newValue) => {
                    this.setState({selectedTab: newValue});
                    this.props.history.push(`${EDICON_DETAILS_URL(ediConnectionId)}/${newValue}`)
                }}>
                    {this.ediConnectionTabs}
                </Tabs>
            )
        }
    }

    setSelectedTab() {
        // Check if correct tab is selected (might have been changed due to browser-back etc.
        if (this.reverseModuleMap.has(this.props.location.pathname)) {
            if (this.state.selectedTab !== this.reverseModuleMap.get(this.props.location.pathname)) {
                this.setState({selectedTab: this.reverseModuleMap.get(this.props.location.pathname)});
            }
        } else if (new RegExp(`${EDICON_LIST_URL}/*/*`).test(this.props.location.pathname)) {
            this.ediConnectionTabNames.forEach(tabName => {
                    if (this.props.location.pathname.endsWith(tabName)) {
                        if (this.state.selectedTab !== tabName) {
                            this.setState({selectedTab: tabName})
                        }
                    }
                }
            )
        }
    }

    buildDownloadOptions() {
        if (this.reverseModuleMap.has(this.props.location.pathname)) {
            return <Box display="flex" flexDirection="row" className="CsvPdfDownloadContainer">
                <Tooltip title="Download excel file" key="downloadXLSX">
                    <IconButton edge="start" className="NavigationButton" color="inherit" aria-label="menu"
                                onClick={() => customFileDownloadRequest(`${BACKEND_BASE_URL}${EDICON_EXCEL_URL}`)}>
                        <img src={excelIcon} className="excelDownloadIcon" alt={"excel"}/>
                        <div className="invisible">Icons erstellt von <a
                            href="https://www.flaticon.com/de/autoren/pixel-perfect" title="Pixel perfect">Pixel
                            perfect</a> from <a href="https://www.flaticon.com/de/"
                                                title="Flaticon">www.flaticon.com</a></div>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Download Pdf" key="downloadPdf">
                    <IconButton edge="start" className="NavigationButton" color="inherit" aria-label="menu"
                                onClick={() => customFileDownloadRequest(`${BACKEND_BASE_URL}${PDF_URL}`)}>
                        <img src={pdfIcon} className={"excelDownloadIcon"} alt={"excel"}/>
                        <div className="invisible">Icons erstellt von <a
                            href="https://www.flaticon.com/de/autoren/smashicons"
                            title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/de/"
                                                                      title="Flaticon">www.flaticon.com</a></div>
                    </IconButton>
                </Tooltip>
            </Box>
        }
    }

    render() {
        return (
            <Paper className="TabBar">
                {this.buildBackButton()}
                {this.buildTabs()}
                <Box><Divider orientation="vertical" variant="middle"/></Box>
                {this.buildDownloadOptions()}
            </Paper>
        );
    }
}

export default Tabbar;