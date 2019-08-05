import React, {Component} from 'react';
import {getEdiConnections} from '../../util/APIUtils';
import {withRouter} from 'react-router-dom';
import './EdiList.css';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {columnConfig} from "./ColumnConfig";
import LoadingIndicator from "../../common/LoadingIndicator";
import {EDI_LIST_SIZE} from "../../config/constants";

class EdiList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ediConnections: [],
            pageNumber: 0,
            pageSize: EDI_LIST_SIZE,
            totalElements: 0,
            totalPages: 0,
            isLast: true,
            isLoading: true,
            pageSorting: [],
            additiveSorting: false
        };
        this.loadEdiList = this.loadEdiList.bind(this);
        this.updateTablePage = this.updateTablePage.bind(this);
        this.updateTablePageSize = this.updateTablePageSize.bind(this);
        this.updateTableSorting = this.updateTableSorting.bind(this);
    }

    loadEdiList() {
        let promise = getEdiConnections(this.state.pageNumber, this.state.pageSize, this.state.pageSorting, this.state.additiveSorting);
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
                        ediConnections: response.content,
                        pageNumber: response.pageNumber,
                        pageSize: response.pageSize,
                        totalElements: response.totalElements,
                        totalPages: response.totalPages,
                        isLast: response.isLast,
                        isLoading: false
                    })
                }
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
    }

    updateTablePage(pageIndex) {
        this.setState({
                pageNumber: pageIndex
            },
            this.loadEdiList
        );
    }

    updateTablePageSize(pageSize) {
        this.setState({
                pageSize: pageSize,
                pageNumber: 0
            },
            this.loadEdiList
        )
        ;
    }

    updateTableSorting(newSorted, column, additive) {
        this.setState({
                pageSorting: newSorted,
                additiveSorting: additive
            },
            this.loadEdiList
        );
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadEdiList();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate = nextProps => {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                ediConnections: [],
                pageNumber: 0,
                pageSize: 15,
                totalElements: 0,
                totalPages: 0,
                isLast: true,
                currentVotes: [],
                isLoading: true
            });
            this.loadEdiList();
        }
    };

    render() {
        return (
            <div className="ediConnectionsContainer">
                {
                    this.state.isLoading ?
                        <LoadingIndicator/> : null
                }
                {
                    !this.state.isLoading && this.state.ediConnections.length === 0 ? (
                        <div className="noEdiConnectionsFound">
                            <span>No Edi-Connections Found.</span>
                        </div>
                    ) : null
                }
                {
                    !this.state.isLoading && this.state.ediConnections.length > 0 ? (
                        <div className="ediConnectionsTable">
                            <ReactTable
                                manual
                                minRows={0}
                                pageSizeOptions={[5, 10, 15, 20]}
                                pageSize={this.state.pageSize}
                                data={this.state.ediConnections}
                                columns={columnConfig}
                                page={this.state.pageNumber}
                                pages={this.state.totalPages}
                                showPagination={true}
                                showPageSizeOptions={true}
                                showPageJump={true}
                                onPageChange={(pageIndex) => {
                                    this.updateTablePage(pageIndex)
                                }}
                                onSortedChange={(newSorted, column, additive) => {
                                    this.updateTableSorting(newSorted, column, additive)
                                }}
                                onPageSizeChange={(pageSize) => {
                                    this.updateTablePageSize(pageSize)
                                }}
                                noDataText={'No rows found'}
                                // NoDataComponent={NoDataComponent}
                            />
                            <Tips/>
                        </div>
                    ) : null

                }
            </div>
        );
    }
}

export const Tips = () =>
    <div style={{textAlign: "center"}}>
        <em>Tip: Hold shift when sorting to multi-sort!</em>
    </div>;

export default withRouter(EdiList);