import {
    Alert,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    LinearProgress,
    Stack,
    Typography
} from "@mui/material";

import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

/*
|--------------------------------------------------------------------------
| Reusable Metric
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

function StatusChip({ status }) {
    const normalizedStatus = String(
        status ?? "UNKNOWN"
    ).toUpperCase();

    let color = "default";

    switch (normalizedStatus) {
        case "ONLINE":
        case "NORMAL":
            color = "success";
            break;

        case "WARNING":
        case "DEGRADED":
            color = "warning";
            break;

        case "FAULT":
        case "OFFLINE":
            color = "error";
            break;

        default:
            color = "default";
    }

    return (
        <Chip
            label={normalizedStatus}
            color={color}
            size="small"
        />
    );
}

/*
|--------------------------------------------------------------------------
| Rectifier Card
|--------------------------------------------------------------------------
*/

export default function RectifierCard({
    telemetry,
    loading,
    error
}) {
    if (loading) {
        return (
            <Card>
                <CardContent>
                    <Stack
                        py={5}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography
                            color="text.secondary"
                        >
                            Loading rectifier telemetry...
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card>
                <CardContent>
                    <Alert severity="error">
                        {typeof error === "string"
                            ? error
                            : error?.message ||
                            "Failed to load rectifier telemetry."}
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    const rectifier =
        telemetry?.rectifier ?? {};

    const rawLoad = Number(
        rectifier.loadPercentage ?? 0
    );

    const load = Math.min(
        Math.max(
            Number.isFinite(rawLoad)
                ? rawLoad
                : 0,
            0
        ),
        100
    );

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
                        Rectifier
                    </Typography>

                    <ElectricalServicesIcon
                        color="primary"
                    />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Rectifier Load
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight={700}
                    mb={1}
                >
                    {load.toFixed(1)}%
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
                            label="Input Voltage"
                            value={rectifier.inputVoltage}
                            unit="VAC"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Output Voltage"
                            value={rectifier.outputVoltage}
                            unit="VDC"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Output Current"
                            value={rectifier.outputCurrent}
                            unit="A"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Output Power"
                            value={rectifier.outputPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Efficiency"
                            value={rectifier.efficiency}
                            unit="%"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Temperature"
                            value={rectifier.temperature}
                            unit="°C"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Module Count"
                            value={rectifier.moduleCount}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Active Modules"
                            value={rectifier.activeModules}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="DC Bus Voltage"
                            value={rectifier.dcBusVoltage}
                            unit="V"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="AC Frequency"
                            value={rectifier.frequency}
                            unit="Hz"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Runtime"
                            value={rectifier.runtime}
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

                            <StatusChip
                                status={rectifier.status}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}