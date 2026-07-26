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

import { useEffect, useState } from "react";
import api from "../../../api/axios";

/*
|--------------------------------------------------------------------------
| Alarm Severity
|--------------------------------------------------------------------------
*/

function SeverityChip({ severity }) {

    switch (severity?.toUpperCase()) {

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

    const [alarms, setAlarms] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadAlarms() {

        try {

            const response = await api.get(

                "/telemetry/alarms"

            );

            setAlarms(

                response.data.data || []

            );

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadAlarms();

    }, []);

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

                        label={`${alarms.length} Active`}

                        color={
                            alarms.length
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

                    !loading && alarms.length === 0 && (

                        <Alert severity="success">

                            No active alarms.

                        </Alert>

                    )

                }

                {

                    !loading && alarms.length > 0 && (

                        <List disablePadding>

                            {

                                alarms.map((alarm) => (

                                    <ListItem
                                        divider
                                        key={alarm._id}
                                    >

                                        <ListItemText

                                            primary={alarm.title}

                                            secondary={`${alarm.siteName} • ${alarm.timestamp}`}

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