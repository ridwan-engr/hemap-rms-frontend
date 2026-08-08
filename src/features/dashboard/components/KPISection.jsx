import {
    Grid,
    Paper,
    Stack,
    Typography,
    LinearProgress,
    Chip,
    Skeleton
} from "@mui/material";

import useDashboard from "../hooks/useDashboard.js";

/*
|--------------------------------------------------------------------------
| KPI Item
|--------------------------------------------------------------------------
*/

function KPIItem({

    title,

    value,

    unit = "",

    percentage = null,

    color = "primary"

}) {

    return (

        <Paper
            elevation={1}
            sx={{
                p: 2,
                height: "100%"
            }}
        >

            <Stack spacing={2}>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Typography
                    variant="h5"
                    fontWeight={700}
                >
                    {value}{unit}
                </Typography>

                {

                    percentage !== null && (

                        <>

                            <LinearProgress

                                variant="determinate"

                                value={percentage}

                                color={color}

                            />

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {percentage.toFixed(1)}%
                            </Typography>

                        </>

                    )

                }

            </Stack>

        </Paper>

    );

}

/*
|--------------------------------------------------------------------------
| KPI Section
|--------------------------------------------------------------------------
*/

export default function KPISection() {

    const {

        kpis,

        loading

    } = useDashboard();

    if (loading || !kpis) {

        return (

            <Grid container spacing={3}>

                {

                    [...Array(8)].map((_, index) => (

                        <Grid
                            key={index}
                            size={{
                                xs: 12,
                                md: 6,
                                lg: 3
                            }}
                        >

                            <Skeleton

                                variant="rounded"

                                height={120}

                            />

                        </Grid>

                    ))

                }

            </Grid>

        );

    }

    return (

        <Grid container spacing={3}>

            <Grid
                size={{
                    xs: 12,
                    md: 6,
                    lg: 3
                }}
            >

                <KPIItem

                    title="Battery State of Charge"

                    value={kpis.batterySOC ?? 0}

                    unit="%"

                    percentage={kpis.batterySOC ?? 0}

                    color="success"

                />

            </Grid>

            <Grid
                size={{
                    xs: 12,
                    md: 6,
                    lg: 3
                }}
            >

                <KPIItem

                    title="Solar Output"

                    value={kpis.solarPower ?? 0}

                    unit=" kW"

                />

            </Grid>

            <Grid
                size={{
                    xs: 12,
                    md: 6,
                    lg: 3
                }}
            >

                <KPIItem

                    title="Generator Output"

                    value={kpis.generatorPower ?? 0}

                    unit=" kW"

                />

            </Grid>

            <Grid
                size={{
                    xs: 12,
                    md: 6,
                    lg: 3
                }}
            >

                <KPIItem

                    title="Grid Import"

                    value={kpis.gridPower ?? 0}

                    unit=" kW"

                />

            </Grid>

            <Grid
                size={{
                    xs: 12,
                    md: 6,
                    lg: 3
                }}
            >

                <KPIItem

                    title="Load Demand"

                    value={kpis.loadPower ?? 0}

                    unit=" kW"

                />

            </Grid>

            <Grid
                size={{
                    xs: 12,
                    md: 6,
                    lg: 3
                }}
            >

                <KPIItem

                    title="Renewable Contribution"

                    value={kpis.renewableContribution ?? 0}

                    unit="%"

                    percentage={kpis.renewableContribution ?? 0}

                    color="success"

                />

            </Grid>

            <Grid
                size={{
                    xs: 12,
                    md: 6,
                    lg: 3
                }}
            >

                <Paper
                    sx={{
                        p: 2,
                        height: "100%"
                    }}
                >

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        System Status

                    </Typography>

                    <Chip

                        label="ONLINE"

                        color="success"

                        sx={{
                            mt: 2
                        }}

                    />

                </Paper>

            </Grid>

            <Grid
                size={{
                    xs: 12,
                    md: 6,
                    lg: 3
                }}
            >

                <Paper
                    sx={{
                        p: 2,
                        height: "100%"
                    }}
                >

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        Last Update

                    </Typography>

                    <Typography
                        variant="h6"
                        mt={2}
                    >

                        {new Date().toLocaleTimeString()}

                    </Typography>

                </Paper>

            </Grid>

        </Grid>

    );

}