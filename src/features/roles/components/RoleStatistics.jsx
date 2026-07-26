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

import useRole from "../hooks/useRole";

/*
|--------------------------------------------------------------------------
| Role Statistics
|--------------------------------------------------------------------------
*/

export default function RoleStatistics() {

    const {

        statistics

    } = useRole();

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    gutterBottom

                >

                    Permissions by Role

                </Typography>

                <ResponsiveContainer

                    width="100%"

                    height={350}

                >

                    <BarChart

                        data={statistics}

                    >

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />

                        <XAxis

                            dataKey="role"

                        />

                        <YAxis

                            allowDecimals={false}

                        />

                        <Tooltip />

                        <Bar

                            dataKey="permissions"

                            name="Permissions"

                        />

                    </BarChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}