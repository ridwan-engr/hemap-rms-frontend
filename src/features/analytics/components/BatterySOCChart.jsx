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

    const data = battery?.history || [];

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

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer

                    width="100%"

                    height={height}

                >

                    <AreaChart

                        data={data}

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

                        />

                        <Tooltip />

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

                            stroke="#2e7d32"

                            fill="#81c784"

                            strokeWidth={3}

                        />

                    </AreaChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}