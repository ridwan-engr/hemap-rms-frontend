import {

    createContext,
    useContext,
    useEffect,
    useState

} from "react";

import authService from "../services/authService.js";

const AuthContext = createContext(null);

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
*/

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(

        localStorage.getItem("accessToken")

    );

    const [loading, setLoading] = useState(true);

    /*
    |--------------------------------------------------------------------------
    | Load Current User
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        async function loadUser() {

            if (!token) {

                setLoading(false);

                return;

            }

            try {

                const profile =
                    await authService.getProfile();

                setUser(profile);

            }

            catch {

                logout();

            }

            finally {

                setLoading(false);

            }

        }

        loadUser();

    }, [token]);

    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */

    async function login(credentials) {

        const response =
            await authService.login(credentials);

        localStorage.setItem(

            "accessToken",

            response.token
        );

        setToken(response.token);

        setUser(response.user);

        return response;

    }

    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    function logout() {

        localStorage.removeItem("accessToken");

        setUser(null);

        setToken(null);

    }

    /*
    |--------------------------------------------------------------------------
    | Refresh User
    |--------------------------------------------------------------------------
    */

    async function refreshUser() {

        if (!token) return;

        const profile =
            await authService.getProfile();

        setUser(profile);

    }

    return (

        <AuthContext.Provider

            value={{

                user,

                token,

                loading,

                login,

                logout,

                refreshUser,

                isAuthenticated: !!user

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
*/

export function useAuth() {

    const context =
        useContext(AuthContext);

    if (!context) {

        throw new Error(

            "useAuth must be used inside AuthProvider."

        );

    }

    return context;

}