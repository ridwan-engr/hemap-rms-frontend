import { useCallback } from "react";

import {

    useDispatch,
    useSelector

} from "react-redux";

import {

    fetchAuditLogs,
    fetchAuditLog,

    fetchAuditSummary,
    fetchAuditStatistics,

    createNewAuditLog,
    updateExistingAuditLog,
    deleteExistingAuditLog,

    setAuditFilters,
    setPaginationModel

} from "../../../store/slices/auditSlice";

/*
|--------------------------------------------------------------------------
| useAudit
|--------------------------------------------------------------------------
*/

export default function useAudit() {

    const dispatch = useDispatch();

    const {

        logs,

        total,

        selectedLog,

        summary,

        statistics,

        filters,

        paginationModel,

        loading,

        refreshing,

        error,

        lastUpdated

    } = useSelector(

        state => state.audit

    );

    /*
    |--------------------------------------------------------------------------
    | Reload
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(

        async (params = {}) => {

            return dispatch(

                fetchAuditLogs({

                    ...filters,

                    page: paginationModel.page + 1,

                    limit: paginationModel.pageSize,

                    ...params

                })

            );

        },

        [

            dispatch,

            filters,

            paginationModel

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = useCallback(

        () => reload(),

        [

            reload

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Single Log
    |--------------------------------------------------------------------------
    */

    const loadAuditLog = useCallback(

        auditId => dispatch(

            fetchAuditLog(auditId)

        ),

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    const loadSummary = useCallback(

        () => dispatch(

            fetchAuditSummary()

        ),

        [

            dispatch

        ]

    );

    const loadStatistics = useCallback(

        () => dispatch(

            fetchAuditStatistics()

        ),

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */

    const createAuditLog = useCallback(

        payload => dispatch(

            createNewAuditLog(payload)

        ),

        [

            dispatch

        ]

    );

    const updateAuditLog = useCallback(

        (

            auditId,

            payload

        ) => dispatch(

            updateExistingAuditLog({

                auditId,

                payload

            })

        ),

        [

            dispatch

        ]

    );

    const deleteAuditLog = useCallback(

        auditId => dispatch(

            deleteExistingAuditLog(auditId)

        ),

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

        payload => dispatch(

            setAuditFilters(payload)

        ),

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

        model => dispatch(

            setPaginationModel(model)

        ),

        [

            dispatch

        ]

    );

    return {

        logs,

        total,

        selectedLog,

        summary,

        statistics,

        filters,

        paginationModel,

        loading,

        refreshing,

        error,

        lastUpdated,

        reload,

        refresh,

        loadAuditLog,

        loadSummary,

        loadStatistics,

        createAuditLog,

        updateAuditLog,

        deleteAuditLog,

        updateFilters,

        updatePagination

    };

}