import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import {
    getDevices,
    getDeviceById,
    createDevice as createDeviceApi,
    updateDevice as updateDeviceApi,
    deleteDevice as deleteDeviceApi
} from "../../features/devices/api/deviceApi.js";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

/**
 * Fetch all devices
 *
 * Backend:
 * GET /devices
 */
export const fetchDevices = createAsyncThunk(
    "devices/fetchDevices",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getDevices(params);

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data ||
                error.message ||
                "Failed to fetch devices."
            );

        }

    }
);

/**
 * Fetch single device
 *
 * Backend:
 * GET /devices/:id
 */
export const fetchDevice = createAsyncThunk(
    "devices/fetchDevice",

    async (deviceId, { rejectWithValue }) => {

        try {

            return await getDeviceById(deviceId);

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data ||
                error.message ||
                "Failed to fetch device."
            );

        }

    }
);

/**
 * Create device
 *
 * Backend:
 * POST /devices
 */
export const createDevice = createAsyncThunk(
    "devices/createDevice",

    async (payload, { rejectWithValue }) => {

        try {

            return await createDeviceApi(payload);

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data ||
                error.message ||
                "Failed to create device."
            );

        }

    }
);

/**
 * Update device
 *
 * Backend:
 * PUT /devices/:id
 */
export const updateDevice = createAsyncThunk(
    "devices/updateDevice",

    async (
        {
            deviceId,
            payload
        },
        {
            rejectWithValue
        }
    ) => {

        try {

            return await updateDeviceApi(
                deviceId,
                payload
            );

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data ||
                error.message ||
                "Failed to update device."
            );

        }

    }
);

/**
 * Delete device
 *
 * Backend:
 * DELETE /devices/:id
 */
export const deleteDevice = createAsyncThunk(
    "devices/deleteDevice",

    async (deviceId, { rejectWithValue }) => {

        try {

            await deleteDeviceApi(deviceId);

            return deviceId;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data ||
                error.message ||
                "Failed to delete device."
            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    devices: [],

    total: 0,

    selectedDevice: null,

    filters: {},

    paginationModel: {

        page: 0,

        pageSize: 25

    },

    loading: false,

    saving: false,

    deleting: false,

    error: null,

    lastUpdated: null

};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const deviceSlice = createSlice({

    name: "devices",

    initialState,

    reducers: {

        /*
        |------------------------------------------------------------------
        | Device Filters
        |------------------------------------------------------------------
        */

        setDeviceFilters(
            state,
            action
        ) {

            state.filters = action.payload;

        },

        /*
        |------------------------------------------------------------------
        | Pagination
        |------------------------------------------------------------------
        */

        setPaginationModel(
            state,
            action
        ) {

            state.paginationModel =
                action.payload;

        },

        /*
        |------------------------------------------------------------------
        | Clear Selected Device
        |------------------------------------------------------------------
        */

        clearSelectedDevice(state) {

            state.selectedDevice = null;

        },

        /*
        |------------------------------------------------------------------
        | Clear Error
        |------------------------------------------------------------------
        */

        clearDeviceError(state) {

            state.error = null;

        }

    },

    extraReducers: builder => {

        /*
        |--------------------------------------------------------------------------
        | Fetch Devices
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchDevices.pending,
                state => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchDevices.fulfilled,
                (state, action) => {

                    state.loading = false;

                    /*
                     * Your API currently returns `data`
                     * directly.
                     *
                     * Therefore support both:
                     *
                     * {
                     *     rows: [],
                     *     total: 10
                     * }
                     *
                     * and:
                     *
                     * {
                     *     data: {
                     *         rows: [],
                     *         total: 10
                     *     }
                     * }
                     */

                    const payload =
                        action.payload?.data ??
                        action.payload ??
                        {};

                    state.devices =
                        payload.rows ??
                        payload.devices ??
                        (Array.isArray(payload)
                            ? payload
                            : []);

                    state.total =
                        payload.total ??
                        payload.count ??
                        state.devices.length;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchDevices.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Failed to fetch devices.";

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Fetch Single Device
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchDevice.pending,
                state => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchDevice.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.selectedDevice =
                        action.payload?.data ??
                        action.payload ??
                        null;

                }
            )

            .addCase(
                fetchDevice.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Failed to fetch device.";

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Create Device
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                createDevice.pending,
                state => {

                    state.saving = true;

                    state.error = null;

                }
            )

            .addCase(
                createDevice.fulfilled,
                (state, action) => {

                    state.saving = false;

                    const createdDevice =
                        action.payload?.data ??
                        action.payload;

                    /*
                     * Add the newly-created device
                     * if the API returned it.
                     */

                    if (createdDevice) {

                        state.devices.unshift(
                            createdDevice
                        );

                        state.total += 1;

                    }

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                createDevice.rejected,
                (state, action) => {

                    state.saving = false;

                    state.error =
                        action.payload ||
                        "Failed to create device.";

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Update Device
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                updateDevice.pending,
                state => {

                    state.saving = true;

                    state.error = null;

                }
            )

            .addCase(
                updateDevice.fulfilled,
                (state, action) => {

                    state.saving = false;

                    const updatedDevice =
                        action.payload?.data ??
                        action.payload;

                    /*
                     * Update the existing device
                     * in the local Redux collection.
                     */

                    if (updatedDevice) {

                        const updatedId =
                            updatedDevice._id ??
                            updatedDevice.id;

                        const index =
                            state.devices.findIndex(
                                device =>
                                    (
                                        device._id ??
                                        device.id
                                    ) === updatedId
                            );

                        if (index !== -1) {

                            state.devices[index] =
                                updatedDevice;

                        }

                        /*
                         * Keep selectedDevice
                         * synchronized.
                         */

                        const selectedId =
                            state.selectedDevice?._id ??
                            state.selectedDevice?.id;

                        if (
                            selectedId &&
                            selectedId === updatedId
                        ) {

                            state.selectedDevice =
                                updatedDevice;

                        }

                    }

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                updateDevice.rejected,
                (state, action) => {

                    state.saving = false;

                    state.error =
                        action.payload ||
                        "Failed to update device.";

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Delete Device
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                deleteDevice.pending,
                state => {

                    state.deleting = true;

                    state.error = null;

                }
            )

            .addCase(
                deleteDevice.fulfilled,
                (state, action) => {

                    state.deleting = false;

                    const deletedId =
                        action.payload;

                    state.devices =
                        state.devices.filter(
                            device =>
                                (
                                    device._id ??
                                    device.id
                                ) !== deletedId
                        );

                    /*
                     * Prevent negative totals.
                     */

                    state.total =
                        Math.max(
                            0,
                            state.total - 1
                        );

                    /*
                     * Clear selected device
                     * if it was deleted.
                     */

                    const selectedId =
                        state.selectedDevice?._id ??
                        state.selectedDevice?.id;

                    if (
                        selectedId === deletedId
                    ) {

                        state.selectedDevice =
                            null;

                    }

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                deleteDevice.rejected,
                (state, action) => {

                    state.deleting = false;

                    state.error =
                        action.payload ||
                        "Failed to delete device.";

                }
            );

    }

});

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/

export const {

    setDeviceFilters,

    setPaginationModel,

    clearSelectedDevice,

    clearDeviceError

} = deviceSlice.actions;

/*
|--------------------------------------------------------------------------
| Reducer
|--------------------------------------------------------------------------
*/

export default deviceSlice.reducer;