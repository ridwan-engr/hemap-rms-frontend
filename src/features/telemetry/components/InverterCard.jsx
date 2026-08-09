import {
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    LinearProgress,
    Stack,
    Typography
} from "@mui/material";

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

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

function getInverterStatusColor(status) {

    switch (
        String(status || "").toUpperCase()
    ) {

        case "ONLINE":
        case "RUNNING":
            return "success";

        case "WARNING":
        case "STANDBY":
            return "warning";

        case "FAULT":
        case "OFFLINE":
            return "error";

        default:
            return "default";
    }
}

export default function InverterCard({
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
                    <Typography
                        color="error"
                        variant="body2"
                    >
                        {typeof error === "string"
                            ? error
                            : error?.message ||
                              "Failed to load inverter telemetry."
                        }
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Inverter Data
    |--------------------------------------------------------------------------
    */

    const inverter =
        telemetry?.inverter ?? {};

    const rawLoad =
        Number(
            inverter.loadPercentage ?? 0
        );

    const load =
        Math.min(
            100,
            Math.max(
                0,
                Number.isFinite(rawLoad)
                    ? rawLoad
                    : 0
            )
        );

    const status =
        String(
            inverter.status ?? "UNKNOWN"
        ).toUpperCase();

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
                        Inverter
                    </Typography>

                    <PowerSettingsNewIcon
                        color={
                            getInverterStatusColor(status) ===
                            "error"
                                ? "error"
                                : "primary"
                        }
                    />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Inverter Load
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight={700}
                    mb={1}
                >
                    {load}%
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={load}
                    color={
                        load < 70
                            ? "success"
                            : load < 90
                                ? "warning"
                                : "error"
                    }
                    sx={{
                        height: 8,
                        borderRadius: 4
                    }}
                />

                <Divider sx={{ my: 2 }} />

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Output Power"
                            value={inverter.outputPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Input Voltage"
                            value={inverter.inputVoltage}
                            unit="V"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Output Voltage"
                            value={inverter.outputVoltage}
                            unit="V"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Output Current"
                            value={inverter.outputCurrent}
                            unit="A"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Frequency"
                            value={inverter.frequency}
                            unit="Hz"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Efficiency"
                            value={inverter.efficiency}
                            unit="%"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Temperature"
                            value={inverter.temperature}
                            unit="°C"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Daily Energy"
                            value={inverter.dailyEnergy}
                            unit="kWh"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Total Energy"
                            value={inverter.totalEnergy}
                            unit="kWh"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Mode"
                            value={inverter.mode}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Runtime"
                            value={inverter.runtime}
                            unit="hrs"
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
                                variant="body2"
                            >
                                Status
                            </Typography>

                            <Chip
                                label={status}
                                color={getInverterStatusColor(status)}
                                size="small"
                            />
                        </Stack>
                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
}