import {

    Card,
    CardContent,
    Typography,
    Skeleton

} from "@mui/material";

import {

    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend

} from "recharts";

import useDevice from "../hooks/useDevice";

/*
|--------------------------------------------------------------------------
| Chart Colors
|--------------------------------------------------------------------------
*/

const COLORS = [

    "#4CAF50", // Healthy

    "#FFC107", // Warning

    "#F44336", // Critical

    "#9E9E9E"  // Offline

];

/*
|--------------------------------------------------------------------------
| Device Health Chart
|--------------------------------------------------------------------------
*/

export default function DeviceHealthChart() {

    const {

        health,

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

            name: "Healthy",

            value:

                health.healthy ?? 0

        },

        {

            name: "Warning",

            value:

                health.warning ?? 0

        },

        {

            name: "Critical",

            value:

                health.critical ?? 0

        },

        {

            name: "Offline",

            value:

                health.offline ?? 0

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

                    Device Health

                </Typography>

                <ResponsiveContainer

                    width="100%"

                    height={340}

                >

                    <PieChart>

                        <Pie

                            data={chartData}

                            dataKey="value"

                            nameKey="name"

                            outerRadius={120}

                            label

                        >

                            {

                                chartData.map(

                                    (

                                        _,

                                        index

                                    ) => (

                                        <Cell

                                            key={index}

                                            fill={

                                                COLORS[index]

                                            }

                                        />

                                    )

                                )

                            }

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}