import { useCallback } from "react";

import {

    useDispatch,
    useSelector

} from "react-redux";

import {

    fetchUsers,
    fetchUser,
    fetchUserSummary,
    fetchUserStatistics,

    createUser,
    updateUser,
    deleteUser,

    refreshUsers,

    setUserFilters,
    setPaginationModel

} from "../../../store/slices/userSlice";

/*
|--------------------------------------------------------------------------
| User Hook
|--------------------------------------------------------------------------
*/

export default function useUser() {

    const dispatch = useDispatch();

    const {

        users,
        total,

        selectedUser,

        summary,
        statistics,

        filters,
        paginationModel,

        loading,
        refreshing,
        error,
        lastUpdated

    } = useSelector(

        state => state.users

    );

    /*
    |--------------------------------------------------------------------------
    | Loaders
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(

        (params = filters) => {

            dispatch(

                fetchUsers({

                    ...params,

                    page:

                        paginationModel.page + 1,

                    limit:

                        paginationModel.pageSize

                })

            );

        },

        [

            dispatch,

            filters,

            paginationModel

        ]

    );

    const refresh = useCallback(

        () => dispatch(refreshUsers()),

        [dispatch]

    );

    const loadSummary = useCallback(

        () => dispatch(fetchUserSummary()),

        [dispatch]

    );

    const loadStatistics = useCallback(

        () => dispatch(fetchUserStatistics()),

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | User Actions
    |--------------------------------------------------------------------------
    */

    const viewUser = useCallback(

        userId =>

            dispatch(

                fetchUser(userId)

            ),

        [dispatch]

    );

    const createNewUser = useCallback(

        payload =>

            dispatch(

                createUser(payload)

            ),

        [dispatch]

    );

    const updateExistingUser = useCallback(

        (

            userId,

            payload

        ) =>

            dispatch(

                updateUser({

                    userId,

                    payload

                })

            ),

        [dispatch]

    );

    const removeUser = useCallback(

        userId =>

            dispatch(

                deleteUser(userId)

            ),

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const updateFilters = useCallback(

        newFilters => {

            dispatch(

                setUserFilters(

                    newFilters

                )

            );

        },

        [dispatch]

    );

    const updatePagination = useCallback(

        model => {

            dispatch(

                setPaginationModel(

                    model

                )

            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Hook API
    |--------------------------------------------------------------------------
    */

    return {

        users,
        total,

        selectedUser,

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

        loadSummary,
        loadStatistics,

        viewUser,

        createUser:

            createNewUser,

        updateUser:

            updateExistingUser,

        deleteUser:

            removeUser,

        updateFilters,
        updatePagination

    };

}