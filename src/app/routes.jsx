import { Routes, Route, Navigate } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| Route Guards
|--------------------------------------------------------------------------
*/

import ProtectedRoutes from "../routes/ProtectedRoutes.jsx";
import PublicRoute from "../routes/PublicRoute.jsx";

/*
|--------------------------------------------------------------------------
| Layouts
|--------------------------------------------------------------------------
*/

import AuthLayout from "../layouts/AuthLayouts.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

/*
|--------------------------------------------------------------------------
| Pages
|--------------------------------------------------------------------------
*/

import Login from "../pages/Login.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import NotFound from "../pages/NotFound.jsx";
import ReportsPage from "../features/reports/pages/ReportsPage.jsx";

/**
 * ============================================================================
 * Application Routes
 * ============================================================================
 * Central routing configuration for HEMAP-RMS.
 *
 * Every backend module will eventually have a matching frontend route.
 * ============================================================================
 */

export default function AppRoutes() {

    return (

        <Routes>

            {/* ============================================================
             * Public Routes
             * ============================================================
             */}

            <Route element={<PublicRoute />}>

                <Route element={<AuthLayout />}>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                </Route>

            </Route>

            {/* ============================================================
             * Protected Routes
             * ============================================================
             */}

            <Route element={<ProtectedRoutes />}>

                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    {/*
                    ============================================================
                    Backend Modules
                    ============================================================
                    */}

                    <Route
                        path="/sites"
                        element={<div>Sites Module</div>}
                    />

                    <Route
                        path="/installations"
                        element={<div>Installations Module</div>}
                    />

                    <Route
                        path="/telemetry"
                        element={<div>Telemetry Module</div>}
                    />

                    <Route
                        path="/battery"
                        element={<div>Battery Module</div>}
                    />

                    <Route
                        path="/solar"
                        element={<div>Solar Module</div>}
                    />

                    <Route
                        path="/generator"
                        element={<div>Generator Module</div>}
                    />

                    <Route
                        path="/grid"
                        element={<div>Grid Module</div>}
                    />

                    <Route
                        path="/analytics"
                        element={<div>Analytics Module</div>}
                    />

                    <Route
                        path="/optimization"
                        element={<div>Optimization Module</div>}
                    />

                    <Route
                        path="/notifications"
                        element={<div>Notifications Module</div>}
                    />

                    <Route
                        path="/settings"
                        element={<div>Settings Module</div>}
                    />

                    <Route
                        path="/users"
                        element={<div>Users Module</div>}
                    />

                    <Route
                        path="/reports"
                        element={<ReportsPage />}
                    />

                </Route>

            </Route>

            {/* ============================================================
             * 404
             * ============================================================
             */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>

    );

}