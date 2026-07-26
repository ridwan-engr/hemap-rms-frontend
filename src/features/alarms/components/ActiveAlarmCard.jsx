import {
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import useAlarm from "../hooks/useAlarm";

/*
|--------------------------------------------------------------------------
| Alarm KPI Item
|--------------------------------------------------------------------------
*/

function AlarmItem({

    title,

    value,

    color,

    icon

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

            >

                {title}

            </Typography>

            <Typography

                variant="h5"

                fontWeight={700}

                color={color}

            >

                {value}

            </Typography>

        </Stack>

    );

}

/*
|--------------------------------------------------------------------------
| Active Alarm Card
|--------------------------------------------------------------------------
*/

export default function ActiveAlarmCard() {

    const {

        activeSummary,

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

                            minHeight: 280

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

                    Active Alarm Summary

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Current Network Alarm Status

                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid

                    container

                    spacing={3}

                >

                    <Grid size={{ xs: 6 }}>

                        <AlarmItem

                            title="Critical"

                            value={activeSummary?.critical ?? 0}

                            color="error.main"

                            icon={

                                <ErrorIcon

                                    color="error"

                                    fontSize="large"

                                />

                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <AlarmItem

                            title="Major"

                            value={activeSummary?.major ?? 0}

                            color="warning.main"

                            icon={

                                <WarningAmberIcon

                                    color="warning"

                                    fontSize="large"

                                />

                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <AlarmItem

                            title="Minor"

                            value={activeSummary?.minor ?? 0}

                            color="info.main"

                            icon={

                                <ReportProblemIcon

                                    color="info"

                                    fontSize="large"

                                />

                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 6 }}>

                        <AlarmItem

                            title="Warning"

                            value={activeSummary?.warning ?? 0}

                            color="secondary.main"

                            icon={

                                <NotificationsIcon

                                    color="secondary"

                                    fontSize="large"

                                />

                            }

                        />

                    </Grid>

                    <Grid size={{ xs: 12 }}>

                        <AlarmItem

                            title="Cleared Today"

                            value={activeSummary?.cleared ?? 0}

                            color="success.main"

                            icon={

                                <CheckCircleIcon

                                    color="success"

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