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

    const data = generator?.fuelHistory || [];

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

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer

                    width="100%"

                    height={height}

                >

                    <ComposedChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="time" />

                        <YAxis

                            yAxisId="fuel"

                            unit="L"

                        />

                        <YAxis

                            yAxisId="load"

                            orientation="right"

                            unit="%"

                        />

                        <Tooltip />

                        <Legend />

                        <Bar

                            yAxisId="fuel"

                            dataKey="fuel"

                            name="Fuel Consumed"

                            fill="#F57C00"

                        />

                        <Line

                            yAxisId="fuel"

                            type="monotone"

                            dataKey="runtime"

                            name="Runtime (hrs)"

                            stroke="#1565C0"

                            strokeWidth={2}

                        />

                        <Line

                            yAxisId="load"

                            type="monotone"

                            dataKey="loading"

                            name="Generator Loading"

                            stroke="#2E7D32"

                            strokeWidth={3}

                            dot={false}

                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}