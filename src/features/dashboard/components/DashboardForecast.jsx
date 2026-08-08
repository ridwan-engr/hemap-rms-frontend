import {
    Box,
    Chip,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import useDashboard from "../hooks/useDashboard";

const forecastItems = [

    {
        key: "solar",
        title: "Solar Generation",
        unit: "W"
    },

    {
        key: "load",
        title: "Load Demand",
        unit: "W"
    },

    {
        key: "battery",
        title: "Battery SOC",
        unit: "%"
    },

    {
        key: "generator",
        title: "Generator",
        unit: "W"
    },

    {
        key: "grid",
        title: "Grid Import",
        unit: "W"
    }

];

export default function DashboardForecast() {

    const {

        forecast,

        loading

    } = useDashboard();

    if (loading) {

        return (

            <Paper

                sx={{

                    p: 3,

                    borderRadius: 3

                }}

            >

                <Typography>

                    Loading forecast...

                </Typography>

            </Paper>

        );

    }

    if (!forecast) {

        return (

            <Paper

                sx={{

                    p: 3,

                    borderRadius: 3

                }}

            >

                <Typography>

                    No forecast available.

                </Typography>

            </Paper>

        );

    }

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

                24-Hour Forecast

            </Typography>

            <Grid

                container

                spacing={3}

            >

                {

                    forecastItems.map((item) => {

                        const prediction =
                            forecast?.[item.key];

                        return (

                            <Grid

                                key={item.key}

                                size={{

                                    xs: 12,

                                    sm: 6,

                                    md: 4

                                }}

                            >

                                <ForecastCard

                                    title={item.title}

                                    forecast={prediction}

                                    unit={item.unit}

                                />

                            </Grid>

                        );

                    })

                }

            </Grid>

        </Paper>

    );

}

function ForecastCard({

    title,

    forecast,

    unit

}) {

    return (

        <Paper

            variant="outlined"

            sx={{

                p: 2,

                borderRadius: 2,

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

                    variant="h4"

                    fontWeight={700}

                >

                    {

                        forecast?.predictedValue ?? 0

                    }

                    <Box

                        component="span"

                        sx={{

                            ml: 1,

                            fontSize: 15,

                            color: "text.secondary"

                        }}

                    >

                        {

                            forecast?.unit ??

                            unit

                        }

                    </Box>

                </Typography>

                <Chip

                    label={

                        forecast?.algorithm ??

                        "N/A"

                    }

                    color="primary"

                    size="small"

                    sx={{

                        width: "fit-content"

                    }}

                />

                <Typography

                    variant="caption"

                    color="text.secondary"

                >

                    {

                        forecast?.generatedAt

                            ?

                            new Date(

                                forecast.generatedAt

                            ).toLocaleString()

                            :

                            "--"

                    }

                </Typography>

            </Stack>

        </Paper>

    );

}