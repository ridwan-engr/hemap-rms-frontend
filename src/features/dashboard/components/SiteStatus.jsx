import { useMemo } from "react";

import {

    Box,

    Chip,

    CircularProgress,

    Paper,

    Typography

} from "@mui/material";

import {

    DataGrid

} from "@mui/x-data-grid";

import useDashboard from "../hooks/useDashboard";

/*
|--------------------------------------------------------------------------
| Status Chip
|--------------------------------------------------------------------------
*/

function StatusChip({ status }) {

    const value = (status || "UNKNOWN").toUpperCase();

    let color = "default";

    switch (value) {

        case "ONLINE":
            color = "success";
            break;

        case "OFFLINE":
            color = "error";
            break;

        case "WARNING":
            color = "warning";
            break;

        default:
            color = "default";

    }

    return (

        <Chip

            label={value}

            color={color}

            size="small"

        />

    );

}

/*
|--------------------------------------------------------------------------
| Site Status
|--------------------------------------------------------------------------
*/

export default function SiteStatus() {

    const {

        sites,

        loading

    } = useDashboard();

    const rows = sites ?? [];

    const columns = useMemo(() => [

        {

            field: "siteName",

            headerName: "Site",

            flex: 1.5

        },

        {

            field: "status",

            headerName: "Status",

            width: 120,

            renderCell: (params) => (

                <StatusChip

                    status={params.value}

                />

            )

        },

        {

            field: "batterySOC",

            headerName: "Battery",

            width: 120,

            valueFormatter: ({ value }) =>

                value != null

                    ? `${value}%`

                    : "--"

        },

        {

            field: "solarPower",

            headerName: "Solar",

            width: 120,

            valueFormatter: ({ value }) =>

                value != null

                    ? `${value} kW`

                    : "--"

        },

        {

            field: "generatorPower",

            headerName: "Generator",

            width: 130,

            valueFormatter: ({ value }) =>

                value != null

                    ? `${value} kW`

                    : "--"

        },

        {

            field: "gridPower",

            headerName: "Grid",

            width: 120,

            valueFormatter: ({ value }) =>

                value != null

                    ? `${value} kW`

                    : "--"

        },

        {

            field: "loadPower",

            headerName: "Load",

            width: 120,

            valueFormatter: ({ value }) =>

                value != null

                    ? `${value} kW`

                    : "--"

        },

        {

            field: "lastCommunication",

            headerName: "Last Communication",

            flex: 1.5,

            valueFormatter: ({ value }) =>

                value

                    ? new Date(value).toLocaleString()

                    : "--"

        }

    ], []);

    return (

        <Paper

            sx={{

                p: 3,

                mt: 3,

                borderRadius: 3

            }}

        >

            <Typography

                variant="h6"

                fontWeight={700}

                mb={2}

            >

                Site Status

            </Typography>

            {

                loading

                    ? (

                        <Box

                            display="flex"

                            justifyContent="center"

                            alignItems="center"

                            py={8}

                        >

                            <CircularProgress />

                        </Box>

                    )

                    : (

                        <DataGrid

                            rows={rows}

                            columns={columns}

                            getRowId={(row) =>

                                row._id ??

                                row.siteId ??

                                row.installationId ??

                                row.id

                            }

                            autoHeight

                            pageSizeOptions={[10, 20, 50]}

                            initialState={{

                                pagination: {

                                    paginationModel: {

                                        pageSize: 10

                                    }

                                }

                            }}

                            disableRowSelectionOnClick

                        />

                    )

            }

        </Paper>

    );

}