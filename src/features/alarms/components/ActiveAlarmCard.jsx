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
            sx={{
                alignItems: "center",
                textAlign: "center"
            }}
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
                {value ?? 0}
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
        loadingSummary,
        error
    } = useAlarm();

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loadingSummary) {

        return (

            <Card>

                <CardContent>

                    <Stack
                        sx={{
                            minHeight: 280,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >

                        <CircularProgress />

                    </Stack>

                </CardContent>

            </Card>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Error State
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

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

                <Divider
                    sx={{
                        my: 2
                    }}
                />

                <Grid
                    container
                    spacing={3}
                >

                    {/* Critical */}

                    <Grid
                        size={{
                            xs: 6
                        }}
                    >

                        <AlarmItem
                            title="Critical"
                            value={
                                activeSummary?.critical ??
                                activeSummary?.Critical ??
                                0
                            }
                            color="error.main"
                            icon={
                                <ErrorIcon
                                    color="error"
                                    fontSize="large"
                                />
                            }
                        />

                    </Grid>

                    {/* Major */}

                    <Grid
                        size={{
                            xs: 6
                        }}
                    >

                        <AlarmItem
                            title="Major"
                            value={
                                activeSummary?.major ??
                                activeSummary?.Major ??
                                0
                            }
                            color="warning.main"
                            icon={
                                <WarningAmberIcon
                                    color="warning"
                                    fontSize="large"
                                />
                            }
                        />

                    </Grid>

                    {/* Minor */}

                    <Grid
                        size={{
                            xs: 6
                        }}
                    >

                        <AlarmItem
                            title="Minor"
                            value={
                                activeSummary?.minor ??
                                activeSummary?.Minor ??
                                0
                            }
                            color="info.main"
                            icon={
                                <ReportProblemIcon
                                    color="info"
                                    fontSize="large"
                                />
                            }
                        />

                    </Grid>

                    {/* Warning */}

                    <Grid
                        size={{
                            xs: 6
                        }}
                    >

                        <AlarmItem
                            title="Warning"
                            value={
                                activeSummary?.warning ??
                                activeSummary?.Warning ??
                                0
                            }
                            color="secondary.main"
                            icon={
                                <NotificationsIcon
                                    color="secondary"
                                    fontSize="large"
                                />
                            }
                        />

                    </Grid>

                    {/* Cleared Today */}

                    <Grid
                        size={{
                            xs: 12
                        }}
                    >

                        <AlarmItem
                            title="Cleared Today"
                            value={
                                activeSummary?.cleared ??
                                activeSummary?.clearedToday ??
                                0
                            }
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