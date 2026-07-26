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
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

import useAlarm from "../hooks/useAlarm";

/*
|--------------------------------------------------------------------------
| Alarm Trend Chart
|--------------------------------------------------------------------------
|
| Displays alarm occurrence trends over time.
|
| Supports:
| • Hourly
| • Daily
| • Weekly
| • Monthly
|
*/

export default function AlarmTrendChart() {

    const {

        trends,

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

                            minHeight: 360

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

                    Alarm Trend

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Alarm occurrence over time

                </Typography>

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer

                    width="100%"

                    height={340}

                >

                    <AreaChart

                        data={trends || []}

                    >

                        <defs>

                            <linearGradient

                                id="alarmGradient"

                                x1="0"

                                y1="0"

                                x2="0"

                                y2="1"

                            >

                                <stop

                                    offset="5%"

                                    stopColor="#1976D2"

                                    stopOpacity={0.8}

                                />

                                <stop

                                    offset="95%"

                                    stopColor="#1976D2"

                                    stopOpacity={0.1}

                                />

                            </linearGradient>

                        </defs>

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />

                        <XAxis

                            dataKey="period"

                        />

                        <YAxis />

                        <Tooltip />

                        <Area

                            type="monotone"

                            dataKey="count"

                            stroke="#1976D2"

                            fill="url(#alarmGradient)"

                            strokeWidth={3}

                        />

                    </AreaChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}