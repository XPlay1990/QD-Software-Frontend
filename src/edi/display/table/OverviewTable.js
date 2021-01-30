import React, {useEffect} from 'react'
import Table from '@material-ui/core/Table'
import PropTypes from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {useSortBy, useTable} from 'react-table'

import "./OverviewTable.css"
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableToolbar from "./TableToolbar";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import {getEdiConnections} from "../../../util/APIUtils";
import {EDI_LIST_SIZE} from "../../../config/constants";
import {ColumnConfig} from "../ColumnConfig";
import LoadingIndicator from "../../../common/LoadingIndicator";
import {Trans} from "react-i18next";

const inputStyle = {
    padding: 0,
    margin: 0,
    border: 0,
    background: 'transparent',
}

// Create an editable cell renderer
const EditableCell = ({
                          value: initialValue,
                          row: {index},
                          column: {id},
                          updateMyData, // This is a custom function that we supplied to our table instance
                      }) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    const onChange = e => {
        setValue(e.target.value)
    }

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    // If the initialValue is changed externall, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <input
            style={inputStyle}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    )
}

EditableCell.propTypes = {
    cell: PropTypes.shape({
        value: PropTypes.any.isRequired,
    }),
    row: PropTypes.shape({
        index: PropTypes.number.isRequired,
    }),
    column: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }),
    updateMyData: PropTypes.func.isRequired,
}

const OverviewTable = () => {
    const [pageNumber, setPageNumber] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(EDI_LIST_SIZE);
    const [totalElements, setTotalElements] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [isLast, setIsLast] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);

    const [columns, setColumns] = ColumnConfig();
    const [data, setData] = React.useState([])
    const [filter, setFilter] = React.useState([])

    const {getTableProps, headerGroups, rows, prepareRow, state: {sortBy}} = useTable(
        {
            columns,
            data,
            manualSortBy: true
        },
        useSortBy,
        // useResizeColumns,
    )

    useEffect(() => {
        loadEdiList()
    }, [pageNumber, pageSize, sortBy, filter]);

    function loadEdiList() {
        let promise = getEdiConnections(pageNumber, pageSize, sortBy, filter);
        if (!promise) {
            return;
        }

        // setIsLoading(true);

        promise
            .then(response => {
                setData(response.content);
                setPageNumber(response.pageNumber);
                setPageSize(response.pageSize);
                setTotalElements(response.totalElements);
                setTotalPages(response.totalPages);
                setIsLast(response.isLast);
                setIsLoading(false)
                return response
            }).catch(error => {
            setIsLoading(false)
        });

    }

    // Render the UI for your table
    return (
        <div className="ediConnectionsContainer">
            {
                isLoading ?
                    <LoadingIndicator/> : null
            }
            {/*{*/}
            {/*    !isLoading && data.length === 0 ? (*/}
            {/*        <div className="noEdiConnectionsFound">*/}
            {/*            <span>No Edi-Connections Found.</span>*/}
            {/*        </div>*/}
            {/*    ) : null*/}
            {/*}*/}
            {
                !isLoading ? (
                    <div className="ediConnectionsTable">
                        <Paper>
                            <TableContainer className={"ReactTable"}>
                                <TableToolbar setFilter={setFilter}/>
                                <Table {...getTableProps()} className={"rt-table"}>
                                    <TableHead className={"rt-thead -header"}>
                                        {headerGroups.map(headerGroup => (
                                            <TableRow {...headerGroup.getHeaderGroupProps()} className={"rt-tr"}>
                                                {headerGroup.headers.map(column => (
                                                    <TableCell
                                                        {...(column.id === 'selection'
                                                            ? column.getHeaderProps()
                                                            : column.getHeaderProps(column.getSortByToggleProps()))}
                                                        className={"rt-th rt-resizable-header -cursor-pointer"}
                                                    >
                                                        {/*<div className={"rt-resizable-header-content"}>*/}
                                                        {column.render('Header')}
                                                        {column.id !== 'selection' ? (
                                                            <TableSortLabel
                                                                active={column.isSorted}
                                                                // react-table has a unsorted state which is not treated here
                                                                direction={column.isSortedDesc ? 'desc' : 'asc'}
                                                            />
                                                        ) : null}
                                                        {/*</div>*/}
                                                        {/*{column.canResize && (*/}
                                                        {/*    <div*/}
                                                        {/*        {...column.getResizerProps()}*/}
                                                        {/*        className={`rt-resizer ${*/}
                                                        {/*            column.isResizing ? 'rt-resizing' : ''*/}
                                                        {/*        }`}*/}
                                                        {/*    />*/}
                                                        {/*)}*/}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableHead>
                                    <TableBody className={"rt-tbody"}>
                                        {rows.map((row, i) => {
                                            prepareRow(row)
                                            return (
                                                <TableRow {...row.getRowProps()} className={"rt-tr-group"}>
                                                    <div className={(i % 2 === 0) ? "rt-tr -even" : "rt-tr -odd"}>
                                                        {row.cells.map(cell => {
                                                            return (
                                                                <TableCell {...cell.getCellProps()} className={"rt-td"}>
                                                                    {cell.render('Cell')}
                                                                </TableCell>
                                                            )
                                                        })}
                                                    </div>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[
                                                    5,
                                                    10,
                                                    15,
                                                    20
                                                ]}
                                                count={totalElements} // total elements
                                                rowsPerPage={pageSize}
                                                page={pageNumber}
                                                SelectProps={{
                                                    inputProps: {'aria-label': 'rows per page'},
                                                    native: true,
                                                }}
                                                backIconButtonText="lol"
                                                nextIconButtonText="Next"
                                                // backIconButtonProps={{disabled:true}}
                                                onChangePage={(event, newPage) => setPageNumber(newPage)}
                                                onChangeRowsPerPage={event => setPageSize(parseInt(event.target.value))}
                                                // ActionsComponent={TablePaginationActions}
                                            />
                                            <TableCell>
                                                <TextField
                                                    label="Select Page"
                                                    type="number"
                                                    defaultValue={pageNumber + 1}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    size={"small"}
                                                    InputProps={{inputProps: {min: 1, max: (totalPages + 1)}}}
                                                    style={{width: "100px"}}
                                                    onKeyPress={event => {
                                                        if (event.key === "Enter") {
                                                            setPageNumber(event.target.value - 1)
                                                        }
                                                    }}
                                                />
                                                of {totalPages}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </Paper>
                        <Tips/>
                    </div>
                ) : null

            }
        </div>
    )
};

export default OverviewTable

export const Tips = () =>
    <div className="hints">
        <Trans i18nKey="ediConnections.tableHint">Note: Hold shift when sorting to multi-sort!</Trans>
    </div>;