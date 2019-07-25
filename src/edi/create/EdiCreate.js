import React, {Component} from 'react';
import {getEdiConnections} from '../../util/APIUtils';
import {EDI_LIST_SIZE} from '../../config/constants';
import {withRouter} from 'react-router-dom';
import './EdiCreate.css';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import LoadingIndicator from "../../common/LoadingIndicator";

class EdiCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
        this.loadEdiList = this.loadEdiList.bind(this);
    }

    loadEdiList(page = 0, size = EDI_LIST_SIZE) {
        // let promise = getEdiConnections(page, size);
        // if (!promise) {
        //     return;
        // }
        //
        // this.setState({
        //     isLoading: true
        // });
        //
        // promise
        //     .then(response => {
        //         if (this._isMounted) {
        //             this.setState({
        //                 totalElements: response.totalElements,
        //                 totalPages: response.totalPages,
        //                 isLast: response.isLast,
        //                 isLoading: false
        //             })
        //         }
        //     }).catch(error => {
        //     this.setState({
        //         isLoading: false
        //     })
        // });

    }

    componentDidMount() {
        this._isMounted = true;
        this.loadEdiList();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate = nextProps => {
            // Reset State
            // this.setState({
            // });
            // this.loadEdiList();
    };

    render() {
        return (
            <div className="ediConnectionsContainer">
                {
                    this.state.isLoading ?
                        <LoadingIndicator/> : null
                }
                {/*{*/}
                {/*    !this.state.isLoading && this.state.ediConnections.length === 0 ? (*/}
                {/*        <div className="noEdiConnectionsFound">*/}
                {/*            <span>No Edi-Connections Found.</span>*/}
                {/*        </div>*/}
                {/*    ) : null*/}
                {/*}*/}
                {/*{*/}
                {/*    !this.state.isLoading && this.state.ediConnections.length > 0 ? (*/}
                {/*        <div className="ediConnectionsTable">*/}


                {/*        </div>*/}
                {/*    ) : null*/}

                {/*}*/}

            </div>
        );
    }
}

export default withRouter(EdiCreate);