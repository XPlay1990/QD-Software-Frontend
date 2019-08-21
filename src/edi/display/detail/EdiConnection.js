import React, {Component} from 'react';
import './EdiConnection.css';
import {getEdiConnection} from "../../../util/APIUtils";
import LoadingIndicator from "../../../common/LoadingIndicator";
import Description from "./description/Description";
import EdiMessageList from "./messages/EdiMessageList";
import {notification} from "antd";
import AttachmentDropZone from "./attachments/Attachments";
import {CURRENT_USER} from "../../../config/constants";
import {Role} from "../../../security/Roles";

class EdiConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ediConnection: null,
            isLoading: true
        };
        this.isAdmin = JSON.parse(localStorage.getItem(CURRENT_USER))["authorities"].includes(Role.Admin);
        this.id = props.match.params.id;
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
                        ediConnection: response.content,
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
        this.loadEdiConnection(this.id);
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
            this.loadEdiConnection(this.id);
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
                            <span>No Edi-Connection with Id {this.id} Found.</span>
                        </div>
                    ) : null
                }
                {
                    !this.state.isLoading && this.state.ediConnection != null ? (
                        <div className="ediContentGrid">
                            <Description
                                ediConnectionId={this.id}
                                status={this.state.ediConnection.status}
                                creationTime={this.state.ediConnection.creationTime}
                                updateTime={this.state.ediConnection.updateTime}
                                customerName={this.state.ediConnection.customer.name}
                                supplierName={this.state.ediConnection.supplier.name}
                                assignedDev={this.state.ediConnection.assignedDeveloper}
                            />

                            <div className="ediDetailedInformation">
                                <p>detailedInfos</p>
                            </div>

                            <EdiMessageList ediConnectionId={this.id}/>

                            <AttachmentDropZone/>
                        </div>) : null
                }
            </div>
        );
    }
}

export default EdiConnection;