import React from 'react';
import {Link} from "react-router-dom";

export const columnConfig = [
    {
        Header: 'Customer',
        accessor: 'customer.name',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        // classname: ${e.original.id} === 1? 'test':null,
        // Cell: e => <Link state={this.state} to={`/edi_connection/${e.original.ediConnectionId}`}> {e.value} </Link>
        // TODO: pass state, so that link can be protectedroute @ APP.js
        // Cell: e => <Link to={`/edi_connection/${e.original.id}`}> {e.value} </Link>
        Cell: e => e.original.read ?
            <Link to={`/edi_connection/${e.original.id}`}> {e.value} </Link>
            : <Link to={`/edi_connection/${e.original.id}`}> <b>{e.value}</b> </Link>
    },
    {
        Header: 'Supplier',
        accessor: 'supplier.name',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        Cell: e => e.original.read ?
            <Link to={`/edi_connection/${e.original.id}`}> {e.value} </Link>
            : <Link to={`/edi_connection/${e.original.id}`}> <b>{e.value}</b> </Link>
    },
    {
        Header: 'State',
        accessor: 'status',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        width: 350,
        Cell: e => e.original.read ?
            <Link to={`/edi_connection/${e.original.id}`}> {e.value} </Link>
            : <Link to={`/edi_connection/${e.original.id}`}> <b>{e.value}</b> </Link>
    },
    {
        Header: 'Developer',
        accessor: 'assignedDeveloper.username',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        Cell: e => e.original.read ?
            <Link to={`/edi_connection/${e.original.id}`}> {e.value} </Link>
            : <Link to={`/edi_connection/${e.original.id}`}> <b>{e.value}</b> </Link>
    },
    {
        Header: 'Last Modified',
        accessor: 'updateTime',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        Cell: e => e.original.read ?
            <Link to={`/edi_connection/${e.original.id}`}> {e.value} </Link>
            : <Link to={`/edi_connection/${e.original.id}`}> <b>{e.value}</b> </Link>
    },
];