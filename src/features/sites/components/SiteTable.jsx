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

import useSite from "../hooks/useSite";

/*
|--------------------------------------------------------------------------
| Status Chip
|--------------------------------------------------------------------------
*/

function StatusChip({ status }) {

    let color = "default";

    switch (status?.toLowerCase()) {

        case "healthy":
        case "online":
            color = "success";
            break;

        case "warning":
            color = "warning";
            break;

        case "critical":
        case "offline":
            color = "error";
            break;

        default:
            color = "default";
    }

    return (

        <Chip

            label={status}

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

        sites,

        total,

        loading,

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

                field: "siteName",

                headerName: "Site Name",

                flex: 1.5,

                minWidth: 220

            },

            {

                field: "state",

                headerName: "State",

                flex: 1,

                minWidth: 120

            },

            {

                field: "technology",

                headerName: "Technology",

                flex: 1,

                minWidth: 130

            },

            {

                field: "powerSource",

                headerName: "Power Source",

                flex: 1,

                minWidth: 150

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

                    onRowClick={

                        params =>

                            viewSite(

                                params.row.id

                            )

                    }

                    getRowId={

                        row => row.id

                    }

                />

            </CardContent>

        </Card>

    );

}