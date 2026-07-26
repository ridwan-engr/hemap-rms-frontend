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

import useAlarm from "../hooks/useAlarm";

/*
|--------------------------------------------------------------------------
| Severity Colors
|--------------------------------------------------------------------------
*/

const COLORS = [

    "#D32F2F", // Critical

    "#F57C00", // Major

    "#1976D2", // Minor

    "#FBC02D", // Warning

    "#388E3C"  // Information

];

/*
|--------------------------------------------------------------------------
| Alarm Severity Chart
|--------------------------------------------------------------------------
*/

export default function AlarmSeverityChart() {

    const {

        severity,

        loading,

        error

    } = useAlarm();

    if (loading) {

        return (

            <Card>

                <CardContent>

                    <Stack

                        justifyContent="center"

                        alignItems="center"

                        sx={{

                            minHeight: 350

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

    const data = severity || [];

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    fontWeight={700}

                >

                    Alarm Severity Distribution

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Distribution of alarms by severity level

                </Typography>

                <Divider sx={{ my: 2 }} />

                <ResponsiveContainer

                    width="100%"

                    height={350}

                >

                    <PieChart>

                        <Pie

                            data={data}

                            dataKey="count"

                            nameKey="severity"

                            outerRadius={120}

                            innerRadius={60}

                            paddingAngle={3}

                            label={({ severity, percent }) =>

                                `${severity} ${(percent * 100).toFixed(1)}%`

                            }

                        >

                            {

                                data.map((entry, index) => (

                                    <Cell

                                        key={entry.severity}

                                        fill={

                                            COLORS[

                                                index % COLORS.length

                                            ]

                                        }

                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip

                            formatter={(value) => [

                                value,

                                "Alarms"

                            ]}

                        />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}