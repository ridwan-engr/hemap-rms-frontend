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

import SpeedIcon from "@mui/icons-material/Speed";

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
| Smart Meter Card
|--------------------------------------------------------------------------
*/

export default function SmartMeterCard({
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
                            Loading smart meter telemetry...
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
                            "Failed to load smart meter telemetry."}
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    const meter =
        telemetry?.smartMeter ?? {};

    const rawPf = Number(
        meter.powerFactor
    );

    const pf = Math.min(
        Math.max(
            Number.isFinite(rawPf)
                ? rawPf
                : 0,
            0
        ),
        1
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
                        Smart Meter
                    </Typography>

                    <SpeedIcon color="primary" />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Power Factor
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight={700}
                    mb={1}
                >
                    {pf.toFixed(2)}
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={pf * 100}
                    color={
                        pf >= 0.95
                            ? "success"
                            : pf >= 0.85
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
                            label="Voltage"
                            value={meter.voltage}
                            unit="V"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Current"
                            value={meter.current}
                            unit="A"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Frequency"
                            value={meter.frequency}
                            unit="Hz"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Active Power"
                            value={meter.activePower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Reactive Power"
                            value={meter.reactivePower}
                            unit="kVAR"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Apparent Power"
                            value={meter.apparentPower}
                            unit="kVA"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Energy Import"
                            value={meter.energyImport}
                            unit="kWh"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Energy Export"
                            value={meter.energyExport}
                            unit="kWh"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Demand"
                            value={meter.maximumDemand}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="THD"
                            value={meter.thd}
                            unit="%"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Meter Serial"
                            value={meter.serialNumber}
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
                                status={meter.status}
                            />
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}