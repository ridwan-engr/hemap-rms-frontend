import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoutes.jsx";
import AppLayout from "./layouts/AppLayouts.jsx";

/*
|--------------------------------------------------------------------------
| Authentication|--------------------------------------------------------------------------
*/



import LoginPage from "./features/auth/pages/LoginPage.jsx";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

import DashboardPage from "./features/dashboard/pages/DashboardPage.jsx";

/*
|--------------------------------------------------------------------------
| Sites
|--------------------------------------------------------------------------
*/

import SitesPage from "./features/sites/pages/SitesPage.jsx";

/*
|--------------------------------------------------------------------------
| Telemetry
|--------------------------------------------------------------------------
*/

import TelemetryPage from "./features/telemetry/pages/TelemetryPage.jsx";

/*
|--------------------------------------------------------------------------
| Analytics
|--------------------------------------------------------------------------
*/

import AnalyticsPage from "./features/analytics/pages/AnalyticsPage.jsx";

/*
|--------------------------------------------------------------------------
| Reports
|--------------------------------------------------------------------------
*/

import ReportsPage from "./features/reports/pages/ReportsPage.jsx";

/*
|--------------------------------------------------------------------------
| Optimization
|--------------------------------------------------------------------------
*/

import OptimizationPage from "./features/optimization/pages/OptimizationPage.jsx";

/*
|--------------------------------------------------------------------------
| Users
|--------------------------------------------------------------------------
*/

import UsersPage from "./features/users/pages/UserPage.jsx";

/*
|--------------------------------------------------------------------------
| Settings
|--------------------------------------------------------------------------
*/

import SettingsPage from "./features/settings/pages/SettingsPage.jsx";

/*
|--------------------------------------------------------------------------
| Alarms
|--------------------------------------------------------------------------
*/

import AlarmPage from "./features/alarms/pages/AlarmPage.jsx";

/*
|--------------------------------------------------------------------------
| Installation
|--------------------------------------------------------------------------
*/

import InstallationPage from "./features/installation/pages/InstallationPage.jsx";

/*
|--------------------------------------------------------------------------
| Statistics
|--------------------------------------------------------------------------
*/

import StatisticsPage from "./features/statistics/pages/StatisticsPage.jsx";

export default function App() {

    return (

        <Routes>

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                element={<ProtectedRoute />}
            >

                <Route
                    element={<AppLayout />}
                >

                    <Route
                        index
                        element={
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={<DashboardPage />}
                    />

                    <Route
                        path="/sites"
                        element={<SitesPage />}
                    />

                    <Route
                        path="/telemetry"
                        element={<TelemetryPage />}
                    />

                    <Route
                        path="/analytics"
                        element={<AnalyticsPage />}
                    />

                    <Route
                        path="/reports"
                        element={<ReportsPage />}
                    />

                    <Route
                        path="/optimization"
                        element={<OptimizationPage />}
                    />

                    <Route
                        path="/users"
                        element={<UsersPage />}
                    />

                    <Route
                        path="/settings"
                        element={<SettingsPage />}
                    />

                    <Route
                        path="/alarms"
                        element={<AlarmPage />}
                    />

                    <Route
                        path="/installations"
                        element={<InstallationPage />}
                    />

                    <Route
                        path="/statistics"
                        element={<StatisticsPage />}
                    />

                </Route>

            </Route>

            <Route
                path="*"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />

        </Routes>

    );

}