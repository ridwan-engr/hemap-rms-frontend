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
*/

export default function AlarmTrendChart() {

    const {
        trends,
        loadingStatistics,
        error
    } = useAlarm();

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loadingStatistics) {

        return (

            <Card>

                <CardContent>

                    <Stack
                        sx={{
                            minHeight: 360,
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
    | Error
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
    | Chart Data
    |--------------------------------------------------------------------------
    */

    const data = Array.isArray(trends)
        ? trends
        : [];

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
                    Alarm Trend
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Alarm occurrence over time
                </Typography>

                <Divider
                    sx={{
                        my: 2
                    }}
                />

                <ResponsiveContainer
                    width="100%"
                    height={340}
                >

                    <AreaChart
                        data={data}
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