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
    Bar,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

import useAnalytics from "../hooks/useAnalytics";

/*
|--------------------------------------------------------------------------
| Fuel Consumption Chart
|--------------------------------------------------------------------------
|
| API:
| GET /analytics/generator
|
| Redux:
| analytics.generator
|
| Hook:
| useAnalytics()
|
| Expected response structure:
|
| {
|     fuelHistory: [
|         {
|             time: "08:00",
|             fuel: 12.5,
|             runtime: 2.4,
|             loading: 68
|         }
|     ]
| }
|
|--------------------------------------------------------------------------
*/

export default function FuelConsumptionChart({
    siteId,
    height = 350
}) {

    const {
        generator,
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

                    <Typography
                        color="error"
                        variant="body2"
                    >
                        {typeof error === "string"
                            ? error
                            : error?.message ||
                              "Unable to load generator analytics."
                        }
                    </Typography>

                </CardContent>

            </Card>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Normalize Generator History
    |--------------------------------------------------------------------------
    */

    const data = Array.isArray(
        generator?.fuelHistory
    )
        ? generator.fuelHistory
        : [];

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (data.length === 0) {

        return (
            <Card>

                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Generator Fuel Consumption
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 0.5
                        }}
                    >
                        Fuel Usage, Runtime and Generator Loading
                    </Typography>

                    <Divider
                        sx={{
                            my: 2
                        }}
                    />

                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            height
                        }}
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            No generator fuel history available.
                        </Typography>

                    </Stack>

                </CardContent>

            </Card>
        );

    }

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
                    Generator Fuel Consumption
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Fuel Usage, Runtime and Generator Loading
                </Typography>

                <Divider
                    sx={{
                        my: 2
                    }}
                />

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

                        {/*
                        |--------------------------------------------------------------------------
                        | Fuel Axis
                        |--------------------------------------------------------------------------
                        */}

                        <YAxis
                            yAxisId="fuel"
                            orientation="left"
                            unit=" L"
                            label={{
                                value: "Fuel (L)",
                                angle: -90,
                                position: "insideLeft"
                            }}
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | Loading Axis
                        |--------------------------------------------------------------------------
                        */}

                        <YAxis
                            yAxisId="load"
                            orientation="right"
                            domain={[0, 100]}
                            unit="%"
                            label={{
                                value: "Loading (%)",
                                angle: 90,
                                position: "insideRight"
                            }}
                        />

                        <Tooltip
                            formatter={(value, name) => {

                                if (
                                    name === "Fuel Consumed"
                                ) {

                                    return [
                                        `${value} L`,
                                        name
                                    ];

                                }

                                if (
                                    name === "Runtime"
                                ) {

                                    return [
                                        `${value} hrs`,
                                        name
                                    ];

                                }

                                if (
                                    name === "Generator Loading"
                                ) {

                                    return [
                                        `${value}%`,
                                        name
                                    ];

                                }

                                return [
                                    value,
                                    name
                                ];

                            }}
                        />

                        <Legend />

                        {/*
                        |--------------------------------------------------------------------------
                        | Fuel Consumption
                        |--------------------------------------------------------------------------
                        */}

                        <Bar
                            yAxisId="fuel"
                            dataKey="fuel"
                            name="Fuel Consumed"
                            fill="#F57C00"
                            radius={[
                                4,
                                4,
                                0,
                                0
                            ]}
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | Generator Runtime
                        |--------------------------------------------------------------------------
                        */}

                        <Line
                            yAxisId="fuel"
                            type="monotone"
                            dataKey="runtime"
                            name="Runtime"
                            stroke="#1565C0"
                            strokeWidth={2}
                            dot={false}
                            activeDot={{
                                r: 5
                            }}
                            connectNulls
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | Generator Loading
                        |--------------------------------------------------------------------------
                        */}

                        <Line
                            yAxisId="load"
                            type="monotone"
                            dataKey="loading"
                            name="Generator Loading"
                            stroke="#2E7D32"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{
                                r: 5
                            }}
                            connectNulls
                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>
    );
}