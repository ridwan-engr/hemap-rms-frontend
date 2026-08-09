import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import useStatistics from "../hooks/useStatistics.js";

export default function StatisticsPage() {
    const {
        dashboard,
        energy,
        battery,
        solar,
        generator,
        grid,
        kpis,
        locations,
        loading,
        error,
        lastUpdated,
        reload
    } = useStatistics();

    const handleRefresh = async () => {
        try {
            await reload();
        } catch (refreshError) {
            console.error(
                "Statistics refresh failed:",
                refreshError
            );
        }
    };

    if (loading && !dashboard && !kpis) {
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

    return (
        <Stack spacing={3}>
            {/* ----------------------------------------------------------
                Header
            ---------------------------------------------------------- */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row"
                }}
                spacing={2}
                justifyContent="space-between"
                alignItems={{
                    xs: "stretch",
                    sm: "center"
                }}
            >
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        Statistics
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Energy, power, battery, generation and
                        site performance statistics
                    </Typography>

                    {lastUpdated && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Last Updated:{" "}
                            {new Date(lastUpdated).toLocaleString()}
                        </Typography>
                    )}
                </Box>

                <Button
                    variant="contained"
                    startIcon={
                        loading ? (
                            <CircularProgress
                                size={18}
                                color="inherit"
                            />
                        ) : (
                            <RefreshIcon />
                        )
                    }
                    onClick={handleRefresh}
                    disabled={loading}
                >
                    Refresh
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
                            {typeof error === "string"
                                ? error
                                : error?.message ||
                                  "Unable to load statistics."}
                        </Typography>
                    </CardContent>
                </Card>
            )}

            {/* ----------------------------------------------------------
                KPI Summary
            ---------------------------------------------------------- */}

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        title="Total Sites"
                        value={
                            kpis?.totalSites ??
                            dashboard?.totalSites ??
                            locations?.length ??
                            0
                        }
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        title="Total Energy"
                        value={
                            kpis?.totalEnergy ??
                            dashboard?.totalEnergy ??
                            energy?.totalEnergy ??
                            0
                        }
                        suffix=" kWh"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        title="Solar Generation"
                        value={
                            kpis?.solarGeneration ??
                            dashboard?.solarGeneration ??
                            solar?.totalGeneration ??
                            0
                        }
                        suffix=" kWh"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <StatisticCard
                        title="Battery SOC"
                        value={
                            kpis?.batterySoc ??
                            dashboard?.batterySoc ??
                            battery?.averageSoc ??
                            0
                        }
                        suffix="%"
                    />
                </Grid>
            </Grid>

            {/* ----------------------------------------------------------
                Dashboard Statistics
            ---------------------------------------------------------- */}

            <StatisticsSection
                title="Dashboard Statistics"
                data={dashboard}
            />

            {/* ----------------------------------------------------------
                Energy Statistics
            ---------------------------------------------------------- */}

            <StatisticsSection
                title="Energy Statistics"
                data={energy}
            />

            {/* ----------------------------------------------------------
                Battery Statistics
            ---------------------------------------------------------- */}

            <StatisticsSection
                title="Battery Statistics"
                data={battery}
            />

            {/* ----------------------------------------------------------
                Solar Statistics
            ---------------------------------------------------------- */}

            <StatisticsSection
                title="Solar Statistics"
                data={solar}
            />

            {/* ----------------------------------------------------------
                Generator Statistics
            ---------------------------------------------------------- */}

            <StatisticsSection
                title="Generator Statistics"
                data={generator}
            />

            {/* ----------------------------------------------------------
                Grid Statistics
            ---------------------------------------------------------- */}

            <StatisticsSection
                title="Grid Statistics"
                data={grid}
            />

            {/* ----------------------------------------------------------
                Site Locations
            ---------------------------------------------------------- */}

            <Card>
                <CardContent>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        gutterBottom
                    >
                        Site Locations
                    </Typography>

                    {Array.isArray(locations) &&
                    locations.length > 0 ? (
                        <Stack spacing={1}>
                            {locations.map(
                                (location, index) => (
                                    <Box
                                        key={
                                            location?.siteId ||
                                            location?.id ||
                                            index
                                        }
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 1,
                                            bgcolor:
                                                "background.default"
                                        }}
                                    >
                                        <Typography
                                            variant="body2"
                                            fontWeight={600}
                                        >
                                            {location?.siteName ||
                                                location?.name ||
                                                `Site ${
                                                    index + 1
                                                }`}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {location?.latitude !=
                                                null &&
                                            location?.longitude !=
                                                null
                                                ? `${location.latitude}, ${location.longitude}`
                                                : location?.location ||
                                                  location?.address ||
                                                  "Location unavailable"}
                                        </Typography>
                                    </Box>
                                )
                            )}
                        </Stack>
                    ) : (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            No site location data available.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Stack>
    );
}

/* --------------------------------------------------------------------------
   Statistic Card
-------------------------------------------------------------------------- */

function StatisticCard({
    title,
    value,
    suffix = ""
}) {
    return (
        <Card>
            <CardContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                >
                    {title}
                </Typography>

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    {formatValue(value)}
                    {suffix}
                </Typography>
            </CardContent>
        </Card>
    );
}

/* --------------------------------------------------------------------------
   Statistics Section
-------------------------------------------------------------------------- */

function StatisticsSection({
    title,
    data
}) {
    if (
        data == null ||
        (typeof data === "object" &&
            !Array.isArray(data) &&
            Object.keys(data).length === 0)
    ) {
        return null;
    }

    return (
        <Card>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                >
                    {title}
                </Typography>

                <Grid container spacing={2}>
                    {renderStatistics(data)}
                </Grid>
            </CardContent>
        </Card>
    );
}

/* --------------------------------------------------------------------------
   Render Statistics
-------------------------------------------------------------------------- */

function renderStatistics(data) {
    if (Array.isArray(data)) {
        return data.map((item, index) => (
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 4
                }}
                key={item?.id || item?.siteId || index}
            >
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 1,
                        bgcolor: "background.default"
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {item?.name ||
                            item?.label ||
                            item?.siteName ||
                            `Item ${index + 1}`}
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        {formatValue(
                            item?.value ??
                                item?.total ??
                                item?.count ??
                                0
                        )}
                    </Typography>
                </Box>
            </Grid>
        ));
    }

    if (typeof data !== "object") {
        return (
            <Grid size={{ xs: 12 }}>
                <Typography variant="h6">
                    {formatValue(data)}
                </Typography>
            </Grid>
        );
    }

    return Object.entries(data)
        .filter(
            ([, value]) =>
                value !== null &&
                value !== undefined &&
                typeof value !== "object"
        )
        .map(([key, value]) => (
            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 4
                }}
                key={key}
            >
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 1,
                        bgcolor: "background.default"
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {formatLabel(key)}
                    </Typography>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        {formatValue(value)}
                    </Typography>
                </Box>
            </Grid>
        ));
}

/* --------------------------------------------------------------------------
   Helpers
-------------------------------------------------------------------------- */

function formatLabel(value) {
    return String(value)
        .replace(/([A-Z])/g, " $1")
        .replace(/[_-]/g, " ")
        .replace(/\s+/g, " ")
        .replace(/^./, char =>
            char.toUpperCase()
        );
}

function formatValue(value) {
    if (value === null || value === undefined) {
        return "—";
    }

    if (typeof value === "number") {
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