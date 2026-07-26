import { configureStore } from "@reduxjs/toolkit";

/*
|--------------------------------------------------------------------------
| Reducers
|--------------------------------------------------------------------------
*/

import authReducer from "./slices/authSlice";
import dashboardReducer from "./slices/dashboardSlice";
import analyticsReducer from "./slices/analyticsSlice";
import alarmReducer from "./slices/alarmSlice";
import siteReducer from "./slices/siteSlice";
import deviceReducer from "./slices/deviceSlice";
import userReducer from "./slices/userSlice";
import optimizationReducer from "./slices/optimizationSlice";
import reliabilityReducer from "./slices/reliabilitySlice";

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