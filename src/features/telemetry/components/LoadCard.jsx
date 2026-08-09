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
| Status Chip
|--------------------------------------------------------------------------
*/

function StatusChip({ status }) {
    const normalizedStatus = String(
        status ?? "UNKNOWN"
    ).toUpperCase();

    let color = "default";

    switch (normalizedStatus) {
        case "NORMAL":
        case "ONLINE":
            color = "success";
            break;

        case "HIGH":
        case "WARNING":
        case "DEGRADED":
            color = "warning";
            break;

        case "OVERLOAD":
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
| Load Card
|--------------------------------------------------------------------------
*/

export default function LoadCard({
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
                            Loading load telemetry...
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
                            "Failed to load site load telemetry."}
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    const load = telemetry?.load ?? {};

    const rawLoadingPercentage = Number(
        load.loadingPercentage ?? 0
    );

    const loadingPercentage = Math.min(
        Math.max(
            Number.isFinite(rawLoadingPercentage)
                ? rawLoadingPercentage
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
                        Site Load
                    </Typography>

                    <ElectricalServicesIcon color="primary" />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Load Utilization
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight={700}
                    mb={1}
                >
                    {loadingPercentage.toFixed(1)}%
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={loadingPercentage}
                    color={
                        loadingPercentage < 70
                            ? "success"
                            : loadingPercentage < 90
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
                            label="Active Power"
                            value={load.activePower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Reactive Power"
                            value={load.reactivePower}
                            unit="kVAR"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Apparent Power"
                            value={load.apparentPower}
                            unit="kVA"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Voltage"
                            value={load.voltage}
                            unit="V"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Current"
                            value={load.current}
                            unit="A"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Frequency"
                            value={load.frequency}
                            unit="Hz"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Power Factor"
                            value={load.powerFactor}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Energy Today"
                            value={load.energyToday}
                            unit="kWh"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Energy This Month"
                            value={load.energyMonth}
                            unit="kWh"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Peak Demand"
                            value={load.peakDemand}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Connected Loads"
                            value={load.connectedLoads}
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
                                status={load.status}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}