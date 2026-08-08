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

import useSite from "../hooks/useSites.js";

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

    const numericValue =
        Number(value) || 0;

    const numericTotal =
        Number(total) || 0;

    const percentage =
        numericTotal > 0
            ? Math.min(
                (numericValue / numericTotal) * 100,
                100
            )
            : 0;

    return (
        <Stack spacing={1}>

            <Stack
                direction="row"
                spacing={2}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <Typography
                    variant="body2"
                >
                    {label}
                </Typography>

                <Typography
                    fontWeight={600}
                >
                    {numericValue}
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

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    const totalSites =
        Number(
            statistics?.totalSites
        ) || 0;

    const healthySites =
        Number(
            statistics?.healthySites
        ) || 0;

    const warningSites =
        Number(
            statistics?.warningSites
        ) || 0;

    const criticalSites =
        Number(
            statistics?.criticalSites
        ) || 0;

    const offlineSites =
        Number(
            statistics?.offlineSites
        ) || 0;

    const solarSites =
        Number(
            statistics?.solarSites
        ) || 0;

    const hybridSites =
        Number(
            statistics?.hybridSites
        ) || 0;

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

                <Divider
                    sx={{
                        mb: 3
                    }}
                />

                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <StatisticItem
                            label="Healthy"
                            value={healthySites}
                            total={totalSites}
                            color="success"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <StatisticItem
                            label="Warning"
                            value={warningSites}
                            total={totalSites}
                            color="warning"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <StatisticItem
                            label="Critical"
                            value={criticalSites}
                            total={totalSites}
                            color="error"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <StatisticItem
                            label="Offline"
                            value={offlineSites}
                            total={totalSites}
                            color="error"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <StatisticItem
                            label="Solar Enabled"
                            value={solarSites}
                            total={totalSites}
                            color="success"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <StatisticItem
                            label="Hybrid Sites"
                            value={hybridSites}
                            total={totalSites}
                            color="primary"
                        />
                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
}