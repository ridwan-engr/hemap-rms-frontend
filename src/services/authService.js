import apiClient from "./api/apiClient.js";

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export async function loginUser(credentials) {

    const response = await apiClient.post(

        "/auth/login",

        credentials

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Logout
|--------------------------------------------------------------------------
*/

export async function logoutUser() {

    const response = await apiClient.post(

        "/auth/logout"

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Refresh Token
|--------------------------------------------------------------------------
*/

export async function refreshUserToken(refreshToken) {

    const response = await apiClient.post(

        "/auth/refresh",

        {

            refreshToken

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

export async function getCurrentUser() {

    const response = await apiClient.get(

        "/auth/me"

    );

    return response.data;

}

export default {

    loginUser,

    logoutUser,

    refreshUserToken,

    getCurrentUser

};