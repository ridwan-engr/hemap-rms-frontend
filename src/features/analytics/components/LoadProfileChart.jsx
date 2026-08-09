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
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine
} from "recharts";

import useAnalytics from "../hooks/useAnalytics";

/*
|--------------------------------------------------------------------------
| Load Profile Chart
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
| Expected API response:
|
| {
|     loadProfile: [
|         {
|             time: "00:00",
|             load: 8.5,
|             peak: 10.2
|         }
|     ],
|
|     averageLoad: 9.4
| }
|
|--------------------------------------------------------------------------
*/

export default function LoadProfileChart({
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
                              "Unable to load load-profile analytics."
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
        energy?.loadProfile
    )
        ? energy.loadProfile
        : [];

    const averageLoad = Number(
        energy?.averageLoad ?? 0
    );

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
                        Load Profile
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Site Demand Throughout the Day
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
                            No load-profile data available.
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
                    Load Profile
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Site Demand Throughout the Day
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

                    <AreaChart
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
                            unit=" kW"
                        />

                        <Tooltip
                            formatter={(value, name) => [
                                `${value} kW`,
                                name
                            ]}
                        />

                        <Legend />

                        {/*
                        |--------------------------------------------------------------------------
                        | Average Load Reference
                        |--------------------------------------------------------------------------
                        */}

                        <ReferenceLine
                            y={averageLoad}
                            stroke="#d32f2f"
                            strokeDasharray="5 5"
                            label={{
                                value: `Average ${averageLoad.toFixed(2)} kW`,
                                position: "insideTopRight"
                            }}
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | Actual Load
                        |--------------------------------------------------------------------------
                        */}

                        <Area
                            type="monotone"
                            dataKey="load"
                            name="Actual Load"
                            stroke="#1976D2"
                            fill="#90CAF9"
                            strokeWidth={2}
                            activeDot={{
                                r: 5
                            }}
                            connectNulls
                        />

                        {/*
                        |--------------------------------------------------------------------------
                        | Peak Demand
                        |--------------------------------------------------------------------------
                        */}

                        <Line
                            type="monotone"
                            dataKey="peak"
                            name="Peak Demand"
                            stroke="#FF6F00"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{
                                r: 5
                            }}
                            connectNulls
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>
    );
}