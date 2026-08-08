import { useCallback } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    createReport,
    fetchReports,
    fetchReportById,
    downloadReportFile,
    removeReport,
    setReportFilters,
    setReportPagination,
    clearSelectedReport,
    clearReportError,
    clearReports
} from "../../../store/slices/reportSlice.js";


/*
|--------------------------------------------------------------------------
| useReports
|--------------------------------------------------------------------------
|
| Central hook for Report Management.
|
| Components should NEVER dispatch Redux actions directly.
|
| Backend contract:
|
| POST   /reports
| GET    /reports
| GET    /reports/:reportId
| GET    /reports/:reportId/download
| DELETE /reports/:reportId
|
|--------------------------------------------------------------------------
*/

export default function useReports() {

    const dispatch = useDispatch();


    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const {

        reports,

        total,

        selectedReport,

        pagination,

        filters,

        loading,

        generating,

        downloading,

        deleting,

        error,

        lastGenerated,

        lastUpdated

    } = useSelector(

        state => state.reports

    );


    /*
    |--------------------------------------------------------------------------
    | Load Reports
    |--------------------------------------------------------------------------
    */

    const loadReports = useCallback(

        (params = filters) => {

            return dispatch(

                fetchReports({

                    ...params,

                    page:
                        pagination?.page ?? 1,

                    limit:
                        pagination?.limit ?? 25

                })

            );

        },

        [

            dispatch,

            filters,

            pagination

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Load Single Report
    |--------------------------------------------------------------------------
    */

    const loadReport = useCallback(

        reportId => {

            return dispatch(

                fetchReportById(reportId)

            );

        },

        [

            dispatch

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Generate Report
    |--------------------------------------------------------------------------
    */

    const generate = useCallback(

        payload => {

            return dispatch(

                createReport(payload)

            );

        },

        [

            dispatch

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Download Report
    |--------------------------------------------------------------------------
    */

    const download = useCallback(

        reportId => {

            return dispatch(

                downloadReportFile(reportId)

            );

        },

        [

            dispatch

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Delete Report
    |--------------------------------------------------------------------------
    */

    const remove = useCallback(

        reportId => {

            return dispatch(

                removeReport(reportId)

            );

        },

        [

            dispatch

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const updateFilters = useCallback(

        nextFilters => {

            dispatch(

                setReportFilters(nextFilters)

            );

        },

        [

            dispatch

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const updatePagination = useCallback(

        nextPagination => {

            dispatch(

                setReportPagination(

                    nextPagination

                )

            );

        },

        [

            dispatch

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Clear Selected Report
    |--------------------------------------------------------------------------
    */

    const clearSelected = useCallback(

        () => {

            dispatch(

                clearSelectedReport()

            );

        },

        [

            dispatch

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Clear Error
    |--------------------------------------------------------------------------
    */

    const clearError = useCallback(

        () => {

            dispatch(

                clearReportError()

            );

        },

        [

            dispatch

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Clear Reports
    |--------------------------------------------------------------------------
    */

    const resetReports = useCallback(

        () => {

            dispatch(

                clearReports()

            );

        },

        [

            dispatch

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = useCallback(

        () => {

            return dispatch(

                fetchReports({

                    ...filters,

                    page:
                        pagination?.page ?? 1,

                    limit:
                        pagination?.limit ?? 25

                })

            );

        },

        [

            dispatch,

            filters,

            pagination

        ]

    );


    /*
    |--------------------------------------------------------------------------
    | Public API
    |--------------------------------------------------------------------------
    */

    return {

        /*
        |----------------------------------------------------------------------
        | Data
        |----------------------------------------------------------------------
        */

        reports,

        total,

        selectedReport,


        /*
        |----------------------------------------------------------------------
        | Pagination / Filters
        |----------------------------------------------------------------------
        */

        pagination,

        filters,


        /*
        |----------------------------------------------------------------------
        | Status
        |----------------------------------------------------------------------
        */

        loading,

        generating,

        downloading,

        deleting,

        error,

        lastGenerated,

        lastUpdated,


        /*
        |----------------------------------------------------------------------
        | Operations
        |----------------------------------------------------------------------
        */

        loadReports,

        loadReport,

        generate,

        download,

        remove,

        refresh,


        /*
        |----------------------------------------------------------------------
        | Filters
        |----------------------------------------------------------------------
        */

        updateFilters,

        updatePagination,


        /*
        |----------------------------------------------------------------------
        | State Management
        |----------------------------------------------------------------------
        */

        clearSelected,

        clearError,

        resetReports

    };

}