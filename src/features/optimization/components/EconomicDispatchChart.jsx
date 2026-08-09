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
    Legend
} from "recharts";

import useOptimization from "../hooks/useOptimization.js";

/*
|--------------------------------------------------------------------------
| Economic Dispatch Chart
|--------------------------------------------------------------------------
|
| Displays optimized power dispatch for:
| • Solar PV
| • Battery
| • Generator
| • Utility Grid
| • Total Load
|
*/

export default function EconomicDispatchChart({
    siteId,
    height = 400
}) {

    const {
        dispatch,
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
                              "Unable to load economic dispatch."
                        }

                    </Typography>

                </CardContent>

            </Card>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Normalize Dispatch Data
    |--------------------------------------------------------------------------
    */

    const data =
        Array.isArray(dispatch)
            ? dispatch
            : Array.isArray(dispatch?.history)
                ? dispatch.history
                : Array.isArray(dispatch?.data)
                    ? dispatch.data
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
                        Economic Dispatch
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 1
                        }}
                    >
                        No optimized dispatch data is currently available.
                    </Typography>

                </CardContent>

            </Card>
        );

    }

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
                    Economic Dispatch
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Optimized Energy Dispatch Schedule
                </Typography>

                <Divider sx={{ my: 2 }} />

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

                        <Tooltip />

                        <Legend />

                        <Area
                            type="monotone"
                            dataKey="solar"
                            stackId="1"
                            name="Solar PV"
                            stroke="#FBC02D"
                            fill="#FDD835"
                            fillOpacity={0.7}
                        />

                        <Area
                            type="monotone"
                            dataKey="battery"
                            stackId="1"
                            name="Battery"
                            stroke="#43A047"
                            fill="#66BB6A"
                            fillOpacity={0.7}
                        />

                        <Area
                            type="monotone"
                            dataKey="generator"
                            stackId="1"
                            name="Generator"
                            stroke="#EF6C00"
                            fill="#FB8C00"
                            fillOpacity={0.7}
                        />

                        <Area
                            type="monotone"
                            dataKey="grid"
                            stackId="1"
                            name="Utility Grid"
                            stroke="#1565C0"
                            fill="#42A5F5"
                            fillOpacity={0.7}
                        />

                        <Line
                            type="monotone"
                            dataKey="load"
                            name="Total Load"
                            stroke="#D32F2F"
                            strokeWidth={3}
                            dot={false}
                        />

                    </AreaChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>
    );
}