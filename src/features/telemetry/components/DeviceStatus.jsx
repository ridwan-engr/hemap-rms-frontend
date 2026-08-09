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

import DevicesIcon from "@mui/icons-material/Devices";

import useTelemetry from "../hooks/useTelemetry";

function DeviceItem({
    name,
    status,
    lastSeen
}) {

    const normalizedStatus =
        String(
            status ?? "UNKNOWN"
        ).toUpperCase();

    const color =
        normalizedStatus === "ONLINE"
            ? "success"
            : normalizedStatus === "WARNING"
                ? "warning"
                : normalizedStatus === "OFFLINE"
                    ? "error"
                    : "default";

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                py: 1,
                width: "100%"
            }}
        >

            <Stack>
                <Typography
                    fontWeight={600}
                >
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
                label={normalizedStatus}
                color={color}
                size="small"
            />

        </Stack>
    );
}

export default function DeviceStatus({
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
                              "Failed to load device status."
                        }
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Device Data
    |--------------------------------------------------------------------------
    */

    const devices =
        telemetry?.devices ?? {};

    const deviceList = [
        {
            name: "Battery Bank",
            device: devices.battery
        },
        {
            name: "Solar Controller",
            device: devices.solar
        },
        {
            name: "Generator",
            device: devices.generator
        },
        {
            name: "Utility Grid",
            device: devices.grid
        },
        {
            name: "Inverter",
            device: devices.inverter
        },
        {
            name: "Rectifier",
            device: devices.rectifier
        },
        {
            name: "Smart Meter",
            device: devices.smartMeter
        },
        {
            name: "Weather Station",
            device: devices.weather
        },
        {
            name: "Communication Gateway",
            device: devices.gateway
        }
    ];

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
                        Device Status
                    </Typography>

                    <DevicesIcon color="primary" />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Grid
                    container
                    spacing={2}
                >
                    {deviceList.map(
                        ({
                            name,
                            device
                        }) => (
                            <Grid
                                size={{ xs: 12 }}
                                key={name}
                            >
                                <DeviceItem
                                    name={name}
                                    status={device?.status}
                                    lastSeen={device?.lastSeen}
                                />
                            </Grid>
                        )
                    )}
                </Grid>

            </CardContent>
        </Card>
    );
}