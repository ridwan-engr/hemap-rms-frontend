import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import SensorsIcon from "@mui/icons-material/Sensors";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

import useVRM from "../hooks/useVRM.js";

/*
|--------------------------------------------------------------------------
| VRM Installation Page
|--------------------------------------------------------------------------
|
| This page consumes ONLY useVRM().
|
| Architecture:
|
| VRMInstallationPage
|        ↓
| useVRM()
|        ↓
| vrmSlice
|        ↓
| vrmApi
|        ↓
| HEMAP Backend
|        ↓
| Victron VRM
|
| The VRM access token and installation ID remain backend-only.
|
|--------------------------------------------------------------------------
*/

export default function VRMInstallationPage() {

    const {
        installation,
        dashboard,
        statistics,
        loading,
        refreshing,
        error,
        lastUpdated,
        refresh
    } = useVRM();

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const handleRefresh = async () => {

        try {

            await refresh();

        } catch (refreshError) {

            console.error(
                "VRM refresh failed:",
                refreshError
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Initial Loading
    |--------------------------------------------------------------------------
    */

    if (loading && !installation && !dashboard) {

        return (

            <Box
                sx={{
                    minHeight: "70vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >

                <CircularProgress />

            </Box>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Installation Data
    |--------------------------------------------------------------------------
    */

    const installationId =
        installation?.installationId ??
        dashboard?.installationId ??
        "—";

    const installationData =
        installation?.dashboard ??
        dashboard ??
        {};

    /*
    |--------------------------------------------------------------------------
    | VRM Status
    |--------------------------------------------------------------------------
    */

    const status =
        installationData?.status ??
        installationData?.connectionStatus ??
        installationData?.online
            ? "ONLINE"
            : "UNKNOWN";

    /*
    |--------------------------------------------------------------------------
    | Dashboard Values
    |--------------------------------------------------------------------------
    |
    | VRM responses can vary depending on the installation.
    | These fallbacks allow the page to display common VRM values
    | without assuming a single telemetry structure.
    |
    */

    const currentPower =
        getValue(
            installationData,
            [
                "power",
                "load",
                "consumption",
                "currentPower",
                "totalPower"
            ]
        );

    const solarPower =
        getValue(
            installationData,
            [
                "solar",
                "solarPower",
                "pvPower",
                "pv"
            ]
        );

    const batterySoc =
        getValue(
            installationData,
            [
                "batterySoc",
                "soc",
                "batterySOC",
                "stateOfCharge"
            ]
        );

    const batteryPower =
        getValue(
            installationData,
            [
                "batteryPower",
                "battery"
            ]
        );

    const gridPower =
        getValue(
            installationData,
            [
                "gridPower",
                "grid"
            ]
        );

    const generatorPower =
        getValue(
            installationData,
            [
                "generatorPower",
                "generator"
            ]
        );

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <Stack spacing={3}>

            {/* ----------------------------------------------------------
                Header
            ---------------------------------------------------------- */}

            <Stack
                direction={{
                    xs: "column",
                    md: "row"
                }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{
                    xs: "stretch",
                    md: "center"
                }}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        VRM Installation
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Live Victron Remote Management data
                        integrated into HEMAP-RMS
                    </Typography>

                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{ mt: 1 }}
                    >

                        <Chip
                            icon={<SensorsIcon />}
                            label={
                                `VRM Installation ${installationId}`
                            }
                            size="small"
                            variant="outlined"
                        />

                        <StatusChip
                            status={status}
                        />

                    </Stack>

                    {lastUpdated && (

                        <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            sx={{ mt: 1 }}
                        >
                            Last Updated:{" "}
                            {new Date(
                                lastUpdated
                            ).toLocaleString()}
                        </Typography>

                    )}

                </Box>

                <Button
                    variant="contained"
                    startIcon={
                        refreshing ? (
                            <CircularProgress
                                size={18}
                                color="inherit"
                            />
                        ) : (
                            <RefreshIcon />
                        )
                    }
                    onClick={handleRefresh}
                    disabled={refreshing}
                >
                    {refreshing
                        ? "Refreshing..."
                        : "Refresh"}
                </Button>

            </Stack>

            {/* ----------------------------------------------------------
                Error
            ---------------------------------------------------------- */}

            {error && (

                <Card>

                    <CardContent>

                        <Typography
                            color="error"
                            fontWeight={600}
                        >
                            {formatError(error)}
                        </Typography>

                    </CardContent>

                </Card>

            )}

            {/* ----------------------------------------------------------
                Installation Information
            ---------------------------------------------------------- */}

            <Card>

                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        gutterBottom
                    >
                        Installation Information
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <Grid
                        container
                        spacing={2}
                    >

                        <InfoItem
                            label="Installation ID"
                            value={installationId}
                        />

                        <InfoItem
                            label="Name"
                            value={
                                installation?.name ??
                                installationData?.name ??
                                installationData?.installationName ??
                                "—"
                            }
                        />

                        <InfoItem
                            label="Identifier"
                            value={
                                installation?.identifier ??
                                installationData?.identifier ??
                                "—"
                            }
                        />

                        <InfoItem
                            label="System Type"
                            value={
                                installation?.systemType ??
                                installationData?.systemType ??
                                "—"
                            }
                        />

                        <InfoItem
                            label="Firmware"
                            value={
                                installation?.firmwareVersion ??
                                installationData?.firmwareVersion ??
                                "—"
                            }
                        />

                        <InfoItem
                            label="Timezone"
                            value={
                                installation?.timezone ??
                                installationData?.timezone ??
                                "Africa/Lagos"
                            }
                        />

                    </Grid>

                </CardContent>

            </Card>

            {/* ----------------------------------------------------------
                Live Energy Summary
            ---------------------------------------------------------- */}

            <Grid
                container
                spacing={3}
            >

                <MetricCard
                    title="Current Load"
                    value={currentPower}
                    unit="kW"
                    icon={<ElectricBoltIcon />}
                />

                <MetricCard
                    title="Solar Generation"
                    value={solarPower}
                    unit="kW"
                    icon={<SolarPowerIcon />}
                />

                <MetricCard
                    title="Battery SOC"
                    value={batterySoc}
                    unit="%"
                    icon={
                        <BatteryChargingFullIcon />
                    }
                />

                <MetricCard
                    title="Battery Power"
                    value={batteryPower}
                    unit="kW"
                    icon={
                        <BatteryChargingFullIcon />
                    }
                />

                <MetricCard
                    title="Grid Power"
                    value={gridPower}
                    unit="kW"
                    icon={<ElectricBoltIcon />}
                />

                <MetricCard
                    title="Generator Power"
                    value={generatorPower}
                    unit="kW"
                    icon={<ElectricBoltIcon />}
                />

            </Grid>

            {/* ----------------------------------------------------------
                Live Dashboard
            ---------------------------------------------------------- */}

            <Card>

                <CardContent>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Box>

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
                                Raw dashboard data received
                                from Victron VRM
                            </Typography>

                        </Box>

                        <CloudDownloadIcon
                            color="primary"
                        />

                    </Stack>

                    <Divider
                        sx={{ my: 2 }}
                    />

                    <RawData
                        data={installationData}
                    />

                </CardContent>

            </Card>

            {/* ----------------------------------------------------------
                Statistics
            ---------------------------------------------------------- */}

            {statistics && (

                <Card>

                    <CardContent>

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            gutterBottom
                        >
                            VRM Statistics
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            Historical statistics returned
                            by the VRM backend service.
                        </Typography>

                        <Divider
                            sx={{ mb: 2 }}
                        />

                        <RawData
                            data={statistics}
                        />

                    </CardContent>

                </Card>

            )}

        </Stack>

    );

}

/*
|--------------------------------------------------------------------------
| Metric Card
|--------------------------------------------------------------------------
*/

function MetricCard({
    title,
    value,
    unit = "",
    icon
}) {

    return (

        <Grid
            size={{
                xs: 12,
                sm: 6,
                md: 4
            }}
        >

            <Card
                sx={{
                    height: "100%"
                }}
            >

                <CardContent>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                    >

                        <Box>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                {title}
                            </Typography>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                                sx={{ mt: 0.5 }}
                            >
                                {formatMetricValue(
                                    value
                                )}

                                {value !== null &&
                                value !== undefined &&
                                value !== "—"
                                    ? ` ${unit}`
                                    : ""}
                            </Typography>

                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            {icon}
                        </Box>

                    </Stack>

                </CardContent>

            </Card>

        </Grid>

    );

}

/*
|--------------------------------------------------------------------------
| Information Item
|--------------------------------------------------------------------------
*/

function InfoItem({
    label,
    value
}) {

    return (

        <Grid
            size={{
                xs: 12,
                sm: 6,
                md: 4
            }}
        >

            <Box>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {label}
                </Typography>

                <Typography
                    variant="body1"
                    fontWeight={600}
                >
                    {value ?? "—"}
                </Typography>

            </Box>

        </Grid>

    );

}

/*
|--------------------------------------------------------------------------
| Status Chip
|--------------------------------------------------------------------------
*/

function StatusChip({
    status
}) {

    const normalized =
        String(status || "UNKNOWN")
            .toUpperCase();

    let color = "default";

    if (normalized === "ONLINE") {

        color = "success";

    } else if (
        normalized === "WARNING"
    ) {

        color = "warning";

    } else if (
        normalized === "OFFLINE" ||
        normalized === "FAULT"
    ) {

        color = "error";

    }

    return (

        <Chip
            label={normalized}
            size="small"
            color={color}
        />

    );

}

/*
|--------------------------------------------------------------------------
| Raw Data Renderer
|--------------------------------------------------------------------------
*/

function RawData({
    data
}) {

    if (
        data === null ||
        data === undefined
    ) {

        return (

            <Typography
                color="text.secondary"
            >
                No data available.
            </Typography>

        );

    }

    if (
        typeof data !== "object"
    ) {

        return (

            <Typography>
                {String(data)}
            </Typography>

        );

    }

    return (

        <Box
            component="pre"
            sx={{
                m: 0,
                p: 2,
                borderRadius: 1,
                bgcolor: "background.default",
                overflow: "auto",
                maxHeight: 500,
                fontSize: "0.8rem",
                fontFamily:
                    "monospace",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word"
            }}
        >
            {JSON.stringify(
                data,
                null,
                2
            )}
        </Box>

    );

}

/*
|--------------------------------------------------------------------------
| Extract Value
|--------------------------------------------------------------------------
|
| VRM payload structures can differ between installations.
| This helper safely checks common locations.
|
|--------------------------------------------------------------------------
*/

function getValue(
    source,
    keys
) {

    if (
        !source ||
        typeof source !== "object"
    ) {

        return null;

    }

    for (const key of keys) {

        const value =
            source?.[key];

        if (
            value !== undefined &&
            value !== null
        ) {

            if (
                typeof value === "object"
            ) {

                if (
                    value.value !==
                    undefined
                ) {

                    return value.value;

                }

                if (
                    value.current !==
                    undefined
                ) {

                    return value.current;

                }

            }

            return value;

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Common nested VRM structures
    |--------------------------------------------------------------------------
    */

    const candidates = [

        source?.data,

        source?.values,

        source?.totals,

        source?.current,

        source?.summary

    ];

    for (
        const candidate
        of candidates
    ) {

        if (
            !candidate ||
            typeof candidate !==
                "object"
        ) {

            continue;

        }

        for (const key of keys) {

            const value =
                candidate?.[key];

            if (
                value !== undefined &&
                value !== null
            ) {

                if (
                    typeof value ===
                    "object"
                ) {

                    if (
                        value.value !==
                        undefined
                    ) {

                        return value.value;

                    }

                    if (
                        value.current !==
                        undefined
                    ) {

                        return value.current;

                    }

                }

                return value;

            }

        }

    }

    return null;

}

/*
|--------------------------------------------------------------------------
| Format Metric
|--------------------------------------------------------------------------
*/

function formatMetricValue(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "—";

    }

    if (
        typeof value === "number"
    ) {

        return Number.isInteger(value)
            ? value.toLocaleString()
            : value.toLocaleString(
                undefined,
                {
                    maximumFractionDigits: 2
                }
            );

    }

    return String(value);

}

/*
|--------------------------------------------------------------------------
| Format Error
|--------------------------------------------------------------------------
*/

function formatError(
    error
) {

    if (
        typeof error === "string"
    ) {

        return error;

    }

    if (
        error?.message
    ) {

        return error.message;

    }

    if (
        error?.error?.message
    ) {

        return error.error.message;

    }

    return "Unable to load VRM data.";

}