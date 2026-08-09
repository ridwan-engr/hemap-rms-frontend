import {
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import {
    Savings,
    LocalGasStation,
    Bolt,
    Co2,
    TrendingUp
} from "@mui/icons-material";

import useOptimization from "../hooks/useOptimization.js";

/*
|--------------------------------------------------------------------------
| KPI Item
|--------------------------------------------------------------------------
*/

function KPI({
    icon,
    title,
    value,
    unit
}) {

    return (
        <Stack
            spacing={1}
            sx={{
                alignItems: "center"
            }}
        >

            {icon}

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    textAlign: "center"
                }}
            >
                {title}
            </Typography>

            <Typography
                variant="h6"
                fontWeight={700}
                sx={{
                    textAlign: "center"
                }}
            >
                {value ?? "--"}

                {unit && ` ${unit}`}
            </Typography>

        </Stack>
    );
}

/*
|--------------------------------------------------------------------------
| Cost Savings Card
|--------------------------------------------------------------------------
*/

export default function CostSavingsCard({
    siteId
}) {

    const {
        costSavings,
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
                            minHeight: 300
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
                              "Unable to load optimization savings."
                        }

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
        <Card
            sx={{
                height: "100%"
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    Optimization Cost Savings
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Financial Benefits Achieved
                </Typography>

                <Divider
                    sx={{
                        my: 2
                    }}
                />

                <Grid
                    container
                    spacing={4}
                >

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >

                        <KPI
                            icon={
                                <Savings
                                    color="success"
                                    fontSize="large"
                                />
                            }
                            title="Operating Cost Saved"
                            value={
                                costSavings?.operatingCostSaved
                            }
                            unit="₦"
                        />

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >

                        <KPI
                            icon={
                                <LocalGasStation
                                    color="warning"
                                    fontSize="large"
                                />
                            }
                            title="Diesel Saved"
                            value={
                                costSavings?.dieselSaved
                            }
                            unit="L"
                        />

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >

                        <KPI
                            icon={
                                <Bolt
                                    color="primary"
                                    fontSize="large"
                                />
                            }
                            title="Grid Energy Saved"
                            value={
                                costSavings?.gridEnergySaved
                            }
                            unit="kWh"
                        />

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <KPI
                            icon={
                                <Co2
                                    color="action"
                                    fontSize="large"
                                />
                            }
                            title="CO₂ Emissions Reduced"
                            value={
                                costSavings?.co2Reduction
                            }
                            unit="kg"
                        />

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <KPI
                            icon={
                                <TrendingUp
                                    color="success"
                                    fontSize="large"
                                />
                            }
                            title="Projected Annual Savings"
                            value={
                                costSavings?.annualSavings
                            }
                            unit="₦"
                        />

                    </Grid>

                </Grid>

            </CardContent>

        </Card>
    );
}