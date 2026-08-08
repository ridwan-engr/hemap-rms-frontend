import { Stack, Typography } from "@mui/material";

import SiteToolbar from "../components/SiteToolbar.jsx";
import SiteFilter from "../components/SiteFilter.jsx";
import SiteSummaryCards from "../components/SiteSummaryCards.jsx";
import SiteStatistics from "../components/SiteStatistics.jsx";
import SiteHealthChart from "../components/SiteHealthChart.jsx";
import SiteMap from "../components/SiteMap.jsx";
import SiteTable from "../components/SiteTable.jsx";
import SiteDetails from "../components/SiteDetails.jsx";

/*
|--------------------------------------------------------------------------
| Sites Page
|--------------------------------------------------------------------------
*/

export default function SitesPage() {

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

            <SiteTable />

            <SiteDetails />

            <SiteStatistics />

            <SiteHealthChart />

            <SiteMap />

        </Stack>

    );

}