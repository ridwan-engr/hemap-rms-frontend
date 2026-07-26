import { useCallback } from "react";

import {

    useDispatch,

    useSelector

} from "react-redux";

import {

    fetchDevices,
    fetchDevice,
    fetchDeviceSummary,
    fetchDeviceStatistics,
    fetchDeviceHealth,
    createDevice,
    updateDevice,
    deleteDevice,
    refreshDevices,

    setDeviceFilters,
    setPaginationModel

} from "../../../store/slices/deviceSlice";

/*
|--------------------------------------------------------------------------
| Device Hook
|--------------------------------------------------------------------------
*/

export default function useDevice() {

    const dispatch = useDispatch();

    const {

        devices,
        total,
        selectedDevice,
        summary,
        statistics,
        health,

        filters,
        paginationModel,

        loading,
        refreshing,
        error,
        lastUpdated

    } = useSelector(

        state => state.devices

    );

    /*
    |--------------------------------------------------------------------------
    | Loaders
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(

        (params = filters) => {

            dispatch(

                fetchDevices({

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

        () => dispatch(refreshDevices()),

        [dispatch]

    );

    const loadSummary = useCallback(

        () => dispatch(fetchDeviceSummary()),

        [dispatch]

    );

    const loadStatistics = useCallback(

        () => dispatch(fetchDeviceStatistics()),

        [dispatch]

    );

    const loadHealth = useCallback(

        () => dispatch(fetchDeviceHealth()),

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Device Actions
    |--------------------------------------------------------------------------
    */

    const viewDevice = useCallback(

        deviceId =>

            dispatch(

                fetchDevice(deviceId)

            ),

        [dispatch]

    );

    const createNewDevice = useCallback(

        payload =>

            dispatch(

                createDevice(payload)

            ),

        [dispatch]

    );

    const updateExistingDevice = useCallback(

        (deviceId, payload) =>

            dispatch(

                updateDevice({

                    deviceId,

                    payload

                })

            ),

        [dispatch]

    );

    const removeDevice = useCallback(

        deviceId =>

            dispatch(

                deleteDevice(deviceId)

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

                setDeviceFilters(

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

        devices,
        total,
        selectedDevice,

        summary,
        statistics,
        health,

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
        loadHealth,

        viewDevice,

        createDevice: createNewDevice,
        updateDevice: updateExistingDevice,
        deleteDevice: removeDevice,

        updateFilters,
        updatePagination

    };

}