import {
    Alert,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";

import ErrorIcon from "@mui/icons-material/Error";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import useDashboard from "../hooks/useDashboard";

/*
|--------------------------------------------------------------------------
| Alarm Severity
|--------------------------------------------------------------------------
*/

function SeverityChip({ severity }) {

    switch ((severity || "").toUpperCase()) {

        case "CRITICAL":

            return (

                <Chip

                    color="error"

                    icon={<ErrorIcon />}

                    label="Critical"

                    size="small"

                />

            );

        case "WARNING":

            return (

                <Chip

                    color="warning"

                    icon={<WarningAmberIcon />}

                    label="Warning"

                    size="small"

                />

            );

        default:

            return (

                <Chip

                    color="info"

                    icon={<InfoOutlinedIcon />}

                    label="Info"

                    size="small"

                />

            );

    }

}

/*
|--------------------------------------------------------------------------
| Alarm Summary
|--------------------------------------------------------------------------
*/

export default function AlarmSummary() {

    const {

        alarms,

        loading

    } = useDashboard();

    const activeAlarms = alarms ?? [];

    return (

        <Card>

            <CardContent>

                <Stack

                    direction="row"

                    justifyContent="space-between"

                    alignItems="center"

                    mb={2}

                >

                    <Typography

                        variant="h6"

                        fontWeight={700}

                    >

                        Active Alarms

                    </Typography>

                    <Chip

                        label={`${activeAlarms.length} Active`}

                        color={
                            activeAlarms.length > 0

                                ? "error"

                                : "success"
                        }

                    />

                </Stack>

                <Divider sx={{ mb: 2 }} />

                {

                    loading && (

                        <Stack

                            alignItems="center"

                            py={4}

                        >

                            <CircularProgress />

                        </Stack>

                    )

                }

                {

                    !loading && activeAlarms.length === 0 && (

                        <Alert severity="success">

                            No active alarms.

                        </Alert>

                    )

                }

                {

                    !loading && activeAlarms.length > 0 && (

                        <List disablePadding>

                            {

                                activeAlarms.map((alarm, index) => (

                                    <ListItem

                                        divider

                                        key={
                                            alarm._id ??

                                            alarm.vrmAlarmId ??

                                            index
                                        }

                                    >

                                        <ListItemText

                                            primary={
                                                alarm.title ??

                                                alarm.name ??

                                                "Unnamed Alarm"
                                            }

                                            secondary={

                                                [

                                                    alarm.siteName,

                                                    alarm.startedAt
                                                        ? new Date(
                                                            alarm.startedAt
                                                        ).toLocaleString()
                                                        : null

                                                ]

                                                    .filter(Boolean)

                                                    .join(" • ")

                                            }

                                        />

                                        <SeverityChip

                                            severity={alarm.severity}

                                        />

                                    </ListItem>

                                ))

                            }

                        </List>

                    )

                }

            </CardContent>

        </Card>

    );

}