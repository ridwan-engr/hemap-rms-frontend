import {
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import TimelineIcon from "@mui/icons-material/Timeline";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TimerIcon from "@mui/icons-material/Timer";

import useAlarm from "../hooks/useAlarm";

/*
|--------------------------------------------------------------------------
| Statistics Item
|--------------------------------------------------------------------------
*/

function StatisticItem({

    icon,

    title,

    value,

    unit = ""

}) {

    return (

        <Stack
            spacing={1}
            alignItems="center"
        >

            {icon}

            <Typography
                variant="body2"
                color="text.secondary"
                align="center"
            >

                {title}

            </Typography>

            <Typography
                variant="h5"
                fontWeight={700}
            >

                {value ?? "--"} {unit}

            </Typography>

        </Stack>

    );

}

/*
|--------------------------------------------------------------------------
| Alarm Statistics
|--------------------------------------------------------------------------
*/

export default function AlarmStatistics() {

    const {

        statistics,

        loading,

        error

    } = useAlarm();

    if (loading) {

        return (

            <Card>

                <CardContent>

                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            minHeight: 320
                        }}
                    >

                        <CircularProgress />

                    </Stack>

                </CardContent>

            </Card>

        );

    }

    if (error) {

        return (

            <Card>

                <CardContent>

                    <Typography color="error">

                        {error}

                    </Typography>

                </CardContent>

            </Card>

        );

    }

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                >

                    Alarm Statistics

                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >

                    Alarm Performance Indicators

                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid
                    container
                    spacing={3}
                >

                    <Grid size={{ xs: 6, md: 4 }}>

                        <StatisticItem

                            title="Total Alarms"

                            value={statistics?.totalAlarms}

                            icon={

                                <TimelineIcon

                                    color="primary"

                                    fontSize="large"

                                />

                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>

                        <StatisticItem

                            title="Active"

                            value={statistics?.activeAlarms}

                            icon={

                                <NotificationsActiveIcon

                                    color="error"

                                    fontSize="large"

                                />

                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>

                        <StatisticItem

                            title="Acknowledged"

                            value={statistics?.acknowledgedAlarms}

                            icon={

                                <AssignmentTurnedInIcon

                                    color="warning"

                                    fontSize="large"

                                />

                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>

                        <StatisticItem

                            title="Resolved"

                            value={statistics?.resolvedAlarms}

                            icon={

                                <CheckCircleIcon

                                    color="success"

                                    fontSize="large"

                                />

                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>

                        <StatisticItem

                            title="MTTA"

                            value={statistics?.mtta}

                            unit="min"

                            icon={

                                <ScheduleIcon

                                    color="info"

                                    fontSize="large"

                                />

                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 6, md: 4 }}>

                        <StatisticItem

                            title="MTTR"

                            value={statistics?.mttr}

                            unit="min"

                            icon={

                                <TimerIcon

                                    color="secondary"

                                    fontSize="large"

                                />

                            }

                        />

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}