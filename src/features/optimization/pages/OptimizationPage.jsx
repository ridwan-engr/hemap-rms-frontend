import { Alert, Container, Grid, Stack } from "@mui/material";

import useOptimization from "../hooks/useOptimization";

import DispatchSummary from "../components/DispatchSummary";
import EconomicDispatchChart from "../components/EconomicDispatchChart";
import BatterySchedulerChart from "../components/BatteryScheduleChart";
import GeneratorSchedulerChart from "../components/GeneratorScheduleChart";
import RenewableContributionChart from "../components/RenewableContributionChart";
import CostSavingCard from "../components/CostSavingsCard";
import OptimizationRecommendations from "../components/OptimizationRecommendations";

export default function OptimizationPage() {

    const {

        summary,

        dispatch,

        batterySchedule,

        generatorSchedule,

        renewableContribution,

        costSavings,

        recommendations,

        loading,

        error,

        refresh

    } = useOptimization();

    if (error) {

        return (

            <Container maxWidth="xl" sx={{ py: 3 }}>

                <Alert severity="error">

                    {error}

                </Alert>

            </Container>

        );

    }

    return (

        <Container

            maxWidth="xl"

            sx={{

                py: 3

            }}

        >

            <Stack spacing={3}>

                <DispatchSummary

                    summary={summary}

                    loading={loading}

                    onRefresh={refresh}

                />

                <Grid container spacing={3}>

                    <Grid

                        size={{

                            xs: 12,

                            lg: 8

                        }}

                    >

                        <EconomicDispatchChart

                            dispatch={dispatch}

                            loading={loading}

                        />

                    </Grid>

                    <Grid

                        size={{

                            xs: 12,

                            lg: 4

                        }}

                    >

                        <CostSavingCard

                            costSavings={costSavings}

                            loading={loading}

                        />

                    </Grid>

                </Grid>

                <Grid container spacing={3}>

                    <Grid

                        size={{

                            xs: 12,

                            lg: 6

                        }}

                    >

                        <BatterySchedulerChart

                            schedule={batterySchedule}

                            loading={loading}

                        />

                    </Grid>

                    <Grid

                        size={{

                            xs: 12,

                            lg: 6

                        }}

                    >

                        <GeneratorSchedulerChart

                            schedule={generatorSchedule}

                            loading={loading}

                        />

                    </Grid>

                </Grid>

                <RenewableContributionChart

                    contribution={renewableContribution}

                    loading={loading}

                />

                <OptimizationRecommendations

                    recommendations={recommendations}

                    loading={loading}

                />

            </Stack>

        </Container>

    );

}