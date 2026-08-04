import apiClient from "./api/apiClient.js";

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

export async function loginUser(credentials) {

    console.log("✓ authService.js loaded");
    console.log("Credentials:", credentials);

    const response = await apiClient.post(
        "/auth/login",
        credentials
    );

    console.log("Response:", response);

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Refresh Token
|--------------------------------------------------------------------------
*/

export async function refreshToken(refreshToken) {

    const response = await apiClient.post(
        "/auth/refresh",
        { refreshToken }
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
    refreshToken,
    getCurrentUser
};