import {
    Chip,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Typography
} from "@mui/material";

import useDashboard from "../hooks/useDashboard";

/*
|--------------------------------------------------------------------------
| Severity Color
|--------------------------------------------------------------------------
*/

function getSeverityColor(severity) {

    switch ((severity || "").toUpperCase()) {

        case "CRITICAL":
            return "error";

        case "WARNING":
            return "warning";

        case "INFO":
            return "info";

        case "RESOLVED":
            return "success";

        default:
            return "default";

    }

}

/*
|--------------------------------------------------------------------------
| Dashboard Alarms
|--------------------------------------------------------------------------
*/

export default function DashboardAlarms() {

    const {

        alarms,

        loading

    } = useDashboard();

    const activeAlarms = alarms ?? [];

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

                Active Alarms

            </Typography>

            {

                loading ? (

                    <Typography color="text.secondary">

                        Loading alarms...

                    </Typography>

                ) : activeAlarms.length === 0 ? (

                    <Typography color="text.secondary">

                        No active alarms.

                    </Typography>

                ) : (

                    <List disablePadding>

                        {

                            activeAlarms.map((alarm, index) => (

                                <div

                                    key={
                                        alarm._id ??
                                        alarm.vrmAlarmId ??
                                        `${alarm.name}-${index}`
                                    }

                                >

                                    <ListItem

                                        disableGutters

                                        sx={{

                                            py: 2

                                        }}

                                    >

                                        <Stack

                                            width="100%"

                                            spacing={1}

                                        >

                                            <Stack

                                                direction="row"

                                                justifyContent="space-between"

                                                alignItems="center"

                                            >

                                                <Typography

                                                    fontWeight={600}

                                                >

                                                    {

                                                        alarm.name ??

                                                        "Unnamed Alarm"

                                                    }

                                                </Typography>

                                                <Chip

                                                    size="small"

                                                    color={
                                                        getSeverityColor(
                                                            alarm.severity
                                                        )
                                                    }

                                                    label={
                                                        alarm.severity ??
                                                        "UNKNOWN"
                                                    }

                                                />

                                            </Stack>

                                            <ListItemText

                                                primary={
                                                    alarm.message ??
                                                    "No description available."
                                                }

                                                secondary={

                                                    alarm.startedAt

                                                        ? new Date(

                                                            alarm.startedAt

                                                        ).toLocaleString()

                                                        : null

                                                }

                                            />

                                        </Stack>

                                    </ListItem>

                                    <Divider />

                                </div>

                            ))

                        }

                    </List>

                )

            }

        </Paper>

    );

}