import { useMemo } from "react";

import {
    Card,
    CardContent,
    Chip,
    Typography
} from "@mui/material";

import {
    DataGrid
} from "@mui/x-data-grid";

import useSite from "../hooks/useSites.js";

/*
|--------------------------------------------------------------------------
| Status Chip
|--------------------------------------------------------------------------
*/

function StatusChip({ status }) {

    let color = "default";

    switch (status?.toUpperCase()) {

        case "ONLINE":
        case "HEALTHY":
            color = "success";
            break;

        case "WARNING":
            color = "warning";
            break;

        case "CRITICAL":
        case "OFFLINE":
            color = "error";
            break;

        default:
            color = "default";
    }

    return (
        <Chip
            label={status ?? "UNKNOWN"}
            color={color}
            size="small"
        />
    );
}

/*
|--------------------------------------------------------------------------
| Site Table
|--------------------------------------------------------------------------
*/

export default function SiteTable() {

    const {
        sites = [],
        total = 0,
        loading = false,
        paginationModel,
        updatePagination,
        viewSite
    } = useSite();

    const columns = useMemo(
        () => [

            {
                field: "siteCode",
                headerName: "Site Code",
                flex: 1,
                minWidth: 130
            },

            {
                field: "name",
                headerName: "Site Name",
                flex: 1.5,
                minWidth: 220
            },

            {
                field: "state",
                headerName: "State",
                flex: 1,
                minWidth: 120,
                valueGetter: (_, row) =>
                    row.location?.state ?? ""
            },

            {
                field: "systemType",
                headerName: "System Type",
                flex: 1,
                minWidth: 130
            },

            {
                field: "installedCapacity",
                headerName: "Capacity",
                flex: 1,
                minWidth: 130,
                valueFormatter: value =>
                    value == null
                        ? ""
                        : `${value} kW`
            },

            {
                field: "status",
                headerName: "Status",
                minWidth: 130,
                renderCell: params => (
                    <StatusChip
                        status={params.value}
                    />
                )
            }

        ],
        []
    );

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                >
                    Sites
                </Typography>

                <DataGrid

                    autoHeight

                    rows={sites}

                    columns={columns}

                    loading={loading}

                    rowCount={total}

                    /*
                    |--------------------------------------------------------------------------
                    | IMPORTANT
                    |--------------------------------------------------------------------------
                    | Backend uses MongoDB _id.
                    |--------------------------------------------------------------------------
                    */

                    getRowId={row => row._id}

                    pageSizeOptions={[
                        10,
                        25,
                        50,
                        100
                    ]}

                    pagination

                    paginationMode="server"

                    paginationModel={paginationModel}

                    onPaginationModelChange={
                        updatePagination
                    }

                    disableRowSelectionOnClick

                    onRowClick={params => {

                        viewSite(
                            params.row._id
                        );

                    }}

                />

            </CardContent>

        </Card>

    );
}