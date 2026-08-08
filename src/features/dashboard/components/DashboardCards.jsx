import {
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

/*
|--------------------------------------------------------------------------
| Card Component
|--------------------------------------------------------------------------
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

            <CardContent>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

                    <div>

                        <Typography
                            color="text.secondary"
                            variant="body2"
                        >

                            {title}

                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                            mt={1}
                        >

                            {value}

                        </Typography>

                    </div>

                    <div
                        style={{
                            color
                        }}
                    >

                        {icon}

                    </div>

                </Stack>

            </CardContent>

        </Card>

    );

}

/*
|--------------------------------------------------------------------------
| Dashboard Cards
|--------------------------------------------------------------------------
*/

export default function DashboardCards() {

    const {

        cards,

        loading

    } = useDashboard();

    if (loading || !cards) {

        return (

            <Grid
                container
                spacing={3}
            >

                {

                    [...Array(6)].map((_, index) => (

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4,
                                lg: 2
                            }}
                            key={index}
                        >

                            <Skeleton
                                variant="rounded"
                                height={130}
                            />

                        </Grid>

                    ))

                }

            </Grid>

        );

    }

    return (

        <Grid
            container
            spacing={3}
        >

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    lg: 2
                }}
            >

                <KPICard

                    title="Total Sites"

                    value={cards?.totalSites ?? 0}

                    icon={<LanguageIcon fontSize="large" />}

                    color="#1565C0"

                />

            </Grid>

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    lg: 2
                }}
            >

                <KPICard

                    title="Active Sites"

                    value={cards?.activeSites ?? 0}

                    icon={<CheckCircleIcon fontSize="large" />}

                    color="#2E7D32"

                />

            </Grid>

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    lg: 2
                }}
            >

                <KPICard

                    title="Active Alarms"

                    value={cards?.activeAlarms ?? 0}

                    icon={<WarningAmberIcon fontSize="large" />}

                    color="#F57C00"

                />

            </Grid>

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

                    icon={<BatteryChargingFullIcon fontSize="large" />}

                    color="#00897B"

                />

            </Grid>

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

                    icon={<SolarPowerIcon fontSize="large" />}

                    color="#43A047"

                />

            </Grid>

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

                    icon={<ElectricBoltIcon fontSize="large" />}

                    color="#5E35B1"

                />

            </Grid>

        </Grid>

    );

}