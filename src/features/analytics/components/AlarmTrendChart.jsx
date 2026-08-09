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
|
| Displays alarm occurrences grouped by severity.
|
| Data source:
|
| GET /analytics/dashboard
|
| The component uses useAnalytics() rather than calling the API directly.
|
|--------------------------------------------------------------------------
*/

export default function AlarmTrendChart({
    siteId,
    height = 380
}) {

    const {
        dashboard,
        loading,
        error
    } = useAnalytics({
        siteId
    });

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

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

                        {typeof error === "string"
                            ? error
                            : error?.message ||
                              "Failed to load alarm analytics."
                        }

                    </Typography>

                </CardContent>

            </Card>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Alarm History
    |--------------------------------------------------------------------------
    |
    | Expected backend structure:
    |
    | dashboard.alarms.history
    |
    | Example:
    |
    | {
    |     period: "2026-08-01",
    |     critical: 2,
    |     major: 5,
    |     minor: 8,
    |     warning: 4
    | }
    |
    */

    const data =
        dashboard?.alarms?.history ||
        dashboard?.alarmHistory ||
        [];

    /*
    |--------------------------------------------------------------------------
    | Chart
    |--------------------------------------------------------------------------
    */

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

                <Divider
                    sx={{
                        my: 2
                    }}
                />

                {data.length === 0 ? (

                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            height
                        }}
                    >

                        <Typography
                            color="text.secondary"
                        >
                            No alarm history available.
                        </Typography>

                    </Stack>

                ) : (

                    <ResponsiveContainer
                        width="100%"
                        height={height}
                    >

                        <BarChart
                            data={data}
                            margin={{
                                top: 10,
                                right: 20,
                                left: 0,
                                bottom: 10
                            }}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="period"
                            />

                            <YAxis
                                allowDecimals={false}
                            />

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

                )}

            </CardContent>

        </Card>
    );
}