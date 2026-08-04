import {

    Alert,
    Box,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Typography

} from "@mui/material";

import useReports from "../hooks/useReports.js";

import ReportSummaryCards from "./ReportSummaryCards.jsx";
import ReportCharts from "./ReportCharts.jsx";
import ReportTable from "./ReportTable.jsx";

/*
|--------------------------------------------------------------------------
| Report Viewer
|--------------------------------------------------------------------------
*/

export default function ReportViewer() {

    const {

        report,

        loading,

        error,

        lastGenerated

    } = useReports();

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <Paper sx={{ p: 5 }}>

                <Stack

                    spacing={2}

                    alignItems="center"

                >

                    <CircularProgress />

                    <Typography>

                        Generating report...

                    </Typography>

                </Stack>

            </Paper>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (

            <Alert severity="error">

                {

                    typeof error === "string"

                        ? error

                        : "Unable to generate report."

                }

            </Alert>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (!report) {

        return (

            <Alert severity="info">

                Select a report type and click

                <strong>

                    {" "}Generate Report

                </strong>

                {" "}to view results.

            </Alert>

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Viewer
    |--------------------------------------------------------------------------
    */

    return (

        <Stack

            spacing={3}

        >

            <Paper

                sx={{

                    p: 3

                }}

            >

                <Typography

                    variant="h5"

                    fontWeight={700}

                >

                    Report Viewer

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Report Type:

                    {" "}

                    <strong>

                        {report.reportType}

                    </strong>

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Status:

                    {" "}

                    <strong>

                        {report.status}

                    </strong>

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Site:

                    {" "}

                    <strong>

                        {

                            report.site?.name ||

                            report.site

                        }

                    </strong>

                </Typography>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Period:

                    {" "}

                    <strong>

                        {

                            new Date(

                                report.periodStart

                            ).toLocaleDateString()

                        }

                        {" - "}

                        {

                            new Date(

                                report.periodEnd

                            ).toLocaleDateString()

                        }

                    </strong>

                </Typography>

                {

                    lastGenerated && (

                        <Typography

                            variant="caption"

                            color="text.secondary"

                        >

                            Generated:

                            {" "}

                            {

                                new Date(

                                    lastGenerated

                                ).toLocaleString()

                            }

                        </Typography>

                    )

                }

            </Paper>

            <Divider />

            <ReportSummaryCards />

            <ReportCharts />

            <Box>

                <ReportTable />

            </Box>

        </Stack>

    );

}