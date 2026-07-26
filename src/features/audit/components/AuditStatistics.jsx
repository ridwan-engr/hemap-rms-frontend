import {

    Card,
    CardContent,
    Typography

} from "@mui/material";

import {

    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis

} from "recharts";

import useAudit from "../hooks/useAudit";

/*
|--------------------------------------------------------------------------
| Audit Statistics
|--------------------------------------------------------------------------
*/

export default function AuditStatistics() {

    const {

        statistics,

        loading

    } = useAudit();

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    gutterBottom

                >

                    Audit Activity by Module

                </Typography>

                <ResponsiveContainer

                    width="100%"

                    height={350}

                >

                    <BarChart

                        data={statistics}

                        margin={{

                            top: 20,

                            right: 20,

                            left: 10,

                            bottom: 20

                        }}

                    >

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />

                        <XAxis

                            dataKey="module"

                        />

                        <YAxis

                            allowDecimals={false}

                        />

                        <Tooltip />

                        <Bar

                            dataKey="count"

                            name="Audit Logs"

                            radius={[

                                4,

                                4,

                                0,

                                0

                            ]}

                            isAnimationActive={!loading}

                        />

                    </BarChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}