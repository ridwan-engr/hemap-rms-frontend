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

import useOptimization from "../hooks/useOptimization";

/*
|--------------------------------------------------------------------------
| Generator Schedule Chart
|--------------------------------------------------------------------------
|
| Displays:
|   • Generator Output Power
|   • Generator Loading
|   • Fuel Consumption
|   • Generator Status
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

    if (loading) {

        return (

            <Card>

                <CardContent>

                    <Stack
                        justifyContent="center"
                        alignItems="center"
                        sx={{ height }}
                    >

                        <CircularProgress />

                    </Stack>

                </CardContent>

            </Card>

        );

    }

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

    const data = generatorSchedule?.history || [];

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
                >

                    Optimized Generator Operation

                </Typography>

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer
                    width="100%"
                    height={height}
                >

                    <ComposedChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="time" />

                        <YAxis

                            yAxisId="power"

                            unit="kW"

                        />

                        <YAxis

                            yAxisId="loading"

                            orientation="right"

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

                        <Line

                            yAxisId="loading"

                            type="stepAfter"

                            dataKey="status"

                            name="Generator Status"

                            stroke="#D32F2F"

                            strokeDasharray="5 5"

                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}