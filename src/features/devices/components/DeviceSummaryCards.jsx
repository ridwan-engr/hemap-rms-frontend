import {

    Grid,
    Card,
    CardContent,
    Typography,
    Skeleton

} from "@mui/material";

import MemoryIcon from "@mui/icons-material/Memory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorIcon from "@mui/icons-material/Error";

import useDevice from "../hooks/useDevice.js";

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

        <Card>

            <CardContent>

                <Grid

                    container

                    alignItems="center"

                    spacing={2}

                >

                    <Grid>

                        {icon}

                    </Grid>

                    <Grid>

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

                            {value}

                        </Typography>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}

/*
|--------------------------------------------------------------------------
| Device Summary Cards
|--------------------------------------------------------------------------
*/

export default function DeviceSummaryCards() {

    const {

        summary,

        loading

    } = useDevice();

    if (loading) {

        return (

            <Grid

                container

                spacing={2}

            >

                {

                    Array.from(

                        {

                            length: 4

                        }

                    ).map(

                        (

                            _,

                            index

                        ) => (

                            <Grid

                                key={index}

                                size={{

                                    xs: 12,

                                    sm: 6,

                                    lg: 3

                                }}

                            >

                                <Skeleton

                                    variant="rounded"

                                    height={120}

                                />

                            </Grid>

                        )

                    )

                }

            </Grid>

        );

    }

    return (

        <Grid

            container

            spacing={2}

        >

            <Grid

                size={{

                    xs: 12,

                    sm: 6,

                    lg: 3

                }}

            >

                <SummaryCard

                    title="Total Devices"

                    value={summary.totalDevices ?? 0}

                    color="primary"

                    icon={

                        <MemoryIcon

                            color="primary"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid

                size={{

                    xs: 12,

                    sm: 6,

                    lg: 3

                }}

            >

                <SummaryCard

                    title="Healthy"

                    value={summary.healthyDevices ?? 0}

                    color="success"

                    icon={

                        <CheckCircleIcon

                            color="success"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid

                size={{

                    xs: 12,

                    sm: 6,

                    lg: 3

                }}

            >

                <SummaryCard

                    title="Warning"

                    value={summary.warningDevices ?? 0}

                    color="warning"

                    icon={

                        <WarningAmberIcon

                            color="warning"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid

                size={{

                    xs: 12,

                    sm: 6,

                    lg: 3

                }}

            >

                <SummaryCard

                    title="Critical"

                    value={summary.criticalDevices ?? 0}

                    color="error"

                    icon={

                        <ErrorIcon

                            color="error"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

        </Grid>

    );

}