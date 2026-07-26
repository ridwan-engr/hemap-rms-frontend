import {
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

import useAnalytics from "../hooks/useAnalytics";

/*
|--------------------------------------------------------------------------
| Alarm Trend Chart
|--------------------------------------------------------------------------
*/

export default function AlarmTrendChart({

    siteId,

    height = 380

}) {

    const {

        alarms,

        loading,

        error

    } = useAnalytics({

        siteId

    });

    if (loading) {

        return (

            <Card>

                <CardContent>

                    <Stack

                        justifyContent="center"

                        alignItems="center"

                        sx={{

                            height

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

    const data = alarms?.history || [];

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    fontWeight={700}

                >

                    Alarm Trend Analysis

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Alarm occurrences grouped by severity

                </Typography>

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer

                    width="100%"

                    height={height}

                >

                    <BarChart data={data}>

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />

                        <XAxis

                            dataKey="period"

                        />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar

                            dataKey="critical"

                            name="Critical"

                            fill="#D32F2F"

                        />

                        <Bar

                            dataKey="major"

                            name="Major"

                            fill="#F57C00"

                        />

                        <Bar

                            dataKey="minor"

                            name="Minor"

                            fill="#FBC02D"

                        />

                        <Bar

                            dataKey="warning"

                            name="Warning"

                            fill="#1976D2"

                        />

                    </BarChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}