import {

    Card,
    CardContent,
    Typography,
    Skeleton,
    Box

} from "@mui/material";

import {

    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend

} from "recharts";

import useSite from "../hooks/useSites.js";

/*
|--------------------------------------------------------------------------
| Chart Colors
|--------------------------------------------------------------------------
*/

const COLORS = [

    "#2E7D32", // Healthy

    "#ED6C02", // Warning

    "#D32F2F", // Critical

    "#616161"  // Offline

];

/*
|--------------------------------------------------------------------------
| Site Health Chart
|--------------------------------------------------------------------------
*/

export default function SiteHealthChart() {

    const {

        health,

        loading

    } = useSite();

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

            value: health?.healthy ?? 0

        },

        {

            name: "Warning",

            value: health?.warning ?? 0

        },

        {

            name: "Critical",

            value: health?.critical ?? 0

        },

        {

            name: "Offline",

            value: health?.offline ?? 0

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

                    Site Health Distribution

                </Typography>

                <Box

                    sx={{

                        width: "100%",

                        height: 340

                    }}

                >

                    <ResponsiveContainer>

                        <PieChart>

                            <Pie

                                data={chartData}

                                dataKey="value"

                                nameKey="name"

                                outerRadius={110}

                                label

                            >

                                {

                                    chartData.map(

                                        (

                                            entry,

                                            index

                                        ) => (

                                            <Cell

                                                key={entry.name}

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

                </Box>

            </CardContent>

        </Card>

    );

}