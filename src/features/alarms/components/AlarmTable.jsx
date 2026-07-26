import {

    Chip,

    CircularProgress,

    IconButton,

    Paper,

    Stack,

    Tooltip,

    Typography

} from "@mui/material";

import {

    DataGrid

} from "@mui/x-data-grid";

import {

    CheckCircle,

    Visibility

} from "@mui/icons-material";

import useAlarm from "../hooks/useAlarm";

/*
|--------------------------------------------------------------------------
| Severity Color
|--------------------------------------------------------------------------
*/

function severityColor(severity) {

    switch (severity?.toLowerCase()) {

        case "critical":

            return "error";

        case "major":

            return "warning";

        case "minor":

            return "info";

        case "warning":

            return "secondary";

        default:

            return "default";

    }

}

/*
|--------------------------------------------------------------------------
| Status Color
|--------------------------------------------------------------------------
*/

function statusColor(status) {

    switch (status?.toLowerCase()) {

        case "active":

            return "error";

        case "acknowledged":

            return "warning";

        case "resolved":

            return "success";

        default:

            return "default";

    }

}

/*
|--------------------------------------------------------------------------
| Alarm Table
|--------------------------------------------------------------------------
*/

export default function AlarmTable() {

    const {

        alarms,

        total,

        loading,

        paginationModel,

        updatePagination,

        acknowledgeAlarm,

        viewAlarm

    } = useAlarm();

    const columns = [

        {

            field: "alarmId",

            headerName: "Alarm ID",

            width: 140

        },

        {

            field: "siteName",

            headerName: "Site",

            flex: 1,

            minWidth: 180

        },

        {

            field: "equipment",

            headerName: "Equipment",

            flex: 1,

            minWidth: 170

        },

        {

            field: "category",

            headerName: "Category",

            width: 150

        },

        {

            field: "severity",

            headerName: "Severity",

            width: 130,

            renderCell: (params) => (

                <Chip

                    size="small"

                    label={params.value}

                    color={severityColor(params.value)}

                />

            )

        },

        {

            field: "status",

            headerName: "Status",

            width: 150,

            renderCell: (params) => (

                <Chip

                    size="small"

                    label={params.value}

                    color={statusColor(params.value)}

                />

            )

        },

        {

            field: "message",

            headerName: "Alarm Description",

            flex: 2,

            minWidth: 320

        },

        {

            field: "createdAt",

            headerName: "Raised",

            width: 180

        },

        {

            field: "actions",

            headerName: "Actions",

            width: 120,

            sortable: false,

            renderCell: ({ row }) => (

                <Stack

                    direction="row"

                    spacing={1}

                >

                    <Tooltip title="View">

                        <IconButton

                            size="small"

                            onClick={() => viewAlarm(row)}

                        >

                            <Visibility />

                        </IconButton>

                    </Tooltip>

                    {

                        row.status === "Active" && (

                            <Tooltip title="Acknowledge">

                                <IconButton

                                    size="small"

                                    color="success"

                                    onClick={() =>

                                        acknowledgeAlarm(row.id)

                                    }

                                >

                                    <CheckCircle />

                                </IconButton>

                            </Tooltip>

                        )

                    }

                </Stack>

            )

        }

    ];

    if (loading) {

        return (

            <Paper

                sx={{

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    height: 500

                }}

            >

                <CircularProgress />

            </Paper>

        );

    }

    return (

        <Paper sx={{ height: 650 }}>

            <Stack

                px={2}

                pt={2}

            >

                <Typography

                    variant="h6"

                    fontWeight={700}

                >

                    Alarm History

                </Typography>

            </Stack>

            <DataGrid

                rows={alarms}

                columns={columns}

                rowCount={total}

                paginationMode="server"

                paginationModel={paginationModel}

                onPaginationModelChange={updatePagination}

                pageSizeOptions={[

                    10,

                    25,

                    50,

                    100

                ]}

                loading={loading}

                disableRowSelectionOnClick

                sx={{

                    border: 0

                }}

            />

        </Paper>

    );

}