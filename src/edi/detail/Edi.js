import React, {Component} from 'react';
import './Edi.css';
import {getEdiConnection} from "../../util/APIUtils";
import LoadingIndicator from "../../common/LoadingIndicator";

class Edi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ediConnection: null,
            isLoading: true
        };
        this.id = props.computedMatch.params.id;
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
                console.log(response);

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
            console.log("update")
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
                    !this.state.isLoading ? (
                        <div className="ediContentGrid">
                            <div className="ediTitle">
                                <p>title</p>
                            </div>
                            <div className="ediDescription">
                                {this.state.ediConnection.status}
                                {this.state.ediConnection.creationTime}
                                {this.state.ediConnection.updateTime}
                                {this.state.ediConnection.customer.name}
                                {this.state.ediConnection.supplier.name}
                            </div>

                            <div className="ediDetailedInformation">
                                <p>detailedInfos</p>
                            </div>

                            <div className="ediMessages">
                                <p>{this.ediConnection}</p>
                                <p>messages</p>
                            </div>

                            <div className="ediAttachments">

                            </div>
                        </div>) : null
                }
            </div>
        );
    }
}

export default Edi;