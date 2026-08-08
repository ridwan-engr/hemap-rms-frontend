import { useCallback } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchDevices,
    fetchDevice,
    createDevice,
    updateDevice,
    deleteDevice,

    setDeviceFilters,
    setPaginationModel,

    clearSelectedDevice,
    clearDeviceError

} from "../../../store/slices/deviceSlice.js";

/*
|--------------------------------------------------------------------------
| Device Hook
|--------------------------------------------------------------------------
|
| Central hook for Device Management.
|
| Components should NOT:
|
| - dispatch Redux actions directly
| - call deviceApi directly
|
| Components should interact with the device
| module through this hook.
|
|--------------------------------------------------------------------------
*/

export default function useDevice() {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const {

        devices,

        total,

        selectedDevice,

        filters,

        paginationModel,

        loading,

        saving,

        deleting,

        error,

        lastUpdated

    } = useSelector(

        state => state.devices

    );

    /*
    |--------------------------------------------------------------------------
    | Load Devices
    |--------------------------------------------------------------------------
    |
    | Uses the filters and pagination stored in Redux.
    |
    | MUI DataGrid uses zero-based pages:
    |
    | page = 0
    |
    | Backend commonly expects:
    |
    | page = 1
    |
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(

        (params = filters) => {

            const requestParams = {

                ...params,

                page:
                    paginationModel.page + 1,

                limit:
                    paginationModel.pageSize

            };

            return dispatch(

                fetchDevices(
                    requestParams
                )

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
    | Load Single Device
    |--------------------------------------------------------------------------
    */

    const viewDevice = useCallback(

        deviceId => {

            if (!deviceId) {

                return;

            }

            return dispatch(

                fetchDevice(deviceId)

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Create Device
    |--------------------------------------------------------------------------
    */

    const createNewDevice = useCallback(

        payload => {

            return dispatch(

                createDevice(payload)

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Update Device
    |--------------------------------------------------------------------------
    */

    const updateExistingDevice = useCallback(

        (

            deviceId,

            payload

        ) => {

            return dispatch(

                updateDevice({

                    deviceId,

                    payload

                })

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Delete Device
    |--------------------------------------------------------------------------
    */

    const removeDevice = useCallback(

        deviceId => {

            if (!deviceId) {

                return;

            }

            return dispatch(

                deleteDevice(deviceId)

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

        newFilters => {

            dispatch(

                setDeviceFilters(

                    newFilters

                )

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

        model => {

            dispatch(

                setPaginationModel(

                    model

                )

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Clear Selected Device
    |--------------------------------------------------------------------------
    */

    const clearSelection = useCallback(

        () => {

            dispatch(

                clearSelectedDevice()

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

                clearDeviceError()

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Public Hook API
    |--------------------------------------------------------------------------
    */

    return {

        /*
        |------------------------------------------------------------------
        | Data
        |------------------------------------------------------------------
        */

        devices,

        total,

        selectedDevice,

        filters,

        paginationModel,

        /*
        |------------------------------------------------------------------
        | Status
        |------------------------------------------------------------------
        */

        loading,

        saving,

        deleting,

        error,

        lastUpdated,

        /*
        |------------------------------------------------------------------
        | Data Loading
        |------------------------------------------------------------------
        */

        reload,

        viewDevice,

        /*
        |------------------------------------------------------------------
        | CRUD
        |------------------------------------------------------------------
        */

        createDevice:
            createNewDevice,

        updateDevice:
            updateExistingDevice,

        deleteDevice:
            removeDevice,

        /*
        |------------------------------------------------------------------
        | Filters & Pagination
        |------------------------------------------------------------------
        */

        updateFilters,

        updatePagination,

        /*
        |------------------------------------------------------------------
        | Selection / Errors
        |------------------------------------------------------------------
        */

        clearSelection,

        clearError

    };

}