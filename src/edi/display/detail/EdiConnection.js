import React, {Component} from 'react';
import './EdiConnection.css';
import {getEdiConnection} from "../../../util/APIUtils";
import LoadingIndicator from "../../../common/LoadingIndicator";
import Description from "./description/Description";
import EdiMessageList from "./messages/EdiMessageList";
import {Button, notification} from "antd";
import {ANSWER_URL, CURRENT_USER} from "../../../config/constants";
import {Role} from "../../../security/Roles";
import AttachmentList from "./attachments/AttachmentList";
import {Link} from "react-router-dom";

class EdiConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ediConnection: null,
            isLoading: true
        };
        this.isAdmin = JSON.parse(localStorage.getItem(CURRENT_USER))["authorities"].includes(Role.Admin);
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
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                ediConnection: null,
                isLoading: true
            });
            this.loadEdiConnection(this.ediConnectionId);
        }
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
                        <div className="ediContentGrid">
                            <Description
                                ediConnectionId={this.ediConnectionId}
                                status={this.state.ediConnection.status}
                                creationTime={this.state.ediConnection.creationTime}
                                updateTime={this.state.ediConnection.updateTime}
                                customerName={this.state.ediConnection.customer.name}
                                supplierName={this.state.ediConnection.supplier.name}
                                assignedDev={this.state.ediConnection.assignedDeveloper}
                            />

                            <div className="ediDetailedInformation">
                                <Link to={ANSWER_URL(this.ediConnectionId)}><Button className="To_Questions" type="primary" size="large">To Questions</Button></Link>
                            </div>

                            <EdiMessageList ediConnectionId={this.ediConnectionId}/>

                            <AttachmentList ediConnectionId={this.ediConnectionId}/>
                        </div>) : null
                }
            </div>
        );
    }
}

export default EdiConnection;