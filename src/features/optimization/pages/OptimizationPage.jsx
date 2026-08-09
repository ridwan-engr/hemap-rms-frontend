import {
    Alert,
    Container,
    Stack
} from "@mui/material";

import {
    useParams
} from "react-router-dom";

import useOptimization from "../hooks/useOptimization.js";

import DispatchSummary from "../components/DispatchSummary";
import EconomicDispatchChart from "../components/EconomicDispatchChart";
import BatteryScheduleChart from "../components/BatteryScheduleChart";
import GeneratorScheduleChart from "../components/GeneratorScheduleChart";
import RenewableContributionChart from "../components/RenewableContributionChart";
import CostSavingsCard from "../components/CostSavingsCard";
import OptimizationRecommendations from "../components/OptimizationRecommendations";

/*
|--------------------------------------------------------------------------
| Optimization Page
|--------------------------------------------------------------------------
|
| Main optimization dashboard.
|
| Components:
| - Dispatch summary
| - Economic dispatch
| - Battery schedule
| - Generator schedule
| - Renewable contribution
| - Cost savings
| - Optimization recommendations
|
*/

export default function OptimizationPage() {

    /*
    |--------------------------------------------------------------------------
    | Route Parameters
    |--------------------------------------------------------------------------
    */

    const {
        siteId
    } = useParams();

    /*
    |--------------------------------------------------------------------------
    | Optimization Hook
    |--------------------------------------------------------------------------
    |
    | Used here only to validate that the optimization context is available.
    |
    */

    const {
        error
    } = useOptimization({
        siteId
    });

    /*
    |--------------------------------------------------------------------------
    | Error State
    |--------------------------------------------------------------------------
    */

    if (error) {

        const message =
            typeof error === "string"
                ? error
                : error?.message ||
                  error?.error ||
                  "Unable to load optimization data.";

        return (
            <Container
                maxWidth="xl"
                sx={{
                    py: 3
                }}
            >

                <Alert severity="error">
                    {message}
                </Alert>

            </Container>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Container
            maxWidth="xl"
            sx={{
                py: 3
            }}
        >

            <Stack spacing={3}>

                {/* ---------------------------------------------------------
                    Dispatch Summary
                --------------------------------------------------------- */}

                <DispatchSummary
                    siteId={siteId}
                />

                {/* ---------------------------------------------------------
                    Economic Dispatch + Cost Savings
                --------------------------------------------------------- */}

                <Stack
                    direction={{
                        xs: "column",
                        lg: "row"
                    }}
                    spacing={3}
                    sx={{
                        alignItems: "stretch"
                    }}
                >

                    <Stack
                        sx={{
                            flex: 2,
                            minWidth: 0
                        }}
                    >

                        <EconomicDispatchChart
                            siteId={siteId}
                            height={400}
                        />

                    </Stack>

                    <Stack
                        sx={{
                            flex: 1,
                            minWidth: 0
                        }}
                    >

                        <CostSavingsCard
                            siteId={siteId}
                        />

                    </Stack>

                </Stack>

                {/* ---------------------------------------------------------
                    Battery + Generator Schedules
                --------------------------------------------------------- */}

                <Stack
                    direction={{
                        xs: "column",
                        lg: "row"
                    }}
                    spacing={3}
                    sx={{
                        alignItems: "stretch"
                    }}
                >

                    <Stack
                        sx={{
                            flex: 1,
                            minWidth: 0
                        }}
                    >

                        <BatteryScheduleChart
                            siteId={siteId}
                            height={400}
                        />

                    </Stack>

                    <Stack
                        sx={{
                            flex: 1,
                            minWidth: 0
                        }}
                    >

                        <GeneratorScheduleChart
                            siteId={siteId}
                            height={400}
                        />

                    </Stack>

                </Stack>

                {/* ---------------------------------------------------------
                    Renewable Contribution
                --------------------------------------------------------- */}

                <RenewableContributionChart
                    siteId={siteId}
                    height={420}
                />

                {/* ---------------------------------------------------------
                    Recommendations
                --------------------------------------------------------- */}

                <OptimizationRecommendations
                    siteId={siteId}
                />

            </Stack>

        </Container>
    );
}