import {
    Alert,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import RouterIcon from "@mui/icons-material/Router";

import useTelemetry from "../hooks/useTelemetry";

function Metric({ label, value, unit = "" }) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
        >
            <Typography
                variant="body2"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                variant="body2"
                fontWeight={600}
                sx={{ textAlign: "right" }}
            >
                {value !== null &&
                value !== undefined &&
                value !== ""
                    ? `${value}${unit ? ` ${unit}` : ""}`
                    : "--"}
            </Typography>
        </Stack>
    );
}

export default function CommunicationStatus({
    siteId
}) {

    const {
        telemetry,
        loading,
        error
    } = useTelemetry({
        siteId
    });

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <Card>
                <CardContent>
                    <Stack
                        py={5}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <CircularProgress />
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (
            <Card>
                <CardContent>
                    <Alert severity="error">
                        {typeof error === "string"
                            ? error
                            : error?.message ||
                              "Failed to load communication telemetry."
                        }
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Communication Data
    |--------------------------------------------------------------------------
    */

    const communication =
        telemetry?.communication ?? {};

    const status =
        String(
            communication.status ?? "UNKNOWN"
        ).toUpperCase();

    const statusColor =
        status === "ONLINE"
            ? "success"
            : status === "DEGRADED"
                ? "warning"
                : status === "OFFLINE"
                    ? "error"
                    : "default";

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Card>
            <CardContent>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Communication Status
                    </Typography>

                    <RouterIcon color="primary" />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Gateway"
                            value={communication.gateway}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Connection"
                            value={communication.connection}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Signal Strength"
                            value={communication.signalStrength}
                            unit="%"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Network Type"
                            value={communication.networkType}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="IP Address"
                            value={communication.ipAddress}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Latency"
                            value={communication.latency}
                            unit="ms"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Packet Loss"
                            value={communication.packetLoss}
                            unit="%"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Download"
                            value={communication.downloadSpeed}
                            unit="Mbps"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Upload"
                            value={communication.uploadSpeed}
                            unit="Mbps"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Last Heartbeat"
                            value={communication.lastHeartbeat}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Last Synchronization"
                            value={communication.lastSync}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography
                                color="text.secondary"
                            >
                                Status
                            </Typography>

                            <Chip
                                label={status}
                                color={statusColor}
                                size="small"
                            />
                        </Stack>
                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
}