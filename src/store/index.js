import { configureStore } from "@reduxjs/toolkit";

/*
|--------------------------------------------------------------------------
| Reducers
|--------------------------------------------------------------------------
*/

import authReducer from "./slices/authSlice.js";
import dashboardReducer from "./slices/dashboardSlice.js";
import analyticsReducer from "./slices/analyticsSlice.js";
import alarmReducer from "./slices/alarmSlice.js";
import siteReducer from "./slices/siteSlice.js";
import deviceReducer from "./slices/deviceSlice.js";
import userReducer from "./slices/userSlice.js";
import optimizationReducer from "./slices/optimizationSlice.js";
import reliabilityReducer from "./slices/reliabilitySlice.js";

/*
|--------------------------------------------------------------------------
| Configure Store
|--------------------------------------------------------------------------
*/

const store = configureStore({

    reducer: {

        auth: authReducer,

        dashboard: dashboardReducer,

        analytics: analyticsReducer,

        alarms: alarmReducer,

        sites: siteReducer,

        devices: deviceReducer,

        users: userReducer, 

        optimization: optimizationReducer,

        reliability: reliabilityReducer

    },

    devTools: import.meta.env.DEV

});

/*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

export default store;