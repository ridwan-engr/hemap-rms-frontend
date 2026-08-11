import {
    Box,
    Card,
    CardContent,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";

import useVRM from "../hooks/useVRM.js";

import VRMInstallationHeader
    from "../components/VRMInstallationHeader.jsx";

import VRMInstallationIdentity
    from "../components/VRMInstallationIdentity.jsx";

import VRMLiveDashboard
    from "../components/VRMLiveDashboard.jsx";

import VRMSyncStatus
    from "../components/VRMSyncStatus.jsx";

import VRMRawData
    from "../components/VRMRawData.jsx";

/**
 * ============================================================================
 * VRM Installation Page
 * ============================================================================
 *
 * Page-level orchestration only.
 *
 * Architecture:
 *
 * VRMInstallationPage
 *        ↓
 * useVRM()
 *        ↓
 * vrmSlice
 *        ↓
 * vrmApi
 *        ↓
 * HEMAP Backend
 *        ↓
 * Victron VRM
 *
 * ============================================================================
 *
 * Normalized data flow:
 *
 * Victron VRM
 *        ↓
 * normalizeVRM.js
 *        ↓
 * vrmSlice
 *        ↓
 * useVRM()
 *        ↓
 * VRMInstallationPage
 *        ↓
 * Presentation components
 *
 * ============================================================================
 *
 * This page does NOT:
 *
 * - call Axios
 * - call vrmApi directly
 * - access Redux directly
 * - parse raw VRM telemetry
 * - calculate VRM metrics
 * - normalize VRM responses
 *
 * VRMInstallationPage is responsible only for orchestration.
 *
 * ============================================================================
 */

export default function VRMInstallationPage() {

    const {
        installation,
        dashboard,
        statistics,
        loading,
        refreshing,
        error,
        lastUpdated,
        refresh
    } = useVRM();

    /*
    |--------------------------------------------------------------------------
    | Initial Loading
    |--------------------------------------------------------------------------
    */

    if (
        loading &&
        !installation &&
        !dashboard
    ) {
        return (
            <Box
                sx={{
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Safe Normalized Data
    |--------------------------------------------------------------------------
    */

    const normalizedInstallation =
        installation ?? {};

    const normalizedDashboard =
        dashboard ?? {};

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Stack spacing={3}>

            {/* ==========================================================
                INSTALLATION HEADER
            ========================================================== */}

            <VRMInstallationHeader
                installation={
                    normalizedInstallation
                }
                dashboard={
                    normalizedDashboard
                }
                lastUpdated={
                    lastUpdated
                }
                refreshing={
                    refreshing
                }
                onRefresh={
                    refresh
                }
            />


            {/* ==========================================================
                ERROR
            ========================================================== */}

            {error && (
                <Card>
                    <CardContent>
                        <Typography
                            color="error"
                            fontWeight={600}
                        >
                            {formatError(error)}
                        </Typography>
                    </CardContent>
                </Card>
            )}


            {/* ==========================================================
                INSTALLATION IDENTITY
            ========================================================== */}

            <VRMInstallationIdentity
                installation={
                    normalizedInstallation
                }
                dashboard={
                    normalizedDashboard
                }
            />


            {/* ==========================================================
                LIVE VRM DASHBOARD
            ========================================================== */}

            <VRMLiveDashboard
                dashboard={
                    normalizedDashboard
                }
                lastUpdated={
                    lastUpdated
                }
            />


            {/* ==========================================================
                SYNCHRONIZATION STATUS
            ========================================================== */}

            <VRMSyncStatus
                installation={
                    normalizedInstallation
                }
                dashboard={
                    normalizedDashboard
                }
                lastUpdated={
                    lastUpdated
                }
                refreshing={
                    refreshing
                }
                onRefresh={
                    refresh
                }
            />


            {/* ==========================================================
                RAW VRM DATA
            ========================================================== */}

            <VRMRawData
                dashboard={
                    normalizedDashboard
                }
                statistics={
                    statistics
                }
            />

        </Stack>
    );
}

/**
 * ============================================================================
 * Error Formatter
 * ============================================================================
 */

function formatError(error) {

    if (
        typeof error === "string"
    ) {
        return error;
    }

    if (
        error?.message
    ) {
        return error.message;
    }

    if (
        error?.error?.message
    ) {
        return error.error.message;
    }

    return "Unable to load VRM data.";
}