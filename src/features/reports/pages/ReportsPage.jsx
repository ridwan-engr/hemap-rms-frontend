import { useState } from "react";

import {

    Container,
    Stack,
    Snackbar,
    Alert

} from "@mui/material";

import ReportToolbar from "../components/ReportToolbar.jsx";
import ReportFilter from "../components/ReportFilter.jsx";
import ReportViewer from "../components/ReportViewer.jsx";
import ExportDialog from "../components/ExportDialog.jsx";

import useReports from "../hooks/useReports.js";

/*
|--------------------------------------------------------------------------
| Reports Page
|--------------------------------------------------------------------------
*/

export default function ReportsPage() {

    const {

        report,

        resetReport,

        loadReportResponse,

        lastGenerated

    } = useReports();

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [

        exportOpen,

        setExportOpen

    ] = useState(false);

    const [

        snackbar,

        setSnackbar

    ] = useState({

        open: false,

        severity: "success",

        message: ""

    });

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const handleRefresh = async () => {

        if (

            report?._id

        ) {

            await loadReportResponse(

                report._id

            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Export
    |--------------------------------------------------------------------------
    */

    const handleExport = () => {

        setExportOpen(

            true

        );

    };

    /*
    |--------------------------------------------------------------------------
    | Clear
    |--------------------------------------------------------------------------
    */

    const handleClear = () => {

        resetReport();

        setSnackbar({

            open: true,

            severity: "info",

            message: "Report cleared."

        });

    };

    /*
    |--------------------------------------------------------------------------
    | Close Export
    |--------------------------------------------------------------------------
    */

    const handleCloseExport = () => {

        setExportOpen(

            false

        );

    };

    /*
    |--------------------------------------------------------------------------
    | Snackbar
    |--------------------------------------------------------------------------
    */

    const closeSnackbar = () => {

        setSnackbar(previous => ({

            ...previous,

            open: false

        }));

    };

    return (

        <Container

            maxWidth="xl"

            sx={{

                py: 3

            }}

        >

            <Stack

                spacing={3}

            >

                <ReportToolbar

                    onRefresh={handleRefresh}

                    onExport={handleExport}

                    onClear={handleClear}

                />

                <ReportFilter />

                <ReportViewer />

            </Stack>

            <ExportDialog

                open={exportOpen}

                onClose={handleCloseExport}

            />

            <Snackbar

                open={snackbar.open}

                autoHideDuration={4000}

                onClose={closeSnackbar}

                anchorOrigin={{

                    vertical: "bottom",

                    horizontal: "right"

                }}

            >

                <Alert

                    severity={snackbar.severity}

                    onClose={closeSnackbar}

                    variant="filled"

                >

                    {snackbar.message}

                </Alert>

            </Snackbar>

        </Container>

    );

}