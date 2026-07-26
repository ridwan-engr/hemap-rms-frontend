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

    const data = reliability?.history || [];

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

                    Availability, MTBF, MTTR and Reliability Indices

                </Typography>

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer

                    width="100%"

                    height={height}

                >

                    <ComposedChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis

                            dataKey="period"

                        />

                        <YAxis

                            yAxisId="left"

                        />

                        <YAxis

                            yAxisId="right"

                            orientation="right"

                        />

                        <Tooltip />

                        <Legend />

                        <Bar

                            yAxisId="left"

                            dataKey="availability"

                            name="Availability (%)"

                            fill="#2E7D32"

                        />

                        <Line

                            yAxisId="right"

                            dataKey="saidi"

                            name="SAIDI"

                            stroke="#1976D2"

                            strokeWidth={3}

                        />

                        <Line

                            yAxisId="right"

                            dataKey="saifi"

                            name="SAIFI"

                            stroke="#F57C00"

                            strokeWidth={3}

                        />

                        <Line

                            yAxisId="right"

                            dataKey="ens"

                            name="ENS"

                            stroke="#D32F2F"

                            strokeWidth={3}

                        />

                        <Line

                            yAxisId="right"

                            dataKey="mtbf"

                            name="MTBF"

                            stroke="#6A1B9A"

                            strokeDasharray="5 5"

                        />

                        <Line

                            yAxisId="right"

                            dataKey="mttr"

                            name="MTTR"

                            stroke="#00897B"

                            strokeDasharray="5 5"

                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}