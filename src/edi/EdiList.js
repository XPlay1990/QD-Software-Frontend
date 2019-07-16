import React, {Component} from 'react';
import {getEdiConnections} from '../util/APIUtils';
import {EDI_LIST_SIZE} from '../constants';
import {withRouter} from 'react-router-dom';
import './EdiList.css';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import {columns} from "./testTableData";

class EdiList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ediConnections: [],
            pageNumber: 0,
            pageSize: 15,
            totalElements: 0,
            totalPages: 0,
            isLast: true,
            isLoading: false
        };
        this.loadEdiList = this.loadEdiList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadEdiList(page = 0, size = EDI_LIST_SIZE) {
        let promise = getEdiConnections(page, size);
        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                const ediConnections = this.state.ediConnections.slice();

                this.setState({
                    ediConnections: ediConnections.concat(response.content),
                    pageNumber: response.pageNumber,
                    pageSize: response.pageSize,
                    totalElements: response.totalElements,
                    totalPages: response.totalPages,
                    isLast: response.isLast,
                    isLoading: false
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this.loadEdiList();
    }

    componentDidUpdate = nextProps => {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                ediConnections: [],
                pageNumber: 0,
                pageSize: 10,
                totalElements: 0,
                totalPages: 0,
                isLast: true,
                currentVotes: [],
                isLoading: false
            });
            this.loadEdiList();
        }
    };

    handleLoadMore() {
        this.loadEdiList(this.state.pageNumber + 1);
    }

    render() {
        return (
            <div className="ediConnections-container">
                <ReactTable
                    manual
                    minRows={0}
                    pageSize={this.state.pageSize}
                    data={this.state.ediConnections}
                    columns={columns}
                    pages={this.state.totalPages}
                    showPagination={true}
                    getTrProps={(state, rowInfo, column, instance) => ({
                        onClick: e => {
                            console.log('A row was clicked!');
                            console.log("Edi-Connection with ID: " + rowInfo.original.id)
                        }
                    })}
                />
                <Tips/>
            </div>
        );
    }
}

export const Tips = () =>
    <div style={{textAlign: "center"}}>
        <em>Tip: Hold shift when sorting to multi-sort!</em>
    </div>;

export default withRouter(EdiList);