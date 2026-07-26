import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),

    accessToken: localStorage.getItem("accessToken"),

    refreshToken: localStorage.getItem("refreshToken"),

    isAuthenticated: !!localStorage.getItem("accessToken"),

    loading: false,

    error: null
};

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        loginStart(state) {

            state.loading = true;
            state.error = null;

        },

        loginSuccess(state, action) {

            const {

                user,

                accessToken,

                refreshToken

            } = action.payload;

            state.loading = false;

            state.user = user;

            state.accessToken = accessToken;

            state.refreshToken = refreshToken;

            state.isAuthenticated = true;

            state.error = null;

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            localStorage.setItem(
                "accessToken",
                accessToken
            );

            localStorage.setItem(
                "refreshToken",
                refreshToken
            );

        },

        loginFailure(state, action) {

            state.loading = false;

            state.error = action.payload;

            state.isAuthenticated = false;

        },

        updateAccessToken(state, action) {

            state.accessToken = action.payload;

            localStorage.setItem(
                "accessToken",
                action.payload
            );

        },

        updateUser(state, action) {

            state.user = action.payload;

            localStorage.setItem(

                "user",

                JSON.stringify(action.payload)

            );

        },

        logout(state) {

            state.user = null;

            state.accessToken = null;

            state.refreshToken = null;

            state.loading = false;

            state.error = null;

            state.isAuthenticated = false;

            localStorage.removeItem("user");

            localStorage.removeItem("accessToken");

            localStorage.removeItem("refreshToken");

        }

    }

});

export const {

    loginStart,

    loginSuccess,

    loginFailure,

    updateAccessToken,

    updateUser,

    logout

} = authSlice.actions;

export default authSlice.reducer;