import { useEffect, useState } from "react";

import {

    Box,
    Stack

} from "@mui/material";

import useAudit from "../hooks/useAudit";

import AuditToolbar from "../components/AuditToolbar";
import AuditSummaryCards from "../components/AuditSummaryCards";
import AuditStatistics from "../components/AuditStatistics";
import AuditFilter from "../components/AuditFilter";
import AuditTable from "../components/AuditTable";
import AuditDetails from "../components/AuditDetails";

/*
|--------------------------------------------------------------------------
| Audit Page
|--------------------------------------------------------------------------
*/

export default function AuditPage() {

    const {

        reload,

        loadSummary,

        loadStatistics,

        deleteAuditLog

    } = useAudit();

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [

        detailsOpen,

        setDetailsOpen

    ] = useState(false);

    const [

        selectedAudit,

        setSelectedAudit

    ] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        reload();

        loadSummary();

        loadStatistics();

    }, [

        reload,

        loadSummary,

        loadStatistics

    ]);

    /*
    |--------------------------------------------------------------------------
    | View
    |--------------------------------------------------------------------------
    */

    const handleView = audit => {

        setSelectedAudit(audit);

        setDetailsOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = async audit => {

        const confirmed = window.confirm(

            `Delete this audit log?\n\n${audit.description || audit.action}`

        );

        if (!confirmed) {

            return;

        }

        await deleteAuditLog(audit._id);

        reload();

        loadSummary();

        loadStatistics();

    };

    /*
    |--------------------------------------------------------------------------
    | Close Details
    |--------------------------------------------------------------------------
    */

    const handleCloseDetails = () => {

        setSelectedAudit(null);

        setDetailsOpen(false);

    };

    /*
    |--------------------------------------------------------------------------
    | Export
    |--------------------------------------------------------------------------
    */

    const handleExport = () => {

        console.info(

            "Audit export not implemented."

        );

    };

    return (

        <Box>

            <Stack spacing={3}>

                <AuditToolbar

                    onExport={handleExport}

                />

                <AuditSummaryCards />

                <AuditFilter />

                <AuditStatistics />

                <AuditTable

                    onView={handleView}

                    onDelete={handleDelete}

                />

            </Stack>

            <AuditDetails

                open={detailsOpen}

                onClose={handleCloseDetails}

                audit={selectedAudit}

            />

        </Box>

    );

}