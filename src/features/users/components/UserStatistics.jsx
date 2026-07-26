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

import useUser from "../hooks/useUser";

/*
|--------------------------------------------------------------------------
| User Statistics
|--------------------------------------------------------------------------
*/

export default function UserStatistics() {

    const {

        statistics,

        loading

    } = useUser();

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

    const chartData = statistics || [];

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    fontWeight={700}

                    gutterBottom

                >

                    User Distribution by Role

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

                            dataKey="role"

                        />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Bar

                            dataKey="total"

                            name="Users"

                        />

                    </BarChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}