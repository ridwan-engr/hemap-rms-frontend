import api from "../../api/axios.js";

export async function login(credentials) {
    const { data } = await api.post(
        "/auth/login",
        credentials
    );

    return data;
}

export async function logout() {
    const { data } = await api.post(
        "/auth/logout"
    );

    return data;
}

export async function forgotPassword(email) {
    const { data } = await api.post(
        "/auth/forgot-password",
        { email }
    );

    return data;
}

export async function resetPassword(payload) {
    const { data } = await api.post(
        "/auth/reset-password",
        payload
    );

    return data;
}

export async function verifyOTP(payload) {
    const { data } = await api.post(
        "/auth/verify-otp",
        payload
    );

    return data;
}

export async function refreshToken() {
    const { data } = await api.post(
        "/auth/refresh-token"
    );

    return data;
}

export async function me() {
    const { data } = await api.get(
        "/auth/me"
    );

    return data;
}