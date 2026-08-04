import {

    createSlice,
    createAsyncThunk

} from "@reduxjs/toolkit";

import {

    loginUser

} from "../../services/authService.js";

/*
|--------------------------------------------------------------------------
| Async Login
|--------------------------------------------------------------------------
*/

export const login = createAsyncThunk(

    "auth/login",

    async (credentials, thunkAPI) => {

        try {

            return await loginUser(credentials);

        }

        catch (error) {

            console.log("LOGIN ERROR:", error);
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);

            return thunkAPI.rejectWithValue(

                error.response?.data?.message ||

                "Login failed."

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

    user: JSON.parse(

        localStorage.getItem("user") || "null"

    ),

    accessToken: localStorage.getItem("accessToken"),

    refreshToken: localStorage.getItem("refreshToken"),

    isAuthenticated: !!localStorage.getItem("accessToken"),

    loading: false,

    error: null

};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const authSlice = createSlice({

    name: "auth",

    initialState,

    reducers: {

        logout(state) {

            state.user = null;

            state.accessToken = null;

            state.refreshToken = null;

            state.isAuthenticated = false;

            state.loading = false;

            state.error = null;

            localStorage.clear();

        }

    },

    extraReducers: (builder) => {

        builder

            .addCase(login.pending, (state) => {

                state.loading = true;

                state.error = null;

            })

            .addCase(login.fulfilled, (state, action) => {

                const {

                    user,
                    accessToken,
                    refreshToken

                } = action.payload.data;

                state.loading = false;

                state.user = user;

                state.accessToken = accessToken;

                state.refreshToken = refreshToken;

                state.isAuthenticated = true;

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

            })

            .addCase(login.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

                state.isAuthenticated = false;

            });

    }

});

export const {


    logout

} = authSlice.actions;

export default authSlice.reducer;