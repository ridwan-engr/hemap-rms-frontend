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

    const data = solar?.history || [];

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

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer

                    width="100%"

                    height={height}

                >

                    <ComposedChart

                        data={data}

                    >

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />

                        <XAxis

                            dataKey="time"

                        />

                        <YAxis

                            yAxisId="power"

                            unit="kW"

                        />

                        <YAxis

                            yAxisId="irradiance"

                            orientation="right"

                            unit="W/m²"

                        />

                        <Tooltip />

                        <Legend />

                        <Area

                            yAxisId="irradiance"

                            type="monotone"

                            dataKey="irradiance"

                            name="Solar Irradiance"

                            fill="#FFE082"

                            stroke="#FBC02D"

                        />

                        <Line

                            yAxisId="power"

                            type="monotone"

                            dataKey="actual"

                            name="Actual Output"

                            stroke="#2E7D32"

                            strokeWidth={3}

                            dot={false}

                        />

                        <Line

                            yAxisId="power"

                            type="monotone"

                            dataKey="expected"

                            name="Expected Output"

                            stroke="#1565C0"

                            strokeDasharray="6 4"

                            strokeWidth={2}

                            dot={false}

                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}