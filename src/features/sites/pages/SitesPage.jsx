import { useEffect } from "react";

import {

    Grid,
    Stack,
    Typography

} from "@mui/material";

import useSite from "../hooks/useSite";

import SiteToolbar from "../components/SiteToolbar";
import SiteFilter from "../components/SiteFilter";
import SiteSummaryCards from "../components/SiteSummaryCards";
import SiteStatistics from "../components/SiteStatistics";
import SiteHealthChart from "../components/SiteHealthChart";
import SiteMap from "../components/SiteMap";
import SiteTable from "../components/SiteTable";
import SiteDetails from "../components/SiteDetails";

/*
|--------------------------------------------------------------------------
| Sites Page
|--------------------------------------------------------------------------
*/

export default function SitesPage() {

    const {

        reload,

        loadSummary,

        loadStatistics,

        loadHealth,

        loadLocations

    } = useSite();

    /*
    |--------------------------------------------------------------------------
    | Initial Page Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        reload();

        loadSummary();

        loadStatistics();

        loadHealth();

        loadLocations();

    }, [

        reload,

        loadSummary,

        loadStatistics,

        loadHealth,

        loadLocations

    ]);

    return (

        <Stack spacing={3}>

            <Typography

                variant="h4"

                fontWeight={700}

            >

                Sites

            </Typography>

            <SiteToolbar />

            <SiteFilter />

            <SiteSummaryCards />

            <Grid

                container

                spacing={3}

            >

                <Grid size={{ xs: 12, lg: 8 }}>

                    <SiteTable />

                </Grid>

                <Grid size={{ xs: 12, lg: 4 }}>

                    <SiteDetails />

                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>

                    <SiteStatistics />

                </Grid>

                <Grid size={{ xs: 12, lg: 6 }}>

                    <SiteHealthChart />

                </Grid>

                <Grid size={{ xs: 12 }}>

                    <SiteMap />

                </Grid>

            </Grid>

        </Stack>

    );

}