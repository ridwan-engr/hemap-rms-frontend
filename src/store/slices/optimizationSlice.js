import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentRun: null,

    history: [],

    recommendations: [],

    progress: 0,

    solver: null,

    objectives: null,

    dispatch: [],

    status: "idle",

    loading: false,

    error: null,

    lastUpdated: null
};

const optimizationSlice = createSlice({

    name: "optimization",

    initialState,

    reducers: {

        startOptimization(state) {

            state.loading = true;

            state.status = "running";

            state.error = null;

        },

        optimizationSucceeded(state, action) {

            state.loading = false;

            state.status = "completed";

            state.currentRun = action.payload;

            state.lastUpdated = new Date().toISOString();

        },

        optimizationFailed(state, action) {

            state.loading = false;

            state.status = "failed";

            state.error = action.payload;

        },

        setOptimizationHistory(state, action) {

            state.history = action.payload;

        },

        clearOptimization(state) {

            Object.assign(state, initialState);

        },

        updateOptimizationRealtime(state, action) {

            const payload = action.payload;

            if (!payload) return;

            if (payload.progress !== undefined)
                state.progress = payload.progress;

            if (payload.status)
                state.status = payload.status;

            if (payload.dispatch)
                state.dispatch = payload.dispatch;

            if (payload.objectives)
                state.objectives = payload.objectives;

            if (payload.solver)
                state.solver = payload.solver;

            if (payload.recommendations)
                state.recommendations = payload.recommendations;

            if (payload.currentRun)
                state.currentRun = payload.currentRun;

            state.lastUpdated = new Date().toISOString();
        }

    }

});

export const {

    startOptimization,

    optimizationSucceeded,

    optimizationFailed,

    setOptimizationHistory,

    clearOptimization,

    updateOptimizationRealtime

} = optimizationSlice.actions;

export default optimizationSlice.reducer;