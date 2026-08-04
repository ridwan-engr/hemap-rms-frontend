import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    ens: 0,

    saidi: 0,

    saifi: 0,

    lolp: 0,

    availability: 0,

    interruptionFrequency: 0,

    interruptionDuration: 0,

    status: "idle",

    loading: false,

    error: null,

    lastUpdated: null

};

const reliabilitySlice = createSlice({

    name: "reliability",

    initialState,

    reducers: {

        setReliability(state, action) {

            Object.assign(state, action.payload);

            state.lastUpdated = new Date().toISOString();

        },

        clearReliability(state) {

            Object.assign(state, initialState);

        },

        reliabilityLoading(state) {

            state.loading = true;

        },

        reliabilityLoaded(state) {

            state.loading = false;

        },

        reliabilityFailed(state, action) {

            state.loading = false;

            state.error = action.payload;

        },

        updateReliabilityRealtime(state, action) {

            const payload = action.payload;

            if (!payload) return;

            if (payload.ens !== undefined)
                state.ens = payload.ens;

            if (payload.saidi !== undefined)
                state.saidi = payload.saidi;

            if (payload.saifi !== undefined)
                state.saifi = payload.saifi;

            if (payload.lolp !== undefined)
                state.lolp = payload.lolp;

            if (payload.availability !== undefined)
                state.availability = payload.availability;

            if (payload.interruptionFrequency !== undefined)
                state.interruptionFrequency =
                    payload.interruptionFrequency;

            if (payload.interruptionDuration !== undefined)
                state.interruptionDuration =
                    payload.interruptionDuration;

            state.lastUpdated = new Date().toISOString();

        }

    }

});

export const {

    setReliability,

    clearReliability,

    reliabilityLoading,

    reliabilityLoaded,

    reliabilityFailed,

    updateReliabilityRealtime

} = reliabilitySlice.actions;

export default reliabilitySlice.reducer;