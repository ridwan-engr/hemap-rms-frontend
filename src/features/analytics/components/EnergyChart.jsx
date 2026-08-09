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
    LineChart,
    Line,
    CartesianGrid,
    Tooltip,
    Legend,
    XAxis,
    YAxis
} from "recharts";

import useAnalytics from "../hooks/useAnalytics";

/*
|--------------------------------------------------------------------------
| Energy Chart
|--------------------------------------------------------------------------
|
| API:
| GET /analytics/energy
|
| Redux:
| analytics.energy
|
| Hook:
| useAnalytics()
|
| Expected response:
|
| {
|     history: [
|         {
|             time: "08:00",
|             solar: 12.5,
|             generator: 4.2,
|             grid: 3.8,
|             load: 18.7
|         }
|     ]
| }
|
|--------------------------------------------------------------------------
*/

export default function EnergyChart({
    siteId,
    height = 350
}) {

    const {
        energy,
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
                        alignItems="center"
                        justifyContent="center"
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
                    >
                        {typeof error === "string"
                            ? error
                            : error?.message ||
                              "Failed to load energy analytics."
                        }
                    </Typography>

                </CardContent>

            </Card>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Normalize API Data
    |--------------------------------------------------------------------------
    */

    const chartData = Array.isArray(energy?.history)
        ? energy.history
        : [];

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
                    Energy Generation
                </Typography>

                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    Renewable vs Generator vs Grid
                </Typography>

                <Divider
                    sx={{
                        my: 2
                    }}
                />

                {chartData.length === 0 ? (

                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            height
                        }}
                    >

                        <Typography
                            color="text.secondary"
                        >
                            No energy history available.
                        </Typography>

                    </Stack>

                ) : (

                    <ResponsiveContainer
                        width="100%"
                        height={height}
                    >

                        <LineChart
                            data={chartData}
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
                                dataKey="time"
                            />

                            <YAxis
                                unit=" kWh"
                            />

                            <Tooltip
                                formatter={(value, name) => [
                                    `${value} kWh`,
                                    name
                                ]}
                            />

                            <Legend />

                            <Line
                                type="monotone"
                                dataKey="solar"
                                name="Solar"
                                stroke="#f9a825"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{
                                    r: 5
                                }}
                                connectNulls
                            />

                            <Line
                                type="monotone"
                                dataKey="generator"
                                name="Generator"
                                stroke="#d32f2f"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{
                                    r: 5
                                }}
                                connectNulls
                            />

                            <Line
                                type="monotone"
                                dataKey="grid"
                                name="Grid"
                                stroke="#1976d2"
                                strokeWidth={2}
                                dot={false}
                                activeDot={{
                                    r: 5
                                }}
                                connectNulls
                            />

                            <Line
                                type="monotone"
                                dataKey="load"
                                name="Load"
                                stroke="#388e3c"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{
                                    r: 5
                                }}
                                connectNulls
                            />

                        </LineChart>

                    </ResponsiveContainer>

                )}

            </CardContent>

        </Card>
    );
}