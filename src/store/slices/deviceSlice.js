import {

    createSlice,

    createAsyncThunk

} from "@reduxjs/toolkit";

import {

    getDevices,
    getDeviceById,
    getDeviceSummary,
    getDeviceStatistics,
    getDeviceHealth,
    createDevice as createDeviceApi,
    updateDevice as updateDeviceApi,
    deleteDevice as deleteDeviceApi,
    refreshDevices as refreshDevicesApi

} from "../../features/devices/api/deviceApi";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
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

                error.message

            );

        }

    }

);

export const fetchDevice = createAsyncThunk(

    "devices/fetchDevice",

    async (deviceId, { rejectWithValue }) => {

        try {

            return await getDeviceById(deviceId);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchDeviceSummary = createAsyncThunk(

    "devices/fetchDeviceSummary",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getDeviceSummary(params);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchDeviceStatistics = createAsyncThunk(

    "devices/fetchDeviceStatistics",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getDeviceStatistics(params);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchDeviceHealth = createAsyncThunk(

    "devices/fetchDeviceHealth",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getDeviceHealth(params);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const createDevice = createAsyncThunk(

    "devices/createDevice",

    async (payload, { rejectWithValue }) => {

        try {

            return await createDeviceApi(payload);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

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

                error.message

            );

        }

    }

);

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

                error.message

            );

        }

    }

);

export const refreshDevices = createAsyncThunk(

    "devices/refreshDevices",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await refreshDevicesApi(params);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

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

    summary: {},

    statistics: {},

    health: {

        healthy: 0,

        warning: 0,

        critical: 0,

        offline: 0

    },

    filters: {},

    paginationModel: {

        page: 0,

        pageSize: 25

    },

    loading: false,

    refreshing: false,

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

        setDeviceFilters(state, action) {

            state.filters = action.payload;

        },

        setPaginationModel(state, action) {

            state.paginationModel = action.payload;

        },

        clearSelectedDevice(state) {

            state.selectedDevice = null;

        }

    },

    extraReducers: builder => {

        builder

        .addCase(fetchDevices.pending, state => {

            state.loading = true;

            state.error = null;

        })

        .addCase(fetchDevices.fulfilled, (state, action) => {

            state.loading = false;

            state.devices = action.payload.rows ?? [];

            state.total = action.payload.total ?? 0;

            state.lastUpdated = new Date().toISOString();

        })

        .addCase(fetchDevices.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        .addCase(fetchDevice.fulfilled, (state, action) => {

            state.selectedDevice = action.payload;

        })

        .addCase(fetchDeviceSummary.fulfilled, (state, action) => {

            state.summary = action.payload;

        })

        .addCase(fetchDeviceStatistics.fulfilled, (state, action) => {

            state.statistics = action.payload;

        })

        .addCase(fetchDeviceHealth.fulfilled, (state, action) => {

            state.health = action.payload;

        })

        .addCase(createDevice.fulfilled, state => {

            state.lastUpdated = new Date().toISOString();

        })

        .addCase(updateDevice.fulfilled, state => {

            state.lastUpdated = new Date().toISOString();

        })

        .addCase(deleteDevice.fulfilled, (state, action) => {

            state.devices = state.devices.filter(

                device => device.id !== action.payload

            );

            state.total--;

            state.lastUpdated = new Date().toISOString();

        })

        .addCase(refreshDevices.pending, state => {

            state.refreshing = true;

        })

        .addCase(refreshDevices.fulfilled, state => {

            state.refreshing = false;

            state.lastUpdated = new Date().toISOString();

        })

        .addCase(refreshDevices.rejected, (state, action) => {

            state.refreshing = false;

            state.error = action.payload;

        });

    }

});

export const {

    setDeviceFilters,

    setPaginationModel,

    clearSelectedDevice

} = deviceSlice.actions;

export default deviceSlice.reducer;