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

    if (error) {

        return (

            <Card>

                <CardContent>

                    <Typography

                        color="error"

                    >

                        {error}

                    </Typography>

                </CardContent>

            </Card>

        );

    }

    const chartData = energy?.history || [];

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

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer

                    width="100%"

                    height={height}

                >

                    <LineChart

                        data={chartData}

                    >

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />

                        <XAxis

                            dataKey="time"

                        />

                        <YAxis

                            unit="kWh"

                        />

                        <Tooltip />

                        <Legend />

                        <Line

                            type="monotone"

                            dataKey="solar"

                            name="Solar"

                            stroke="#f9a825"

                            strokeWidth={2}

                            dot={false}

                        />

                        <Line

                            type="monotone"

                            dataKey="generator"

                            name="Generator"

                            stroke="#d32f2f"

                            strokeWidth={2}

                            dot={false}

                        />

                        <Line

                            type="monotone"

                            dataKey="grid"

                            name="Grid"

                            stroke="#1976d2"

                            strokeWidth={2}

                            dot={false}

                        />

                        <Line

                            type="monotone"

                            dataKey="load"

                            name="Load"

                            stroke="#388e3c"

                            strokeWidth={3}

                            dot={false}

                        />

                    </LineChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}