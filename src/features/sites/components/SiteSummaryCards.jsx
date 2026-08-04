import {

    Card,

    CardContent,

    Grid,

    Stack,

    Typography,

    Skeleton

} from "@mui/material";

import LocationCityIcon from "@mui/icons-material/LocationCity";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import PowerIcon from "@mui/icons-material/Power";

import useSite from "../hooks/useSite";

/*
|--------------------------------------------------------------------------
| Summary Card
|--------------------------------------------------------------------------
*/

function SummaryCard({

    title,

    value,

    icon,

    color

}) {

    return (

        <Card
            elevation={2}
            sx={{ height: "100%" }}
        >

            <CardContent>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >

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
                        </Typography>

                    </Stack>

                    {icon}

                </Stack>

            </CardContent>

        </Card>

    );

}

/*
|--------------------------------------------------------------------------
| Site Summary Cards
|--------------------------------------------------------------------------
*/

export default function SiteSummaryCards() {

    const {

        summary,

        loading

    } = useSite();

    if (loading) {

        return (

            <Grid container spacing={3}>

                {

                    Array.from({

                        length: 4

                    }).map((_, index) => (

                        <Grid
                            key={index}
                            size={{ xs: 12, sm: 6, lg: 3 }}
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

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

                <SummaryCard

                    title="Total Sites"

                    value={summary?.totalSites ?? 0}

                    color="primary"

                    icon={

                        <LocationCityIcon

                            color="primary"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

                <SummaryCard

                    title="Healthy Sites"

                    value={summary?.healthySites ?? 0}

                    color="success"

                    icon={

                        <CheckCircleIcon

                            color="success"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

                <SummaryCard

                    title="Warning Sites"

                    value={summary?.warningSites ?? 0}

                    color="warning"

                    icon={

                        <WarningAmberIcon

                            color="warning"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>

                <SummaryCard

                    title="Online Sites"

                    value={summary?.onlineSites ?? 0}

                    color="success"

                    icon={

                        <PowerIcon

                            color="success"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

        </Grid>

    );

}