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
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

import useAnalytics from "../hooks/useAnalytics";

/*
|--------------------------------------------------------------------------
| Solar Generation Chart
|--------------------------------------------------------------------------
|
| API:
| GET /analytics/solar
|
| Redux:
| analytics.solar
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
|             irradiance: 520,
|             actual: 42.5,
|             expected: 48.0
|         }
|     ]
| }
|
|--------------------------------------------------------------------------
*/

export default function SolarGenerationChart({
    siteId,
    height = 350
}) {

    const {
        solar,
        loading,
        error
    } = useAnalytics({
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

                    <Typography
                        color="error"
                        variant="body2"
                    >
                        {typeof error === "string"
                            ? error
                            : error?.message ||
                              "Unable to load solar analytics."
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

    const data = Array.isArray(
        solar?.history
    )
        ? solar.history
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
                        Solar Generation
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        PV Output vs Irradiance vs Expected Production
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
                            No solar generation data available.
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
                    Solar Generation
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    PV Output vs Irradiance vs Expected Production
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
                        | Solar Power Axis
                        |--------------------------------------------------------------------------
                        */}

                        <YAxis
                            yAxisId="power"
                            orientation="left"
                            unit=" kW"
                            label={{
                                value: "Power (kW)",
                                angle: -90,
                                position: "insideLeft"
                            }}
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | Irradiance Axis
                        |--------------------------------------------------------------------------
                        */}

                        <YAxis
                            yAxisId="irradiance"
                            orientation="right"
                            unit=" W/m²"
                            label={{
                                value: "Irradiance (W/m²)",
                                angle: 90,
                                position: "insideRight"
                            }}
                        />

                        <Tooltip />

                        <Legend />

                        {/*
                        |--------------------------------------------------------------------------
                        | Solar Irradiance
                        |--------------------------------------------------------------------------
                        */}

                        <Area
                            yAxisId="irradiance"
                            type="monotone"
                            dataKey="irradiance"
                            name="Solar Irradiance"
                            fill="#FFE082"
                            stroke="#FBC02D"
                            fillOpacity={0.45}
                            connectNulls
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | Actual PV Output
                        |--------------------------------------------------------------------------
                        */}

                        <Line
                            yAxisId="power"
                            type="monotone"
                            dataKey="actual"
                            name="Actual Output"
                            stroke="#2E7D32"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{
                                r: 5
                            }}
                            connectNulls
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | Expected PV Output
                        |--------------------------------------------------------------------------
                        */}

                        <Line
                            yAxisId="power"
                            type="monotone"
                            dataKey="expected"
                            name="Expected Output"
                            stroke="#1565C0"
                            strokeDasharray="6 4"
                            strokeWidth={2}
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