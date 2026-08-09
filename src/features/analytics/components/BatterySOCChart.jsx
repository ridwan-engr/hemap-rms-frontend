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
    Tooltip,
    ReferenceLine
} from "recharts";

import useAnalytics from "../hooks/useAnalytics";

/*
|--------------------------------------------------------------------------
| Battery State of Charge Chart
|--------------------------------------------------------------------------
|
| API:
| GET /analytics/battery
|
| Redux:
| analytics.battery
|
| Hook:
| useAnalytics()
|
| Expected battery response:
|
| {
|     history: [
|         {
|             time: "08:00",
|             soc: 72
|         }
|     ]
| }
|
|--------------------------------------------------------------------------
*/

export default function BatterySOCChart({
    siteId,
    height = 350
}) {

    const {
        battery,
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
                    >
                        {typeof error === "string"
                            ? error
                            : error?.message ||
                              "Failed to load battery analytics."
                        }
                    </Typography>

                </CardContent>

            </Card>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Normalize Battery History
    |--------------------------------------------------------------------------
    */

    const data = Array.isArray(battery?.history)
        ? battery.history
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
                    Battery State of Charge
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Battery charge profile throughout the day
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
                            No battery SOC history available.
                        </Typography>

                    </Stack>

                ) : (

                    <ResponsiveContainer
                        width="100%"
                        height={height}
                    >

                        <AreaChart
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
                                dataKey="time"
                            />

                            <YAxis
                                domain={[0, 100]}
                                unit="%"
                                allowDecimals={false}
                            />

                            <Tooltip
                                formatter={(value) => [
                                    `${value}%`,
                                    "Battery SOC"
                                ]}
                            />

                            <ReferenceLine
                                y={20}
                                stroke="#f44336"
                                strokeDasharray="5 5"
                                label="Critical"
                            />

                            <ReferenceLine
                                y={50}
                                stroke="#ff9800"
                                strokeDasharray="5 5"
                                label="Low"
                            />

                            <ReferenceLine
                                y={80}
                                stroke="#4caf50"
                                strokeDasharray="5 5"
                                label="Healthy"
                            />

                            <Area
                                type="monotone"
                                dataKey="soc"
                                name="Battery SOC"
                                stroke="#2e7d32"
                                fill="#81c784"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{
                                    r: 5
                                }}
                                connectNulls
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                )}

            </CardContent>

        </Card>
    );
}