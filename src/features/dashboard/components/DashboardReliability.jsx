import {
    Box,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import useDashboard from "../hooks/useDashboard";

const metrics = [

    {
        key: "saidi",
        title: "SAIDI",
        unit: "hrs"
    },

    {
        key: "saifi",
        title: "SAIFI",
        unit: ""
    },

    {
        key: "ens",
        title: "ENS",
        unit: "kWh"
    },

    {
        key: "lolp",
        title: "LOLP",
        unit: "%"
    }

];

export default function DashboardReliability() {

    const {

        reliability,

        loading

    } = useDashboard();

    const availability = Number(

        reliability?.availability ??

        reliability?.availabilityIndex ??

        0

    );

    const resilience = Number(

        reliability?.resilience ??

        reliability?.resilienceIndex ??

        0

    );

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

                Reliability & Resilience

            </Typography>

            <Grid

                container

                spacing={3}

            >

                {

                    metrics.map((metric) => (

                        <Grid

                            key={metric.key}

                            size={{

                                xs: 12,

                                sm: 6,

                                md: 3

                            }}

                        >

                            <MetricCard

                                title={metric.title}

                                value={

                                    loading

                                        ? "--"

                                        : reliability?.[metric.key] ?? 0

                                }

                                unit={metric.unit}

                            />

                        </Grid>

                    ))

                }

            </Grid>

            <Grid

                container

                spacing={4}

                mt={1}

            >

                <Grid

                    size={{

                        xs: 12,

                        md: 6

                    }}

                >

                    <ProgressMetric

                        label="Availability"

                        value={

                            loading

                                ? 0

                                : availability

                        }

                    />

                </Grid>

                <Grid

                    size={{

                        xs: 12,

                        md: 6

                    }}

                >

                    <ProgressMetric

                        label="Resilience"

                        value={

                            loading

                                ? 0

                                : resilience

                        }

                    />

                </Grid>

            </Grid>

        </Paper>

    );

}

function MetricCard({

    title,

    value,

    unit

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

                {value}

                {

                    unit && (

                        <Box

                            component="span"

                            sx={{

                                ml: 1,

                                fontSize: 16,

                                color: "text.secondary"

                            }}

                        >

                            {unit}

                        </Box>

                    )

                }

            </Typography>

        </Stack>

    );

}

function ProgressMetric({

    label,

    value

}) {

    const percentage = Math.max(

        0,

        Math.min(

            100,

            Number(value) || 0

        )

    );

    return (

        <Stack spacing={1}>

            <Typography

                variant="body2"

                color="text.secondary"

            >

                {label}

            </Typography>

            <LinearProgress

                variant="determinate"

                value={percentage}

                sx={{

                    height: 10,

                    borderRadius: 5

                }}

            />

            <Typography

                fontWeight={600}

            >

                {percentage}%

            </Typography>

        </Stack>

    );

}