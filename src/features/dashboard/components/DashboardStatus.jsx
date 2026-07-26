import {
    Grid,
    Paper,
    Stack,
    Typography,
    LinearProgress
} from "@mui/material";

export default function DashboardStatus({

    statistics,

    loading

}) {

    const totalSites = statistics?.totalSites ?? 0;

    const activeSites = statistics?.activeSites ?? 0;

    const offlineSites = statistics?.offlineSites ?? 0;

    const warningSites = statistics?.warningSites ?? 0;

    const availability =

        totalSites > 0

            ? Math.round((activeSites / totalSites) * 100)

            : 0;

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

                Site Status

            </Typography>

            <Grid

                container

                spacing={3}

            >

                <Grid size={{ xs: 12, md: 3 }}>

                    <StatusItem

                        label="Total Sites"

                        value={loading ? "--" : totalSites}

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <StatusItem

                        label="Online"

                        value={loading ? "--" : activeSites}

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <StatusItem

                        label="Offline"

                        value={loading ? "--" : offlineSites}

                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <StatusItem

                        label="Warning"

                        value={loading ? "--" : warningSites}

                    />

                </Grid>

            </Grid>

            <Stack

                spacing={1}

                mt={4}

            >

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Fleet Availability

                </Typography>

                <LinearProgress

                    variant="determinate"

                    value={availability}

                    sx={{

                        height: 10,

                        borderRadius: 5

                    }}

                />

                <Typography

                    variant="body2"

                    fontWeight={600}

                >

                    {availability}%

                </Typography>

            </Stack>

        </Paper>

    );

}

function StatusItem({

    label,

    value

}) {

    return (

        <Stack spacing={1}>

            <Typography

                color="text.secondary"

                variant="body2"

            >

                {label}

            </Typography>

            <Typography

                variant="h5"

                fontWeight={700}

            >

                {value}

            </Typography>

        </Stack>

    );

}