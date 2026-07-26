import {
    Chip,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material";

function Recommendation({

    title,

    value,

    color = "primary"

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

            <Stack spacing={1}>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >

                    {title}

                </Typography>

                <Chip

                    label={value}

                    color={color}

                    sx={{
                        width: "fit-content"
                    }}

                />

            </Stack>

        </Paper>

    );

}

export default function DashboardOptimization({

    optimization,

    loading

}) {

    if (loading) {

        return (

            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3
                }}
            >

                <Typography>

                    Loading optimization...

                </Typography>

            </Paper>

        );

    }

    if (!optimization) {

        return (

            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3
                }}
            >

                <Typography>

                    No optimization results available.

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

            >

                Optimization Engine

            </Typography>

            <Typography

                color="text.secondary"

                mb={3}

            >

                Recommended operational strategy

            </Typography>

            <Grid container spacing={2}>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Recommendation

                        title="Battery"

                        value={

                            optimization.battery?.action ??

                            "N/A"

                        }

                        color="success"

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Recommendation

                        title="Generator"

                        value={

                            optimization.generator?.start

                                ? "START"

                                : "STOP"

                        }

                        color={

                            optimization.generator?.start

                                ? "warning"

                                : "success"

                        }

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>

                    <Recommendation

                        title="Grid"

                        value={

                            optimization.grid?.available

                                ? "CONNECTED"

                                : "OFFLINE"

                        }

                        color={

                            optimization.grid?.available

                                ? "primary"

                                : "default"

                        }

                    />

                </Grid>

            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 6 }}>

                    <Stack spacing={2}>

                        <Typography variant="subtitle2">

                            Solar Utilization

                        </Typography>

                        <Typography>

                            Utilized:

                            {" "}

                            {

                                optimization.solar?.utilized ?? 0

                            }

                            {" "}W

                        </Typography>

                        <Typography>

                            Curtailed:

                            {" "}

                            {

                                optimization.solar?.curtailed ?? 0

                            }

                            {" "}W

                        </Typography>

                    </Stack>

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <Stack spacing={2}>

                        <Typography variant="subtitle2">

                            Objective Function

                        </Typography>

                        <Typography>

                            {

                                optimization.objectiveValue ?? 0

                            }

                        </Typography>

                        <Typography>

                            Mode:

                            {" "}

                            {

                                optimization.optimizationMode ??

                                "REALTIME"

                            }

                        </Typography>

                    </Stack>

                </Grid>

            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography

                variant="subtitle2"

                gutterBottom

            >

                Constraint Validation

            </Typography>

            <Grid container spacing={2}>

                <Grid size={{ xs: 12, md: 3 }}>

                    <Chip

                        color={

                            optimization.constraints?.battery?.valid

                                ? "success"

                                : "error"

                        }

                        label="Battery"

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <Chip

                        color={

                            optimization.constraints?.generator?.valid

                                ? "success"

                                : "error"

                        }

                        label="Generator"

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <Chip

                        color={

                            optimization.constraints?.grid?.available

                                ? "success"

                                : "warning"

                        }

                        label="Grid"

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <Chip

                        color={

                            optimization.constraints?.powerBalance?.satisfied

                                ? "success"

                                : "error"

                        }

                        label="Power Balance"

                    />

                </Grid>

            </Grid>

        </Paper>

    );

}