import { useCallback } from "react";

import {

    useDispatch,
    useSelector

} from "react-redux";

import {

    fetchRoles,
    fetchRole,
    fetchRoleSummary,
    fetchRoleStatistics,

    createNewRole,
    updateExistingRole,
    deleteExistingRole,

    setRoleFilters,
    setPaginationModel

} from "../../../store/slices/roleSlice";

/*
|--------------------------------------------------------------------------
| useRole
|--------------------------------------------------------------------------
*/

export default function useRole() {

    const dispatch = useDispatch();

    const {

        roles,
        total,
        selectedRole,

        summary,
        statistics,

        filters,
        paginationModel,

        loading,
        refreshing,
        error,

        lastUpdated

    } = useSelector(

        state => state.roles

    );

    /*
    |--------------------------------------------------------------------------
    | Load Roles
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(

        async (params = {}) => {

            return dispatch(

                fetchRoles({

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

        [reload]

    );

    /*
    |--------------------------------------------------------------------------
    | Single Role
    |--------------------------------------------------------------------------
    */

    const loadRole = useCallback(

        roleId => dispatch(

            fetchRole(roleId)

        ),

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    const loadSummary = useCallback(

        () => dispatch(

            fetchRoleSummary()

        ),

        [dispatch]

    );

    const loadStatistics = useCallback(

        () => dispatch(

            fetchRoleStatistics()

        ),

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | CRUD
    |--------------------------------------------------------------------------
    */

    const createRole = useCallback(

        payload => dispatch(

            createNewRole(payload)

        ),

        [dispatch]

    );

    const updateRole = useCallback(

        (roleId, payload) => dispatch(

            updateExistingRole({

                roleId,

                payload

            })

        ),

        [dispatch]

    );

    const deleteRole = useCallback(

        roleId => dispatch(

            deleteExistingRole(roleId)

        ),

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const updateFilters = useCallback(

        payload => dispatch(

            setRoleFilters(payload)

        ),

        [dispatch]

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

        [dispatch]

    );

    return {

        roles,
        total,
        selectedRole,

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

        loadRole,
        loadSummary,
        loadStatistics,

        createRole,
        updateRole,
        deleteRole,

        updateFilters,
        updatePagination

    };

}