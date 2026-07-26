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
*/

export default function ForecastChart({

    siteId,

    height = 380

}) {

    const {

        forecast,

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

                    <Typography color="error">

                        {error}

                    </Typography>

                </CardContent>

            </Card>

        );

    }

    const data = forecast?.history || [];

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

                    Predicted Load, Solar Output, Battery SOC and Generator Runtime

                </Typography>

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer

                    width="100%"

                    height={height}

                >

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

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