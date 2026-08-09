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
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

import useAlarm from "../hooks/useAlarm";

/*
|--------------------------------------------------------------------------
| Severity Colors
|--------------------------------------------------------------------------
*/

const COLORS = [
    "#D32F2F",
    "#F57C00",
    "#1976D2",
    "#FBC02D",
    "#388E3C"
];

/*
|--------------------------------------------------------------------------
| Alarm Severity Chart
|--------------------------------------------------------------------------
*/

export default function AlarmSeverityChart() {

    const {
        severity,
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
                            minHeight: 350,
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

    const data = Array.isArray(severity)
        ? severity
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
                    Alarm Severity Distribution
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Distribution of alarms by severity level
                </Typography>

                <Divider
                    sx={{
                        my: 2
                    }}
                />

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="severity"
                            outerRadius={120}
                            innerRadius={60}
                            paddingAngle={3}
                            label={({
                                severity,
                                percent
                            }) =>
                                `${severity} ${(
                                    percent * 100
                                ).toFixed(1)}%`
                            }
                        >

                            {data.map(
                                (entry, index) => (

                                    <Cell
                                        key={
                                            entry.severity ||
                                            index
                                        }
                                        fill={
                                            COLORS[
                                                index %
                                                COLORS.length
                                            ]
                                        }
                                    />

                                )
                            )}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}