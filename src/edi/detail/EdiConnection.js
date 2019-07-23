import React, {Component} from 'react';
import './EdiConnection.css';
import {getEdiConnection} from "../../util/APIUtils";
import LoadingIndicator from "../../common/LoadingIndicator";
import Description from "./description/Description";
import EdiMessageList from "./messages/EdiMessageList";

class EdiConnection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ediConnection: null,
            isLoading: true
        };
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
            console.log(error);
            this.setState({
                ediConnection: null,
                isLoading: false
            })
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

                            <div className="ediAttachments">
                                <p>Attachments</p>
                            </div>
                        </div>) : null
                }
            </div>
        );
    }
}

export default EdiConnection;