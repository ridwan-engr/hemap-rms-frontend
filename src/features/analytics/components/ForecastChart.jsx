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
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

import useAnalytics from "../hooks/useAnalytics";

/*
|--------------------------------------------------------------------------
| Forecast Chart
|--------------------------------------------------------------------------
|
| Forecast data is obtained from the dashboard analytics response because
| the current Analytics API contract does NOT expose:
|
| GET /analytics/forecast
|
| Supported endpoints:
|
| GET /analytics/dashboard
| GET /analytics/energy
| GET /analytics/battery
| GET /analytics/solar
| GET /analytics/generator
| GET /analytics/grid
| GET /analytics/reliability
|
| Expected dashboard response structure:
|
| {
|     forecast: {
|         history: [
|             {
|                 time: "08:00",
|                 load: 42,
|                 solar: 18,
|                 batterySoc: 76,
|                 generatorRuntime: 0.5
|             }
|         ]
|     }
| }
|
|--------------------------------------------------------------------------
*/

export default function ForecastChart({
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

                    <Typography
                        color="error"
                        variant="body2"
                    >
                        {typeof error === "string"
                            ? error
                            : error?.message ||
                              "Unable to load energy forecast."
                        }
                    </Typography>

                </CardContent>

            </Card>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Forecast Data
    |--------------------------------------------------------------------------
    */

    const forecast = dashboard?.forecast;

    const data = Array.isArray(
        forecast?.history
    )
        ? forecast.history
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
                        Energy Forecast
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 1
                        }}
                    >
                        Predicted Load, Solar Output,
                        Battery SOC and Generator Runtime
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
                            No forecast data available.
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
                    Energy Forecast
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Predicted Load, Solar Output,
                    Battery SOC and Generator Runtime
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

                    <LineChart
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

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="load"
                            name="Predicted Load (kW)"
                            stroke="#1565C0"
                            strokeWidth={3}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="solar"
                            name="Predicted Solar (kW)"
                            stroke="#F9A825"
                            strokeWidth={3}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="batterySoc"
                            name="Battery SOC (%)"
                            stroke="#2E7D32"
                            strokeWidth={3}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="generatorRuntime"
                            name="Generator Runtime (hrs)"
                            stroke="#D32F2F"
                            strokeDasharray="5 5"
                            strokeWidth={3}
                            dot={false}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>
    );
}