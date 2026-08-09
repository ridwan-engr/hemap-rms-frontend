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
    ComposedChart,
    Area,
    Line,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

import useOptimization from "../hooks/useOptimization.js";

/*
|--------------------------------------------------------------------------
| Generator Schedule Chart
|--------------------------------------------------------------------------
|
| Displays:
| • Generator Output Power
| • Generator Loading
| • Fuel Consumption
| • Generator Status
|
*/

export default function GeneratorScheduleChart({
    siteId,
    height = 400
}) {

    const {
        generatorSchedule,
        loading,
        error
    } = useOptimization({
        siteId
    });

    /*
    |--------------------------------------------------------------------------
    | Loading
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
    | Error
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
                              "Unable to load generator schedule."
                        }

                    </Typography>

                </CardContent>

            </Card>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Normalize Data
    |--------------------------------------------------------------------------
    */

    const data =
        Array.isArray(generatorSchedule)
            ? generatorSchedule
            : Array.isArray(generatorSchedule?.history)
                ? generatorSchedule.history
                : Array.isArray(generatorSchedule?.data)
                    ? generatorSchedule.data
                    : [];

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (!data.length) {

        return (
            <Card>

                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Generator Dispatch Schedule
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 1
                        }}
                    >
                        No generator schedule data is currently available.
                    </Typography>

                </CardContent>

            </Card>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Latest Generator Status
    |--------------------------------------------------------------------------
    */

    const latestStatus =
        data[data.length - 1]?.status ?? "Unknown";

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Card>

            <CardContent>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    justifyContent="space-between"
                    alignItems={{
                        xs: "flex-start",
                        sm: "center"
                    }}
                    spacing={1}
                >

                    <Stack>

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            Generator Dispatch Schedule
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Optimized Generator Operation
                        </Typography>

                    </Stack>

                    <Typography
                        variant="body2"
                        fontWeight={600}
                    >
                        Status: {latestStatus}
                    </Typography>

                </Stack>

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer
                    width="100%"
                    height={height}
                >

                    <ComposedChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 10,
                            bottom: 10
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="time"
                        />

                        <YAxis
                            yAxisId="power"
                            unit=" kW"
                        />

                        <YAxis
                            yAxisId="loading"
                            orientation="right"
                            domain={[0, 100]}
                            unit="%"
                        />

                        <Tooltip />

                        <Legend />

                        <Bar
                            yAxisId="power"
                            dataKey="power"
                            name="Generator Output"
                            fill="#FB8C00"
                        />

                        <Area
                            yAxisId="power"
                            type="monotone"
                            dataKey="fuel"
                            name="Fuel Consumption"
                            stroke="#6D4C41"
                            fill="#BCAAA4"
                            fillOpacity={0.5}
                        />

                        <Line
                            yAxisId="loading"
                            type="monotone"
                            dataKey="loading"
                            name="Generator Loading"
                            stroke="#1565C0"
                            strokeWidth={3}
                            dot={false}
                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>
    );
}