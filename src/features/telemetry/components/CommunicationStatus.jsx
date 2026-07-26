import {
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

/*
|--------------------------------------------------------------------------
| Metric
|--------------------------------------------------------------------------
*/

function Metric({

    label,

    value,

    unit = ""

}) {

    return (

        <Stack
            direction="row"
            justifyContent="space-between"
        >

            <Typography color="text.secondary">

                {label}

            </Typography>

            <Typography fontWeight={600}>

                {value ?? "--"} {unit}

            </Typography>

        </Stack>

    );

}

/*
|--------------------------------------------------------------------------
| Communication Status
|--------------------------------------------------------------------------
*/

export default function CommunicationStatus({

    siteId

}) {

    const {

        telemetry,

        loading

    } = useTelemetry({

        siteId

    });

    if (loading) {

        return (

            <Card>

                <CardContent>

                    <Stack
                        py={5}
                        alignItems="center"
                    >

                        <CircularProgress />

                    </Stack>

                </CardContent>

            </Card>

        );

    }

    const communication = telemetry?.communication || {};

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

                            <Typography color="text.secondary">

                                Status

                            </Typography>

                            <Chip

                                label={

                                    communication.status ||

                                    "UNKNOWN"

                                }

                                color={

                                    communication.status === "ONLINE"

                                        ? "success"

                                        : communication.status === "DEGRADED"

                                            ? "warning"

                                            : communication.status === "OFFLINE"

                                                ? "error"

                                                : "default"

                                }

                                size="small"

                            />

                        </Stack>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}