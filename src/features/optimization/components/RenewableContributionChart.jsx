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
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend
} from "recharts";

import useOptimization from "../hooks/useOptimization";

/*
|--------------------------------------------------------------------------
| Chart Colors
|--------------------------------------------------------------------------
*/

const COLORS = [

    "#4CAF50",   // Solar

    "#2196F3",   // Battery

    "#FF9800",   // Generator

    "#9E9E9E"    // Grid

];

/*
|--------------------------------------------------------------------------
| Renewable Contribution Chart
|--------------------------------------------------------------------------
|
| Displays the percentage contribution of each power source
| to the optimized energy mix.
|
*/

export default function RenewableContributionChart({

    siteId,

    height = 420

}) {

    const {

        renewableContribution,

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

    const data = renewableContribution?.sources || [];

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    fontWeight={700}

                >

                    Energy Source Contribution

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Optimized Energy Mix

                </Typography>

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer

                    width="100%"

                    height={height}

                >

                    <PieChart>

                        <Pie

                            data={data}

                            dataKey="energy"

                            nameKey="source"

                            outerRadius={140}

                            innerRadius={70}

                            label={(entry) =>

                                `${entry.source} (${entry.percentage}%)`

                            }

                        >

                            {

                                data.map((entry, index) => (

                                    <Cell

                                        key={entry.source}

                                        fill={

                                            COLORS[

                                                index % COLORS.length

                                            ]

                                        }

                                    />

                                ))

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