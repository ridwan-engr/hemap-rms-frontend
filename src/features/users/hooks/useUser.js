import { useCallback } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchUsers,
    fetchUser,

    createUser,
    updateUser,
    deleteUser,

    activateUser,
    deactivateUser,

    setUserFilters,
    setPaginationModel,
    clearSelectedUser
} from "../../../store/slices/userSlice.js";

/*
|--------------------------------------------------------------------------
| User Hook
|--------------------------------------------------------------------------
|
| Central hook for User Management.
|
| Components should NEVER dispatch Redux actions directly.
|
*/

export default function useUser() {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const {
        users,
        total,

        selectedUser,

        filters,
        paginationModel,

        loading,
        error,
        lastUpdated

    } = useSelector(
        state => state.users
    );

    /*
    |--------------------------------------------------------------------------
    | Load Users
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(

        (params = filters) => {

            return dispatch(

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

    /*
    |--------------------------------------------------------------------------
    | User Details
    |--------------------------------------------------------------------------
    */

    const viewUser = useCallback(

        userId => {

            return dispatch(
                fetchUser(userId)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Create User
    |--------------------------------------------------------------------------
    */

    const createNewUser = useCallback(

        payload => {

            return dispatch(
                createUser(payload)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Update User
    |--------------------------------------------------------------------------
    */

    const updateExistingUser = useCallback(

        (
            userId,
            payload
        ) => {

            return dispatch(

                updateUser({

                    userId,

                    payload

                })

            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Activate User
    |--------------------------------------------------------------------------
    */

    const activateExistingUser = useCallback(

        userId => {

            return dispatch(
                activateUser(userId)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Deactivate User
    |--------------------------------------------------------------------------
    */

    const deactivateExistingUser = useCallback(

        userId => {

            return dispatch(
                deactivateUser(userId)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Delete User
    |--------------------------------------------------------------------------
    */

    const removeUser = useCallback(

        userId => {

            return dispatch(
                deleteUser(userId)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Clear Selected User
    |--------------------------------------------------------------------------
    */

    const clearSelected = useCallback(

        () => {

            dispatch(
                clearSelectedUser()
            );

        },

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
                setUserFilters(newFilters)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const updatePagination = useCallback(

        model => {

            dispatch(
                setPaginationModel(model)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Public Hook API
    |--------------------------------------------------------------------------
    */

    return {

        users,
        total,

        selectedUser,

        filters,
        paginationModel,

        loading,
        error,
        lastUpdated,

        reload,

        viewUser,

        createUser:
            createNewUser,

        updateUser:
            updateExistingUser,

        activateUser:
            activateExistingUser,

        deactivateUser:
            deactivateExistingUser,

        deleteUser:
            removeUser,

        clearSelectedUser:
            clearSelected,

        updateFilters,

        updatePagination

    };

}