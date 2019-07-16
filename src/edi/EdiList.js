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

                if (this._isMounted) {
                    this.setState({
                        ediConnections: ediConnections.concat(response.content),
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

    onRowClick(state, rowInfo, column, instance) {
        this.props.history.push('/edi_connection/' + rowInfo.original.id)
    }

    reloadEdiConnections(state, rowInfo, column, instance) {
        console.log("Sorting by " + column.id);
        if (column.sort === '') return;
        let newSort;
        if (this.state.currentSort === column.sort) {
            this.state.isASC === 'ASC' ? newSort = 'DESC' : newSort = 'ASC';
        } else {
            newSort = 'ASC';
        }
        // this.setState({currentSort: column.sort, isASC: newSort});
        // let passObj = this.props.valueAccepted(1);
        // column.altID ? passObj.orderByColumn = column.altID : passObj.orderByColumn = column.sort;
        // passObj.orderByAscDesc = newSort;
        // let qhk = ((((this.props.search || {}).data || {})).queryHeaderKey || -1);
        // this.props.updateSearch(passObj, qhk, 1, this.props.search.numRecords)
    }

    render() {
        return (
            <div className="ediConnectionsContainer">
                <ReactTable
                    manual
                    minRows={0}
                    pageSize={this.state.pageSize}
                    data={this.state.ediConnections}
                    columns={columns}
                    pages={this.state.totalPages}
                    showPagination={true}
                    // filterable
                    getTheadThProps={(state, rowInfo, column, instance) => ({
                        // style: {
                        //     borderTop: (this.state.currentSort === column.sort && column.sort !== '' && this.state.isASC === 'ASC') ? '2px solid black' : '0',
                        //     borderBottom: (this.state.currentSort === column.sort && column.sort !== '' && this.state.isASC === 'DESC') ? '2px solid black' : '0'
                        // },
                        onClick: (e) => {
                            console.log(state);
                            console.log(rowInfo);
                            console.log(column);
                            console.log(instance);
                            this.reloadEdiConnections(state, rowInfo, column, instance)
                        }
                    })}
                    getTrProps={(state, rowInfo, column, instance) => ({
                        onClick: e => {
                            this.onRowClick(state, rowInfo, column, instance);
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