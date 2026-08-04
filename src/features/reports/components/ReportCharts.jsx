import {

    Card,
    CardContent,
    Grid,
    Typography

} from "@mui/material";

import {

    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,

    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,

    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis

} from "recharts";

import useReports from "../hooks/useReports.js";

/*
|--------------------------------------------------------------------------
| Chart Colors
|--------------------------------------------------------------------------
*/

const COLORS = [

    "#1976d2",

    "#2e7d32",

    "#ed6c02",

    "#d32f2f"

];

/*
|--------------------------------------------------------------------------
| Report Charts
|--------------------------------------------------------------------------
*/

export default function ReportCharts() {

    const {

        summary

    } = useReports();

    if (!summary) {

        return null;

    }

    /*
    |--------------------------------------------------------------------------
    | Energy Mix
    |--------------------------------------------------------------------------
    */

    const energyMix = [

        {

            name: "Solar",

            value: summary.totalSolarEnergy

        },

        {

            name: "Grid",

            value: summary.totalGridEnergy

        },

        {

            name: "Generator",

            value: summary.totalGeneratorEnergy

        }

    ];

    /*
    |--------------------------------------------------------------------------
    | Reliability
    |--------------------------------------------------------------------------
    */

    const reliability = [

        {

            metric: "SAIDI",

            value: summary.saidi

        },

        {

            metric: "SAIFI",

            value: summary.saifi

        },

        {

            metric: "ENS",

            value: summary.ens

        },

        {

            metric: "LOLP",

            value: summary.lolp

        }

    ];

    /*
    |--------------------------------------------------------------------------
    | Performance
    |--------------------------------------------------------------------------
    */

    const performance = [

        {

            subject: "Battery",

            value: summary.batteryEfficiency

        },

        {

            subject: "Renewable",

            value: summary.renewableFraction

        },

        {

            subject: "Resilience",

            value: summary.resilience

        }

    ];

    return (

        <Grid

            container

            spacing={3}

        >

            <Grid

                size={{

                    xs:12,

                    lg:4

                }}

            >

                <Card>

                    <CardContent>

                        <Typography

                            variant="h6"

                            gutterBottom

                        >

                            Energy Mix

                        </Typography>

                        <ResponsiveContainer

                            width="100%"

                            height={320}

                        >

                            <PieChart>

                                <Pie

                                    data={energyMix}

                                    dataKey="value"

                                    nameKey="name"

                                    outerRadius={110}

                                >

                                    {

                                        energyMix.map(

                                            (

                                                entry,

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

            </Grid>

            <Grid

                size={{

                    xs:12,

                    lg:4

                }}

            >

                <Card>

                    <CardContent>

                        <Typography

                            variant="h6"

                            gutterBottom

                        >

                            Reliability Indices

                        </Typography>

                        <ResponsiveContainer

                            width="100%"

                            height={320}

                        >

                            <BarChart

                                data={reliability}

                            >

                                <CartesianGrid

                                    strokeDasharray="3 3"

                                />

                                <XAxis

                                    dataKey="metric"

                                />

                                <YAxis />

                                <Tooltip />

                                <Bar

                                    dataKey="value"

                                    fill="#1976d2"

                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </CardContent>

                </Card>

            </Grid>

            <Grid

                size={{

                    xs:12,

                    lg:4

                }}

            >

                <Card>

                    <CardContent>

                        <Typography

                            variant="h6"

                            gutterBottom

                        >

                            System Performance

                        </Typography>

                        <ResponsiveContainer

                            width="100%"

                            height={320}

                        >

                            <RadarChart

                                data={performance}

                            >

                                <PolarGrid />

                                <PolarAngleAxis

                                    dataKey="subject"

                                />

                                <PolarRadiusAxis />

                                <Radar

                                    dataKey="value"

                                    fill="#2e7d32"

                                    stroke="#2e7d32"

                                    fillOpacity={0.4}

                                />

                                <Tooltip />

                            </RadarChart>

                        </ResponsiveContainer>

                    </CardContent>

                </Card>

            </Grid>

        </Grid>

    );

}