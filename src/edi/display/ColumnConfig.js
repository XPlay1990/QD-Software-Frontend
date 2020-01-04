import React from 'react';
import {Link} from "react-router-dom";
import {Trans} from 'react-i18next';
import {EDICON_DETAILS_OVERVIEW_URL} from "../../config/constants";

export const columnConfig = [
    {
        Header: <Trans i18nKey="columnConfig.customer">Customer</Trans>,
        accessor: 'customer.name',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        Cell: e => e.original.read ?
            <Link to={EDICON_DETAILS_OVERVIEW_URL(e.original.id)}> {e.value} </Link>
            : <Link to={EDICON_DETAILS_OVERVIEW_URL(e.original.id)}> <b>{e.value}</b> </Link>
    },
    {
        Header: <Trans i18nKey="columnConfig.supplier">Supplier</Trans>,
        accessor: 'supplier.name',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        Cell: e => e.original.read ?
            <Link to={EDICON_DETAILS_OVERVIEW_URL(e.original.id)}> {e.value} </Link>
            : <Link to={EDICON_DETAILS_OVERVIEW_URL(e.original.id)}> <b>{e.value}</b> </Link>
    },
    {
        Header: <Trans i18nKey="columnConfig.state">State</Trans>,
        accessor: 'status',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        width: 350,
        Cell: e => e.original.read ?
            <Link to={EDICON_DETAILS_OVERVIEW_URL(e.original.id)}> {e.value} </Link>
            : <Link to={EDICON_DETAILS_OVERVIEW_URL(e.original.id)}> <b>{e.value}</b> </Link>
    },
    {
        Header: <Trans i18nKey="columnConfig.developer">Developer</Trans>,
        accessor: 'assignedDeveloper.username',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        Cell: e => e.original.read ?
            <Link to={EDICON_DETAILS_OVERVIEW_URL(e.original.id)}> {e.value} </Link>
            : <Link to={EDICON_DETAILS_OVERVIEW_URL(e.original.id)}> <b>{e.value}</b> </Link>
    },
    {
        Header: <Trans i18nKey="columnConfig.lastModified">Last Modified</Trans>,
        accessor: 'updateTime',
        headerStyle: {whiteSpace: 'unset'},
        style: {whiteSpace: 'unset'},
        Cell: e => e.original.read ?
            <Link to={EDICON_DETAILS_OVERVIEW_URL(e.original.id)}> {e.value} </Link>
            : <Link to={EDICON_DETAILS_OVERVIEW_URL(e.original.id)}> <b>{e.value}</b> </Link>
    },
];