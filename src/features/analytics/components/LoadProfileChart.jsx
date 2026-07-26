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

    const data = energy?.loadProfile || [];

    const averageLoad = energy?.averageLoad ?? 0;

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

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer
                    width="100%"
                    height={height}
                >

                    <AreaChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="time" />

                        <YAxis unit="kW" />

                        <Tooltip />

                        <Legend />

                        <ReferenceLine

                            y={averageLoad}

                            stroke="#d32f2f"

                            strokeDasharray="5 5"

                            label="Average"

                        />

                        <Area

                            type="monotone"

                            dataKey="load"

                            name="Actual Load"

                            stroke="#1976D2"

                            fill="#90CAF9"

                            strokeWidth={2}

                        />

                        <Line

                            type="monotone"

                            dataKey="peak"

                            name="Peak Demand"

                            stroke="#FF6F00"

                            strokeWidth={3}

                            dot={false}

                        />

                    </AreaChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}