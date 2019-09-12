import React from 'react';
import {Link} from "react-router-dom";

export const columnConfig = [
    {
        Header: 'Customer',
        accessor: 'customer.name',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        // Cell: e => <Link state={this.state} to={`/edi_connection/${e.original.ediConnectionId}`}> {e.value} </Link>
        // TODO: pass state, so that link can be protectedroute @ APP.js
        Cell: e => <Link to={`/edi_connection/${e.original.id}`}> {e.value} </Link>
    },
    {
        Header: 'Supplier',
        accessor: 'supplier.name',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        Cell: e => <Link to={`/edi_connection/${e.original.id}`}> {e.value} </Link>
    },
    {
        Header: 'State',
        accessor: 'status',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        maxWidth: 150,
        Cell: e => <Link to={`/edi_connection/${e.original.id}`}> {e.value} </Link>
    },
    {
        Header: 'Last Modified',
        accessor: 'updateTime',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        Cell: e => <Link to={`/edi_connection/${e.original.id}`}> {e.value} </Link>
    },
];