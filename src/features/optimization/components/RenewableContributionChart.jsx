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

import useOptimization from "../hooks/useOptimization.js";

/*
|--------------------------------------------------------------------------
| Chart Colors
|--------------------------------------------------------------------------
*/

const COLORS = [
    "#4CAF50",
    "#2196F3",
    "#FF9800",
    "#9E9E9E"
];

/*
|--------------------------------------------------------------------------
| Renewable Contribution Chart
|--------------------------------------------------------------------------
|
| Displays the percentage contribution of each power source
| to the optimized energy mix.
|
|--------------------------------------------------------------------------
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

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (
            <Card>

                <CardContent>

                    <Typography color="error">

                        {typeof error === "string"
                            ? error
                            : error?.message ||
                              "Unable to load renewable contribution."
                        }

                    </Typography>

                </CardContent>

            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Normalize Data
    |--------------------------------------------------------------------------
    */

    const data =
        Array.isArray(renewableContribution)
            ? renewableContribution
            : Array.isArray(
                renewableContribution?.sources
            )
                ? renewableContribution.sources
                : Array.isArray(
                    renewableContribution?.data
                )
                    ? renewableContribution.data
                    : [];

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (!data.length) {

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
                        sx={{
                            mt: 1
                        }}
                    >
                        No optimized energy mix data is currently
                        available.
                    </Typography>

                </CardContent>

            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

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

                <Divider
                    sx={{
                        my: 2
                    }}
                />

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
                            label={({
                                source,
                                percentage
                            }) =>
                                `${source || "Unknown"} (${percentage ?? 0}%)`
                            }
                        >

                            {data.map(
                                (entry, index) => (

                                    <Cell
                                        key={
                                            entry?.source ||
                                            `source-${index}`
                                        }
                                        fill={
                                            COLORS[
                                                index %
                                                COLORS.length
                                            ]
                                        }
                                    />

                                )
                            )}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>
    );
}