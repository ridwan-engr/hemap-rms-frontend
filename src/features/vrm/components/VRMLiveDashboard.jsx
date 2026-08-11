import {
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import SensorsIcon from "@mui/icons-material/Sensors";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import VRMBatteryCard
    from "./VRMBatteryCard.jsx";

import VRMSolarCard
    from "./VRMSolarCard.jsx";

import VRMGridCard
    from "./VRMGridCard.jsx";

import VRMGeneratorCard
    from "./VRMGeneratorCard.jsx";

import VRMLoadCard
    from "./VRMLoadCard.jsx";

/**
 * ============================================================================
 * HEMAP RMS
 * VRM Live Dashboard
 * ============================================================================
 *
 * Container for the current VRM energy state.
 *
 * This component consumes ONLY normalized VRM data.
 *
 * It:
 *
 * - does NOT call Axios
 * - does NOT access Redux
 * - does NOT call useVRM()
 * - does NOT inspect raw VRM API structures
 * - does NOT calculate telemetry values
 *
 * ============================================================================
 */

export default function VRMLiveDashboard({
    dashboard = {},
    lastUpdated = null
}) {
    const {
        status = "UNKNOWN",
        online = null,
        timestamp = null,
        connectionStatus = null,
        devices = null
    } = dashboard;

    const resolvedStatus =
        resolveStatus({
            status,
            online,
            connectionStatus
        });

    return (
        <Card>
            <CardContent>
                <Stack spacing={2}>

                    {/* Header */}

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={1.5}
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
                                Live VRM Dashboard
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Current operating condition
                                received from Victron VRM.
                            </Typography>
                        </Stack>

                        <StatusChip
                            status={resolvedStatus}
                        />
                    </Stack>

                    <Divider />

                    {/* Energy Cards */}

                    <Grid
                        container
                        spacing={2}
                    >
                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >
                            <VRMBatteryCard
                                dashboard={dashboard}
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >
                            <VRMSolarCard
                                power={
                                    dashboard?.solarPower ??
                                    null
                                }
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >
                            <VRMGridCard
                                power={
                                    dashboard?.gridPower ??
                                    null
                                }
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >
                            <VRMGeneratorCard
                                power={
                                    dashboard?.generatorPower ??
                                    null
                                }
                            />
                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >
                            <VRMLoadCard
                                power={
                                    dashboard?.loadPower ??
                                    null
                                }
                            />
                        </Grid>
                    </Grid>

                    <Divider />

                    {/* VRM Metadata */}

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={2}
                        useFlexGap
                        sx={{
                            flexWrap: "wrap"
                        }}
                    >
                        <MetadataItem
                            icon={
                                <SensorsIcon
                                    fontSize="small"
                                />
                            }
                            label="Devices"
                            value={
                                formatDevices(devices)
                            }
                        />

                        <MetadataItem
                            icon={
                                <AccessTimeIcon
                                    fontSize="small"
                                />
                            }
                            label="VRM Timestamp"
                            value={
                                formatTimestamp(
                                    timestamp
                                )
                            }
                        />

                        <MetadataItem
                            icon={
                                <AccessTimeIcon
                                    fontSize="small"
                                />
                            }
                            label="HEMAP Updated"
                            value={
                                formatTimestamp(
                                    lastUpdated
                                )
                            }
                        />
                    </Stack>

                </Stack>
            </CardContent>
        </Card>
    );
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
            .trim()
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
            size="small"
            label={normalized}
            color={color}
            variant="filled"
        />
    );
}

/**
 * ============================================================================
 * Metadata Item
 * ============================================================================
 */

function MetadataItem({
    icon,
    label,
    value
}) {
    return (
        <Stack
            direction="row"
            spacing={0.75}
            sx={{
                alignItems: "center"
            }}
        >
            {icon}

            <Typography
                variant="caption"
                color="text.secondary"
            >
                {label}:
            </Typography>

            <Typography
                variant="caption"
                fontWeight={600}
            >
                {value}
            </Typography>
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
        return normalizeStatus(
            connectionStatus
        );
    }

    if (
        status !== null &&
        status !== undefined &&
        status !== ""
    ) {
        const normalized =
            normalizeStatus(status);

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
 * Devices Formatter
 * ============================================================================
 */

function formatDevices(devices) {
    if (
        devices === null ||
        devices === undefined
    ) {
        return "—";
    }

    if (Array.isArray(devices)) {
        return devices.length.toLocaleString();
    }

    if (typeof devices === "number") {
        return devices.toLocaleString();
    }

    return String(devices);
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

    const numericTimestamp =
        Number(timestamp);

    if (
        Number.isFinite(
            numericTimestamp
        )
    ) {
        /*
         * VRM timestamps may be supplied
         * in seconds or milliseconds.
         */

        const milliseconds =
            numericTimestamp < 10000000000
                ? numericTimestamp * 1000
                : numericTimestamp;

        const date =
            new Date(milliseconds);

        if (!Number.isNaN(date.getTime())) {
            return date.toLocaleString();
        }
    }

    const date =
        new Date(timestamp);

    if (!Number.isNaN(date.getTime())) {
        return date.toLocaleString();
    }

    return String(timestamp);
}