import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * ============================================================================
 * Protected Route
 * ============================================================================
 * Prevents unauthenticated users from accessing secured pages.
 *
 * Compatible with:
 *  - React Router v7
 *  - Redux Toolkit
 *  - HEMAP-RMS Authentication
 * ============================================================================
 */

export default function ProtectedRoutes() {

    const location = useLocation();

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
    | User Not Logged In
    |--------------------------------------------------------------------------
    */

    if (!isAuthenticated || !accessToken) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location
                }}
            />
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Authorized
    |--------------------------------------------------------------------------
    */

    return <Outlet />;

}