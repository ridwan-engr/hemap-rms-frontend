import {
    Grid,
    Paper,
    Stack,
    Typography,
    LinearProgress
} from "@mui/material";


export default function DashboardEnergy({

    statistics,

    loading

}) {

    const energyGenerated = statistics?.energyGenerated ?? 0;

    const energyConsumed = statistics?.energyConsumed ?? 0;

    const renewablePercentage = statistics?.renewablePercentage ??

        statistics?.renewableFraction ??

        0;

    const generatorRuntime = statistics?.generatorRuntime ?? 0;

    return (

        <Paper

            elevation={1}

            sx={{

                p: 3,

                borderRadius: 3

            }}

        >

            <Typography

                variant="h6"

                fontWeight={700}

                mb={3}

            >

                Energy Summary

            </Typography>

            <Grid

                container

                spacing={3}

            >

                <Grid size={{ xs: 12, md: 3 }}>

                    <EnergyCard

                        title="Energy Generated"

                        value={energyGenerated}

                        unit="kWh"

                        loading={loading}

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <EnergyCard

                        title="Energy Consumed"

                        value={energyConsumed}

                        unit="kWh"

                        loading={loading}

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <EnergyCard

                        title="Generator Runtime"

                        value={generatorRuntime}

                        unit="hrs"

                        loading={loading}

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <Stack spacing={1}>

                        <Typography

                            variant="body2"

                            color="text.secondary"

                        >

                            Renewable Contribution

                        </Typography>

                        <Typography

                            variant="h4"

                            fontWeight={700}

                        >

                            {

                                loading

                                    ? "--"

                                    : renewablePercentage

                            }%

                        </Typography>

                        <LinearProgress

                            variant="determinate"

                            value={renewablePercentage}

                            sx={{

                                height: 10,

                                borderRadius: 5

                            }}

                        />

                    </Stack>

                </Grid>

            </Grid>

        </Paper>

    );

}

function EnergyCard({

    title,

    value,

    unit,

    loading

}) {

    return (

        <Stack spacing={1}>

            <Typography

                variant="body2"

                color="text.secondary"

            >

                {title}

            </Typography>

            <Typography

                variant="h4"

                fontWeight={700}

            >

                {

                    loading

                        ? "--"

                        : value

                }

                <Typography

                    component="span"

                    sx={{

                        ml: 1,

                        fontSize: 16,

                        color: "text.secondary"

                    }}

                >

                    {unit}

                </Typography>

            </Typography>

        </Stack>

    );

}
