import { useCallback, useMemo } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchUsers,
    fetchUser,
    createUser as createUserAction,
    updateUser as updateUserAction,
    deleteUser as deleteUserAction,
    activateUser as activateUserAction,
    deactivateUser as deactivateUserAction,
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
| This hook also provides:
|
| - normalized users
| - summary statistics
| - role statistics
| - safe defaults for Redux state
| - DataGrid-compatible row IDs
|
|--------------------------------------------------------------------------
*/

export default function useUser() {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const state = useSelector(
        state => state.users || {}
    );

    const {
        users = [],
        total = 0,
        selectedUser = null,
        filters = {},
        paginationModel = {
            page: 0,
            pageSize: 25
        },
        loading = false,
        refreshing = false,
        error = null,
        lastUpdated = null
    } = state;

    /*
    |--------------------------------------------------------------------------
    | Normalize Users
    |--------------------------------------------------------------------------
    |
    | MongoDB returns _id.
    | MUI DataGrid requires id unless getRowId is supplied.
    |
    | We normalize here so every component receives a consistent shape.
    |
    */

    const normalizedUsers = useMemo(() => {

        if (!Array.isArray(users)) {
            return [];
        }

        return users.map(user => {

            const role =
                typeof user?.role === "object"
                    ? user.role?.name ||
                      user.role?.code ||
                      ""
                    : user?.role || "";

            const assignedSites =
                Array.isArray(user?.assignedSites)
                    ? user.assignedSites
                    : [];

            const fullName = [
                user?.firstName,
                user?.lastName
            ]
                .filter(Boolean)
                .join(" ")
                .trim();

            const status =
                user?.isActive === true
                    ? "Active"
                    : "Inactive";

            return {

                ...user,

                /*
                |----------------------------------------------------------
                | DataGrid ID
                |----------------------------------------------------------
                */

                id:
                    user?.id ||
                    user?._id,

                /*
                |----------------------------------------------------------
                | Display fields
                |----------------------------------------------------------
                */

                fullName:
                    fullName ||
                    user?.name ||
                    user?.email ||
                    "Unknown User",

                role,

                assignedSites,

                status,

                lastLogin:
                    user?.lastLogin
                        ? new Date(
                            user.lastLogin
                        ).toLocaleString()
                        : "-"

            };

        });

    }, [users]);

    /*
    |--------------------------------------------------------------------------
    | Summary
    |--------------------------------------------------------------------------
    */

    const summary = useMemo(() => {

        const list = normalizedUsers;

        const totalUsers =
            Number.isFinite(total) && total > 0
                ? total
                : list.length;

        const activeUsers =
            list.filter(
                user =>
                    user.isActive === true
            ).length;

        const inactiveUsers =
            list.filter(
                user =>
                    user.isActive !== true
            ).length;

        const administrators =
            list.filter(user => {

                const role =
                    String(
                        user.role || ""
                    ).toUpperCase();

                return (
                    role === "ADMIN" ||
                    role === "ADMINISTRATOR"
                );

            }).length;

        return {

            totalUsers,

            activeUsers,

            inactiveUsers,

            administrators

        };

    }, [
        normalizedUsers,
        total
    ]);

    /*
    |--------------------------------------------------------------------------
    | Role Statistics
    |--------------------------------------------------------------------------
    */

    const statistics = useMemo(() => {

        const roleMap = {};

        normalizedUsers.forEach(user => {

            const role =
                user.role ||
                "UNASSIGNED";

            roleMap[role] =
                (roleMap[role] || 0) + 1;

        });

        return Object.entries(
            roleMap
        ).map(
            ([role, count]) => ({

                role,

                total: count

            })
        );

    }, [normalizedUsers]);

    /*
    |--------------------------------------------------------------------------
    | Reload Users
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(
        (params = {}) => {

            const query = {

                ...filters,

                ...params,

                page:
                    params.page ??
                    paginationModel.page + 1,

                limit:
                    params.limit ??
                    paginationModel.pageSize

            };

            return dispatch(
                fetchUsers(query)
            );

        },
        [
            dispatch,
            filters,
            paginationModel.page,
            paginationModel.pageSize
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | View User
    |--------------------------------------------------------------------------
    */

    const viewUser = useCallback(
        userId => {

            if (!userId) {

                return Promise.reject(
                    new Error(
                        "userId is required"
                    )
                );

            }

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

    const createUser = useCallback(
        payload => {

            return dispatch(
                createUserAction(payload)
            );

        },
        [dispatch]
    );

    /*
    |--------------------------------------------------------------------------
    | Update User
    |--------------------------------------------------------------------------
    */

    const updateUser = useCallback(
        (
            userId,
            payload
        ) => {

            if (!userId) {

                return Promise.reject(
                    new Error(
                        "userId is required"
                    )
                );

            }

            return dispatch(
                updateUserAction({

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

    const activateUser = useCallback(
        userId => {

            if (!userId) {

                return Promise.reject(
                    new Error(
                        "userId is required"
                    )
                );

            }

            return dispatch(
                activateUserAction(userId)
            );

        },
        [dispatch]
    );

    /*
    |--------------------------------------------------------------------------
    | Deactivate User
    |--------------------------------------------------------------------------
    */

    const deactivateUser = useCallback(
        userId => {

            if (!userId) {

                return Promise.reject(
                    new Error(
                        "userId is required"
                    )
                );

            }

            return dispatch(
                deactivateUserAction(userId)
            );

        },
        [dispatch]
    );

    /*
    |--------------------------------------------------------------------------
    | Delete User
    |--------------------------------------------------------------------------
    */

    const deleteUser = useCallback(
        userId => {

            if (!userId) {

                return Promise.reject(
                    new Error(
                        "userId is required"
                    )
                );

            }

            return dispatch(
                deleteUserAction(userId)
            );

        },
        [dispatch]
    );

    /*
    |--------------------------------------------------------------------------
    | Clear Selected User
    |--------------------------------------------------------------------------
    */

    const clearSelectedUser = useCallback(
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
                setUserFilters(
                    newFilters || {}
                )
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
                setPaginationModel(
                    model
                )
            );

        },
        [dispatch]
    );

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = useCallback(
        () => {

            return reload();

        },
        [reload]
    );

    /*
    |--------------------------------------------------------------------------
    | Public API
    |--------------------------------------------------------------------------
    */

    return {

        /* Data */
        users: normalizedUsers,

        total,

        selectedUser,

        /* Statistics */
        summary,

        statistics,

        /* Query state */
        filters,

        paginationModel,

        /* Request state */
        loading,

        refreshing,

        error,

        lastUpdated,

        /* Actions */
        reload,

        refresh,

        viewUser,

        createUser,

        updateUser,

        activateUser,

        deactivateUser,

        deleteUser,

        clearSelectedUser,

        /* UI state */
        updateFilters,

        updatePagination

    };

}