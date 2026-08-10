import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice.js";
import optimizationReducer from "./optimizationSlice.js";
import settingsReducer from "./settingsSlice.js";
import vrmReducer from "./vrmSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,

        optimization: optimizationReducer,

        settings: settingsReducer,

        vrm: vrmReducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: true
        }),

    devTools:
        import.meta.env.MODE !== "production"
});

export default store;