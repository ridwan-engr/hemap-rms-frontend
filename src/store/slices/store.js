import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice.js";
import optimizationReducer from "./slices/optimizationSlice.js";
import settingsReducer from "./slices/settingsSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer,

        optimization: optimizationReducer,

        settings: settingsReducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: true
        }),

    devTools:
        import.meta.env.MODE !== "production"
});

export default store;