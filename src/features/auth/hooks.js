import { useDispatch, useSelector } from "react-redux";

import {

    loginStart,
    loginSuccess,
    loginFailure,
    logout

} from "./authSlice.js";

import * as api from "./api";

export function useAuth() {

    const dispatch = useDispatch();

    const auth = useSelector(
        state => state.auth
    );

    async function signIn(credentials) {

        dispatch(loginStart());

        try {

            const response =
                await api.login(credentials);

            localStorage.setItem(
                "token",
                response.token
            );

            dispatch(
                loginSuccess(response)
            );

        }

        catch (error) {

            dispatch(

                loginFailure(

                    error.response?.data?.message ||

                    "Login failed"

                )

            );

        }

    }

    function signOut() {

        localStorage.removeItem("token");

        dispatch(logout());

    }

    return {

        ...auth,

        signIn,

        signOut

    };

}