import {
    Chip,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Typography,
    Divider
} from "@mui/material";

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

export default function DashboardAlarms({

    alarms = [],

    loading

}) {

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

                ) : alarms.length === 0 ? (

                    <Typography color="text.secondary">

                        No active alarms.

                    </Typography>

                ) : (

                    <List disablePadding>

                        {

                            alarms.map((alarm) => (

                                <div key={alarm._id ?? alarm.vrmAlarmId}>

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

                                                    {alarm.name}

                                                </Typography>

                                                <Chip
                                                    size="small"
                                                    color={getSeverityColor(alarm.severity)}
                                                    label={alarm.severity}
                                                />

                                            </Stack>

                                            <ListItemText

                                                primary={alarm.message}

                                                secondary={

                                                    alarm.startedAt

                                                        ? new Date(

                                                            alarm.startedAt

                                                        ).toLocaleString()

                                                        : ""

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