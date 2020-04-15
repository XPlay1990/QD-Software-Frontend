import React from 'react';
import {getEdiConnections} from '../../util/APIUtils';
import {withRouter} from 'react-router-dom';
import './EdiList.css';
import {ColumnConfig} from "./ColumnConfig";
import LoadingIndicator from "../../common/LoadingIndicator";
import {EDI_LIST_SIZE} from "../../config/constants";
import {Trans} from "react-i18next";
import OverviewTable from "./table/OverviewTable";

const EdiList = (isUserAdmin) => {
    const [ediConnections, setEdiConnections] = React.useState([]);
    const [pageNumber, setPageNumber] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(EDI_LIST_SIZE);
    const [totalElements, setTotalElements] = React.useState(0);
    const [totalPages, setTotalPages] = React.useState(0);
    const [isLast, setIsLast] = React.useState(0);
    const [pageSorting, setPageSorting] = React.useState([]);
    const [additiveSort, setAdditiveSort] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState(isUserAdmin);
    const [isLoading, setIsLoading] = React.useState(true);

    const [columnConfig, setColumnConfig] = ColumnConfig();
    const [data, setData] = React.useState(() => loadEdiList())

    function loadEdiList() {
        let promise = getEdiConnections(pageNumber, pageSize, pageSorting, additiveSort);
        if (!promise) {
            return;
        }

        setIsLoading(true);

        promise
            .then(response => {
                setEdiConnections(response.content);
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

    return (
        <OverviewTable/>
    );
}

export default withRouter(EdiList);