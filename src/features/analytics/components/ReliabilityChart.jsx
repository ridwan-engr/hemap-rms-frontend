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
| Reliability Chart
|--------------------------------------------------------------------------
|
| API:
| GET /analytics/reliability
|
| Redux:
| analytics.reliability
|
| Hook:
| useAnalytics()
|
| Expected response:
|
| {
|     history: [
|         {
|             period: "Jan",
|             availability: 98.5,
|             saidi: 4.2,
|             saifi: 1.4,
|             ens: 12.5,
|             mtbf: 720,
|             mttr: 2.4
|         }
|     ]
| }
|
|--------------------------------------------------------------------------
*/

export default function ReliabilityChart({
    siteId,
    height = 380
}) {

    const {
        reliability,
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
                              "Unable to load reliability analytics."
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
        reliability?.history
    )
        ? reliability.history
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
                        Reliability Performance
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Availability, SAIDI, SAIFI, ENS, MTBF and MTTR
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
                            No reliability data available.
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
                    Reliability Performance
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Availability, SAIDI, SAIFI, ENS, MTBF and MTTR
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
                            dataKey="period"
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | Availability Axis
                        |--------------------------------------------------------------------------
                        */}

                        <YAxis
                            yAxisId="availability"
                            orientation="left"
                            domain={[0, 100]}
                            unit="%"
                            label={{
                                value: "Availability (%)",
                                angle: -90,
                                position: "insideLeft"
                            }}
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | Reliability Metrics Axis
                        |--------------------------------------------------------------------------
                        */}

                        <YAxis
                            yAxisId="metrics"
                            orientation="right"
                            label={{
                                value: "Reliability Metrics",
                                angle: 90,
                                position: "insideRight"
                            }}
                        />

                        <Tooltip />

                        <Legend />

                        {/*
                        |--------------------------------------------------------------------------
                        | Availability
                        |--------------------------------------------------------------------------
                        */}

                        <Bar
                            yAxisId="availability"
                            dataKey="availability"
                            name="Availability (%)"
                            fill="#2E7D32"
                            radius={[
                                4,
                                4,
                                0,
                                0
                            ]}
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | SAIDI
                        |--------------------------------------------------------------------------
                        */}

                        <Line
                            yAxisId="metrics"
                            type="monotone"
                            dataKey="saidi"
                            name="SAIDI"
                            stroke="#1976D2"
                            strokeWidth={3}
                            dot={false}
                            connectNulls
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | SAIFI
                        |--------------------------------------------------------------------------
                        */}

                        <Line
                            yAxisId="metrics"
                            type="monotone"
                            dataKey="saifi"
                            name="SAIFI"
                            stroke="#F57C00"
                            strokeWidth={3}
                            dot={false}
                            connectNulls
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | ENS
                        |--------------------------------------------------------------------------
                        */}

                        <Line
                            yAxisId="metrics"
                            type="monotone"
                            dataKey="ens"
                            name="ENS"
                            stroke="#D32F2F"
                            strokeWidth={3}
                            dot={false}
                            connectNulls
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | MTBF
                        |--------------------------------------------------------------------------
                        */}

                        <Line
                            yAxisId="metrics"
                            type="monotone"
                            dataKey="mtbf"
                            name="MTBF"
                            stroke="#6A1B9A"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                            dot={false}
                            connectNulls
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | MTTR
                        |--------------------------------------------------------------------------
                        */}

                        <Line
                            yAxisId="metrics"
                            type="monotone"
                            dataKey="mttr"
                            name="MTTR"
                            stroke="#00897B"
                            strokeDasharray="5 5"
                            strokeWidth={2}
                            dot={false}
                            connectNulls
                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>
    );
}