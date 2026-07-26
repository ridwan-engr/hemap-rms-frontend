import {

    Card,
    CardContent,
    Typography,
    Skeleton

} from "@mui/material";

import {

    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend

} from "recharts";

import useDevice from "../hooks/useDevice";

/*
|--------------------------------------------------------------------------
| Device Statistics
|--------------------------------------------------------------------------
*/

export default function DeviceStatistics() {

    const {

        statistics,

        loading

    } = useDevice();

    if (loading) {

        return (

            <Card>

                <CardContent>

                    <Skeleton

                        variant="text"

                        width={220}

                        height={40}

                    />

                    <Skeleton

                        variant="rounded"

                        height={340}

                    />

                </CardContent>

            </Card>

        );

    }

    const chartData = [

        {

            category: "Inverter",

            total:

                statistics.inverters ?? 0

        },

        {

            category: "Battery",

            total:

                statistics.batteries ?? 0

        },

        {

            category: "Solar",

            total:

                statistics.solar ?? 0

        },

        {

            category: "Generator",

            total:

                statistics.generators ?? 0

        },

        {

            category: "Meter",

            total:

                statistics.meters ?? 0

        },

        {

            category: "Rectifier",

            total:

                statistics.rectifiers ?? 0

        }

    ];

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    fontWeight={700}

                    gutterBottom

                >

                    Device Distribution

                </Typography>

                <ResponsiveContainer

                    width="100%"

                    height={340}

                >

                    <BarChart

                        data={chartData}

                    >

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />

                        <XAxis

                            dataKey="category"

                        />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar

                            dataKey="total"

                            name="Devices"

                        />

                    </BarChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}