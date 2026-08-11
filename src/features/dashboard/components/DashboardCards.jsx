import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Skeleton,
    Stack
} from "@mui/material";

import LanguageIcon from "@mui/icons-material/Language";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

import useDashboard from "../hooks/useDashboard";

/**
 * ============================================================================
 * HEMAP RMS
 * Dashboard KPI Card
 * ============================================================================
 *
 * Displays a single dashboard KPI.
 *
 * Important:
 * - Uses MUI layout components only.
 * - Layout properties are supplied through `sx`.
 * - No layout props are passed to native DOM elements.
 *
 * ============================================================================
 */

function KPICard({
    title,
    value,
    icon,
    color
}) {
    return (
        <Card
            elevation={2}
            sx={{
                height: "100%"
            }}
        >
            <CardContent
                sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    {/* KPI Information */}

                    <Box
                        sx={{
                            minWidth: 0
                        }}
                    >
                        <Typography
                            color="text.secondary"
                            variant="body2"
                            noWrap
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                            sx={{
                                mt: 1
                            }}
                        >
                            {value}
                        </Typography>
                    </Box>

                    {/* KPI Icon */}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            color
                        }}
                    >
                        {icon}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

/**
 * ============================================================================
 * Dashboard Cards
 * ============================================================================
 */

export default function DashboardCards() {
    const {
        cards,
        loading
    } = useDashboard();

    /**
     * ------------------------------------------------------------------------
     * Loading State
     * ------------------------------------------------------------------------
     */

    if (loading || !cards) {
        return (
            <Grid
                container
                spacing={3}
            >
                {Array.from({ length: 6 }).map(
                    (_, index) => (
                        <Grid
                            key={index}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4,
                                lg: 2
                            }}
                        >
                            <Skeleton
                                variant="rounded"
                                height={130}
                            />
                        </Grid>
                    )
                )}
            </Grid>
        );
    }

    /**
     * ------------------------------------------------------------------------
     * Dashboard KPI Cards
     * ------------------------------------------------------------------------
     */

    return (
        <Grid
            container
            spacing={3}
        >
            {/* Total Sites */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    lg: 2
                }}
            >
                <KPICard
                    title="Total Sites"
                    value={
                        cards?.totalSites ?? 0
                    }
                    icon={
                        <LanguageIcon
                            fontSize="large"
                        />
                    }
                    color="#1565C0"
                />
            </Grid>

            {/* Active Sites */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    lg: 2
                }}
            >
                <KPICard
                    title="Active Sites"
                    value={
                        cards?.activeSites ?? 0
                    }
                    icon={
                        <CheckCircleIcon
                            fontSize="large"
                        />
                    }
                    color="#2E7D32"
                />
            </Grid>

            {/* Active Alarms */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    lg: 2
                }}
            >
                <KPICard
                    title="Active Alarms"
                    value={
                        cards?.activeAlarms ?? 0
                    }
                    icon={
                        <WarningAmberIcon
                            fontSize="large"
                        />
                    }
                    color="#F57C00"
                />
            </Grid>

            {/* Battery SOC */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    lg: 2
                }}
            >
                <KPICard
                    title="Battery SOC"
                    value={`${cards?.batterySOC ?? 0}%`}
                    icon={
                        <BatteryChargingFullIcon
                            fontSize="large"
                        />
                    }
                    color="#00897B"
                />
            </Grid>

            {/* Renewable Energy */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    lg: 2
                }}
            >
                <KPICard
                    title="Renewables"
                    value={`${cards?.renewableEnergy ?? 0}%`}
                    icon={
                        <SolarPowerIcon
                            fontSize="large"
                        />
                    }
                    color="#43A047"
                />
            </Grid>

            {/* Generator Runtime */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    lg: 2
                }}
            >
                <KPICard
                    title="Generator Runtime"
                    value={`${cards?.generatorRuntime ?? 0} h`}
                    icon={
                        <ElectricBoltIcon
                            fontSize="large"
                        />
                    }
                    color="#5E35B1"
                />
            </Grid>
        </Grid>
    );
}