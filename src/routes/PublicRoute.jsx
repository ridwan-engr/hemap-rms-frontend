import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * ============================================================================
 * Public Route
 * ============================================================================
 * Prevents authenticated users from accessing public pages such as Login.
 *
 * Compatible with:
 *  - React Router v7
 *  - Redux Toolkit
 *  - HEMAP-RMS Authentication
 * ============================================================================
 */

export default function PublicRoute() {

    const {
        isAuthenticated,
        accessToken,
        loading
    } = useSelector((state) => state.auth);

    /*
    |--------------------------------------------------------------------------
    | Authentication Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    fontSize: "18px"
                }}
            >
                Loading...
            </div>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Already Authenticated
    |--------------------------------------------------------------------------
    */

    if (isAuthenticated && accessToken) {

        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Public Pages
    |--------------------------------------------------------------------------
    */

    return <Outlet />;

}