export const selectUser = state =>
    state.auth.user;

export const selectToken = state =>
    state.auth.token;

export const isAuthenticated = state =>
    state.auth.authenticated;

export const authLoading = state =>
    state.auth.loading;