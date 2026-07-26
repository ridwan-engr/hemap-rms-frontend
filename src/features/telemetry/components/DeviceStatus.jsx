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

import DevicesIcon from "@mui/icons-material/Devices";

import useTelemetry from "../hooks/useTelemetry";

/*
|--------------------------------------------------------------------------
| Device Item
|--------------------------------------------------------------------------
*/

function DeviceItem({

    name,

    status,

    lastSeen

}) {

    return (

        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ py: 1 }}
        >

            <Stack>

                <Typography fontWeight={600}>

                    {name}

                </Typography>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >

                    Last Seen: {lastSeen ?? "--"}

                </Typography>

            </Stack>

            <Chip

                label={status ?? "UNKNOWN"}

                color={

                    status === "ONLINE"

                        ? "success"

                        : status === "WARNING"

                            ? "warning"

                            : status === "OFFLINE"

                                ? "error"

                                : "default"

                }

                size="small"

            />

        </Stack>

    );

}

/*
|--------------------------------------------------------------------------
| Device Status
|--------------------------------------------------------------------------
*/

export default function DeviceStatus({

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

    const devices = telemetry?.devices || {};

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

                        Device Status

                    </Typography>

                    <DevicesIcon color="primary" />

                </Stack>

                <Divider sx={{ my: 2 }} />

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{ xs: 12 }}>

                        <DeviceItem

                            name="Battery Bank"

                            status={devices.battery?.status}

                            lastSeen={devices.battery?.lastSeen}

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <DeviceItem

                            name="Solar Controller"

                            status={devices.solar?.status}

                            lastSeen={devices.solar?.lastSeen}

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <DeviceItem

                            name="Generator"

                            status={devices.generator?.status}

                            lastSeen={devices.generator?.lastSeen}

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <DeviceItem

                            name="Utility Grid"

                            status={devices.grid?.status}

                            lastSeen={devices.grid?.lastSeen}

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <DeviceItem

                            name="Inverter"

                            status={devices.inverter?.status}

                            lastSeen={devices.inverter?.lastSeen}

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <DeviceItem

                            name="Rectifier"

                            status={devices.rectifier?.status}

                            lastSeen={devices.rectifier?.lastSeen}

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <DeviceItem

                            name="Smart Meter"

                            status={devices.smartMeter?.status}

                            lastSeen={devices.smartMeter?.lastSeen}

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <DeviceItem

                            name="Weather Station"

                            status={devices.weather?.status}

                            lastSeen={devices.weather?.lastSeen}

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <DeviceItem

                            name="Communication Gateway"

                            status={devices.gateway?.status}

                            lastSeen={devices.gateway?.lastSeen}

                        />

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}