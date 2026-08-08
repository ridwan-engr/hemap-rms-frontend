import { useDispatch, useSelector } from "react-redux";

import {

    login,

    logout

} from "../../store/slices/authSlice";

export function useAuth() {

    const dispatch = useDispatch();

    const auth = useSelector(

        state => state.auth

    );

    async function signIn(credentials) {

        return dispatch(

            login(credentials)

        );

    }

    function signOut() {

        dispatch(logout());

    }

    return {

        ...auth,

        signIn,

        signOut

    };

}