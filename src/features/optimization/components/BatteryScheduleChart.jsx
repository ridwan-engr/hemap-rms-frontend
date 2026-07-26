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
    Bar,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine
} from "recharts";

import useOptimization from "../hooks/useOptimization";

/*
|--------------------------------------------------------------------------
| Battery Schedule Chart
|--------------------------------------------------------------------------
|
| Displays:
|   • Charging Power
|   • Discharging Power
|   • Battery State of Charge (SOC)
|
*/

export default function BatteryScheduleChart({

    siteId,

    height = 400

}) {

    const {

        batterySchedule,

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

    const data = batterySchedule?.history || [];

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    fontWeight={700}

                >

                    Battery Charge / Discharge Schedule

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Optimized Battery Operation

                </Typography>

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer

                    width="100%"

                    height={height}

                >

                    <ComposedChart

                        data={data}

                    >

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis

                            dataKey="time"

                        />

                        <YAxis

                            yAxisId="power"

                            unit="kW"

                        />

                        <YAxis

                            yAxisId="soc"

                            orientation="right"

                            domain={[0, 100]}

                            unit="%"

                        />

                        <Tooltip />

                        <Legend />

                        <ReferenceLine

                            yAxisId="soc"

                            y={20}

                            stroke="#D32F2F"

                            strokeDasharray="5 5"

                            label="Min SOC"

                        />

                        <ReferenceLine

                            yAxisId="soc"

                            y={100}

                            stroke="#2E7D32"

                            strokeDasharray="5 5"

                            label="Max SOC"

                        />

                        <Bar

                            yAxisId="power"

                            dataKey="charge"

                            name="Charge"

                            fill="#43A047"

                        />

                        <Bar

                            yAxisId="power"

                            dataKey="discharge"

                            name="Discharge"

                            fill="#FB8C00"

                        />

                        <Area

                            yAxisId="soc"

                            type="monotone"

                            dataKey="soc"

                            name="SOC"

                            stroke="#1565C0"

                            fill="#90CAF9"

                        />

                        <Line

                            yAxisId="soc"

                            type="monotone"

                            dataKey="soc"

                            stroke="#1565C0"

                            strokeWidth={3}

                            dot={false}

                        />

                    </ComposedChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}