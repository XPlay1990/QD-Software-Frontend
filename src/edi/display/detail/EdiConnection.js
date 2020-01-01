import React, {Component} from 'react';
import './EdiConnection.css';
import {getEdiConnection} from "../../../util/APIUtils";
import LoadingIndicator from "../../../common/LoadingIndicator";
import Description from "./description/Description";
import EdiMessageList from "./messages/EdiMessageList";
import {notification} from "antd";
import Button from '@material-ui/core/Button';
import {ANSWER_URL} from "../../../config/constants";
import AttachmentList from "./attachments/AttachmentList";
import {Link} from "react-router-dom";
import {Trans} from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

class EdiConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ediConnection: null,
            isLoading: true
        };
        this.ediConnectionId = props.match.params.id;
        this.loadEdiConnection = this.loadEdiConnection.bind(this);
    }

    loadEdiConnection(id) {
        let promise = getEdiConnection(id);
        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        ediConnection: response,
                        isLoading: false
                    })
                }
            }).catch(error => {
            this.setState({
                ediConnection: null,
                isLoading: false
            });
            notification.error({
                message: 'EdiConnection-Portal',
                description: error.message,
            });
        });
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadEdiConnection(this.ediConnectionId);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate = nextProps => {
    };

    render() {
        return (
            <div className="ediContent">
                {
                    this.state.isLoading ?
                        <LoadingIndicator/> : null
                }
                {
                    !this.state.isLoading && this.state.ediConnection === null ? (
                        <div className="noEdiConnectionsFound">
                            <span>No Edi-Connection with Id {this.ediConnectionId} Found.</span>
                        </div>
                    ) : null
                }
                {
                    !this.state.isLoading && this.state.ediConnection != null ? (
                        <Grid container spacing={10} className="ediContentGrid">
                            <Grid item xs={6} container spacing={3} direction="column">
                                {/*<Grid item>*/}

                                {/*</Grid>*/}

                                {/*<Grid item className="ediQuestions">*/}

                                {/*</Grid>*/}
                                {/*<Grid item>*/}
                                {/*</Grid>*/}

                                <Box display="flex" flexDirection="column" className="EdiInformations">
                                    <Box className="ediDescription">
                                        <Description
                                            ediConnectionId={this.ediConnectionId}
                                            status={this.state.ediConnection.status}
                                            creationTime={this.state.ediConnection.creationTime}
                                            updateTime={this.state.ediConnection.updateTime}
                                            customerName={this.state.ediConnection.customer.name}
                                            supplierName={this.state.ediConnection.supplier.name}
                                            assignedDev={this.state.ediConnection.assignedDeveloper}
                                        />
                                    </Box>
                                    <Divider variant="middle" className="EdiDivider"/>
                                    <Box className="ediQuestions">
                                        <Link to={ANSWER_URL(this.ediConnectionId)}>
                                            <Button variant="contained" color="primary" className="To_Questions"
                                                    size="medium">
                                                <Trans i18nKey="ediConnection.toQuestions">To Questions</Trans>
                                            </Button>
                                        </Link>
                                    </Box>
                                    <Divider variant="middle" className="EdiDivider"/>
                                    <Box className="EdiAttachments">
                                        <AttachmentList ediConnectionId={this.ediConnectionId}/>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={6} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <EdiMessageList ediConnectionId={this.ediConnectionId}/>
                                </Grid>
                            </Grid>
                        </Grid>) : null
                }
            </div>
        );
    }
}

export default EdiConnection;