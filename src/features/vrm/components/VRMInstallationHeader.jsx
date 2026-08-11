import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import SensorsIcon from "@mui/icons-material/Sensors";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

/**
 * ============================================================================
 * HEMAP RMS
 * VRM Installation Header
 * ============================================================================
 *
 * Responsibilities:
 *
 * - Display VRM installation title and identity summary.
 * - Display connection status.
 * - Display last synchronization time.
 * - Trigger refresh through the callback supplied by VRMInstallationPage.
 *
 * This component:
 *
 * - does NOT call Axios
 * - does NOT access Redux
 * - does NOT call useVRM()
 * - does NOT normalize raw VRM data
 *
 * ============================================================================
 */

export default function VRMInstallationHeader({
    installation = {},
    dashboard = {},
    lastUpdated = null,
    refreshing = false,
    onRefresh
}) {
    const installationId =
        installation?.installationId ??
        dashboard?.installationId ??
        "—";

    const installationName =
        installation?.name ??
        installation?.installationName ??
        dashboard?.name ??
        "VRM Installation";

    const status = resolveStatus({
        status:
            dashboard?.status ??
            installation?.status,

        online:
            dashboard?.online ??
            installation?.online,

        connectionStatus:
            dashboard?.connectionStatus ??
            installation?.connectionStatus
    });

    return (
        <Stack
            direction={{
                xs: "column",
                md: "row"
            }}
            spacing={2}
            sx={{
                justifyContent: "space-between",
                alignItems: {
                    xs: "stretch",
                    md: "center"
                }
            }}
        >
            {/* Installation Identity */}

            <Stack spacing={0.75}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    {installationName}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Live Victron Remote Management data
                    integrated into HEMAP-RMS.
                </Typography>

                <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{
                        flexWrap: "wrap",
                        alignItems: "center",
                        mt: 0.5
                    }}
                >
                    <Chip
                        icon={<SensorsIcon />}
                        label={`VRM Installation ${installationId}`}
                        size="small"
                        variant="outlined"
                    />

                    <StatusChip
                        status={status}
                    />

                    {lastUpdated && (
                        <Chip
                            icon={<AccessTimeIcon />}
                            label={`Updated ${formatTimestamp(lastUpdated)}`}
                            size="small"
                            variant="outlined"
                        />
                    )}
                </Stack>
            </Stack>

            {/* Refresh */}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: {
                        xs: "flex-start",
                        md: "flex-end"
                    }
                }}
            >
                <Button
                    variant="contained"
                    startIcon={
                        refreshing ? (
                            <CircularProgress
                                size={18}
                                color="inherit"
                            />
                        ) : (
                            <RefreshIcon />
                        )
                    }
                    onClick={
                        typeof onRefresh === "function"
                            ? onRefresh
                            : undefined
                    }
                    disabled={
                        refreshing ||
                        typeof onRefresh !== "function"
                    }
                >
                    {refreshing
                        ? "Refreshing..."
                        : "Refresh"}
                </Button>
            </Box>
        </Stack>
    );
}

/**
 * ============================================================================
 * Status Resolver
 * ============================================================================
 */

function resolveStatus({
    status,
    online,
    connectionStatus
}) {
    if (
        connectionStatus !== null &&
        connectionStatus !== undefined &&
        connectionStatus !== ""
    ) {
        return normalizeStatus(connectionStatus);
    }

    if (
        status !== null &&
        status !== undefined &&
        status !== ""
    ) {
        const normalized = normalizeStatus(status);

        if (normalized !== "UNKNOWN") {
            return normalized;
        }
    }

    if (online === true) {
        return "ONLINE";
    }

    if (online === false) {
        return "OFFLINE";
    }

    return "UNKNOWN";
}

/**
 * ============================================================================
 * Status Normalizer
 * ============================================================================
 */

function normalizeStatus(value) {
    const normalized =
        String(value)
            .trim()
            .toUpperCase();

    switch (normalized) {
        case "CONNECTED":
        case "ACTIVE":
        case "OK":
            return "ONLINE";

        case "DISCONNECTED":
        case "INACTIVE":
            return "OFFLINE";

        case "ERROR":
        case "FAILED":
            return "FAULT";

        case "UNKNOWN":
            return "UNKNOWN";

        default:
            return normalized;
    }
}

/**
 * ============================================================================
 * Status Chip
 * ============================================================================
 */

function StatusChip({
    status
}) {
    const normalized =
        String(status || "UNKNOWN")
            .toUpperCase();

    let color = "default";

    if (normalized === "ONLINE") {
        color = "success";
    } else if (normalized === "WARNING") {
        color = "warning";
    } else if (
        normalized === "OFFLINE" ||
        normalized === "FAULT"
    ) {
        color = "error";
    }

    return (
        <Chip
            label={normalized}
            size="small"
            color={color}
        />
    );
}

/**
 * ============================================================================
 * Timestamp Formatter
 * ============================================================================
 */

function formatTimestamp(timestamp) {
    if (
        timestamp === null ||
        timestamp === undefined ||
        timestamp === ""
    ) {
        return "—";
    }

    const date = new Date(timestamp);

    if (!Number.isNaN(date.getTime())) {
        return date.toLocaleString();
    }

    return String(timestamp);
}