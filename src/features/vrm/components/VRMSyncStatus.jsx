import {
    Alert,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import SyncIcon from "@mui/icons-material/Sync";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutlineOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

/**
 * ============================================================================
 * HEMAP RMS
 * VRM Synchronization Status
 * ============================================================================
 *
 * Displays synchronization information supplied by the VRM feature state.
 *
 * This component does NOT:
 *
 * - call Axios
 * - access Redux
 * - call useVRM()
 * - perform synchronization itself
 *
 * The refresh operation is supplied by the parent page.
 *
 * ============================================================================
 */

export default function VRMSyncStatus({
    installation = {},
    dashboard = {},
    lastUpdated = null,
    refreshing = false,
    onRefresh
}) {

    const lastSync =
        installation?.lastSync ??
        installation?.sync?.lastSync ??
        null;

    const lastTelemetry =
        installation?.lastTelemetry ??
        installation?.sync?.lastTelemetry ??
        dashboard?.timestamp ??
        null;

    const status =
        resolveSyncStatus({
            lastUpdated,
            lastSync,
            lastTelemetry
        });

    return (
        <Card>

            <CardContent>

                <Stack spacing={2}>

                    {/* ------------------------------------------------------
                        Header
                    ------------------------------------------------------ */}

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={1}
                        sx={{
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                sm: "center"
                            }
                        }}
                    >

                        <Stack spacing={0.5}>

                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                VRM Synchronization
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Current synchronization and
                                telemetry freshness.
                            </Typography>

                        </Stack>

                        <SyncChip
                            status={status}
                        />

                    </Stack>

                    <Divider />

                    {/* ------------------------------------------------------
                        Synchronization Information
                    ------------------------------------------------------ */}

                    <Stack
                        direction={{
                            xs: "column",
                            md: "row"
                        }}
                        spacing={2}
                    >

                        <SyncItem
                            label="Last Successful Update"
                            value={formatTimestamp(
                                lastUpdated
                            )}
                        />

                        <SyncItem
                            label="Last VRM Sync"
                            value={formatTimestamp(
                                lastSync
                            )}
                        />

                        <SyncItem
                            label="Last Telemetry"
                            value={formatTimestamp(
                                lastTelemetry
                            )}
                        />

                    </Stack>

                    {/* ------------------------------------------------------
                        Status Message
                    ------------------------------------------------------ */}

                    {status === "NO_DATA" && (

                        <Alert
                            severity="warning"
                            icon={
                                <ErrorOutlineIcon />
                            }
                        >
                            No successful VRM synchronization
                            has been recorded yet.
                        </Alert>

                    )}

                    {status === "SYNCED" && (

                        <Alert
                            severity="success"
                            icon={
                                <CheckCircleIcon />
                            }
                        >
                            VRM data is available and the
                            feature has a successful update timestamp.
                        </Alert>

                    )}

                    {/* ------------------------------------------------------
                        Manual Refresh
                    ------------------------------------------------------ */}

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                    >

                        <Button
                            variant="outlined"
                            startIcon={
                                refreshing ? (
                                    <SyncIcon />
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
                                ? "Synchronizing..."
                                : "Synchronize Now"}
                        </Button>

                    </Stack>

                </Stack>

            </CardContent>

        </Card>
    );
}

/**
 * ============================================================================
 * Sync Status
 * ============================================================================
 */

function resolveSyncStatus({
    lastUpdated,
    lastSync,
    lastTelemetry
}) {

    if (
        lastUpdated ||
        lastSync ||
        lastTelemetry
    ) {
        return "SYNCED";
    }

    return "NO_DATA";
}

/**
 * ============================================================================
 * Sync Chip
 * ============================================================================
 */

function SyncChip({
    status
}) {

    if (status === "SYNCED") {

        return (
            <Chip
                icon={
                    <CheckCircleIcon />
                }
                label="SYNCED"
                color="success"
                size="small"
            />
        );

    }

    return (
        <Chip
            icon={
                <ErrorOutlineIcon />
            }
            label="NO DATA"
            color="warning"
            size="small"
        />
    );
}

/**
 * ============================================================================
 * Sync Item
 * ============================================================================
 */

function SyncItem({
    label,
    value
}) {

    return (
        <Stack
            spacing={0.25}
            sx={{
                minWidth: {
                    xs: "100%",
                    md: 220
                }
            }}
        >

            <Typography
                variant="caption"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                variant="body2"
                fontWeight={600}
            >
                {value}
            </Typography>

        </Stack>
    );
}

/**
 * ============================================================================
 * Timestamp Formatter
 * ============================================================================
 */

function formatTimestamp(
    timestamp
) {

    if (
        timestamp === null ||
        timestamp === undefined ||
        timestamp === ""
    ) {

        return "—";

    }

    const numericTimestamp =
        Number(timestamp);

    /*
     * VRM may return Unix timestamps in
     * either seconds or milliseconds.
     */

    if (
        Number.isFinite(
            numericTimestamp
        )
    ) {

        const milliseconds =
            numericTimestamp < 10000000000
                ? numericTimestamp * 1000
                : numericTimestamp;

        const date =
            new Date(
                milliseconds
            );

        if (
            !Number.isNaN(
                date.getTime()
            )
        ) {

            return date.toLocaleString();

        }

    }

    const date =
        new Date(timestamp);

    if (
        !Number.isNaN(
            date.getTime()
        )
    ) {

        return date.toLocaleString();

    }

    return String(timestamp);
}