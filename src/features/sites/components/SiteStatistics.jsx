import {

    Card,
    CardContent,
    Grid,
    Typography,
    Stack,
    Divider,
    LinearProgress,
    Skeleton

} from "@mui/material";

import useSite from "../hooks/useSite";

/*
|--------------------------------------------------------------------------
| Statistics Item
|--------------------------------------------------------------------------
*/

function StatisticItem({

    label,

    value,

    total,

    color = "primary"

}) {

    const percentage = total > 0

        ? (value / total) * 100

        : 0;

    return (

        <Stack spacing={1}>

            <Stack

                direction="row"

                justifyContent="space-between"

            >

                <Typography variant="body2">

                    {label}

                </Typography>

                <Typography fontWeight={600}>

                    {value}

                </Typography>

            </Stack>

            <LinearProgress

                variant="determinate"

                value={percentage}

                color={color}

            />

        </Stack>

    );

}

/*
|--------------------------------------------------------------------------
| Site Statistics
|--------------------------------------------------------------------------
*/

export default function SiteStatistics() {

    const {

        statistics,

        loading

    } = useSite();

    if (loading) {

        return (

            <Card>

                <CardContent>

                    <Skeleton

                        variant="text"

                        width={200}

                        height={40}

                    />

                    <Skeleton

                        variant="rounded"

                        height={220}

                    />

                </CardContent>

            </Card>

        );

    }

    const totalSites = statistics?.totalSites ?? 0;

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    fontWeight={700}

                    gutterBottom

                >

                    Site Statistics

                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Grid

                    container

                    spacing={3}

                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <StatisticItem

                            label="Healthy"

                            value={statistics?.healthySites ?? 0}

                            total={totalSites}

                            color="success"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <StatisticItem

                            label="Warning"

                            value={statistics?.warningSites ?? 0}

                            total={totalSites}

                            color="warning"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <StatisticItem

                            label="Critical"

                            value={statistics?.criticalSites ?? 0}

                            total={totalSites}

                            color="error"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <StatisticItem

                            label="Offline"

                            value={statistics?.offlineSites ?? 0}

                            total={totalSites}

                            color="error"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <StatisticItem

                            label="Solar Enabled"

                            value={statistics?.solarSites ?? 0}

                            total={totalSites}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <StatisticItem

                            label="Hybrid Sites"

                            value={statistics?.hybridSites ?? 0}

                            total={totalSites}

                        />

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}