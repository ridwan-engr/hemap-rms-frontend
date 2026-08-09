import {
    Chip,
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

    switch (
        String(severity || "").toLowerCase()
    ) {

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

    switch (
        String(status || "").toLowerCase()
    ) {

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
        loadingHistory,
        paginationModel,
        updatePagination,
        acknowledgeAlarm,
        viewAlarm
    } = useAlarm();

    /*
    |--------------------------------------------------------------------------
    | Columns
    |--------------------------------------------------------------------------
    */

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
                    label={
                        params.value ||
                        "Unknown"
                    }
                    color={
                        severityColor(
                            params.value
                        )
                    }
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
                    label={
                        params.value ||
                        "Unknown"
                    }
                    color={
                        statusColor(
                            params.value
                        )
                    }
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
            width: 130,
            sortable: false,
            filterable: false,

            renderCell: ({ row }) => {

                const alarmId =
                    row._id ||
                    row.id ||
                    row.alarmId;

                const status =
                    String(
                        row.status || ""
                    ).toLowerCase();

                return (

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            alignItems: "center"
                        }}
                    >

                        <Tooltip title="View">

                            <IconButton
                                size="small"
                                onClick={() =>
                                    viewAlarm(
                                        alarmId
                                    )
                                }
                            >

                                <Visibility />

                            </IconButton>

                        </Tooltip>

                        {status === "active" && (

                            <Tooltip title="Acknowledge">

                                <IconButton
                                    size="small"
                                    color="success"
                                    onClick={() =>
                                        acknowledgeAlarm(
                                            alarmId
                                        )
                                    }
                                >

                                    <CheckCircle />

                                </IconButton>

                            </Tooltip>

                        )}

                    </Stack>

                );

            }

        }

    ];

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <Paper
            sx={{
                height: 650
            }}
        >

            <Stack
                sx={{
                    px: 2,
                    pt: 2
                }}
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

                getRowId={(row) =>
                    row._id ||
                    row.id ||
                    row.alarmId
                }

                rowCount={total}

                paginationMode="server"

                paginationModel={
                    paginationModel
                }

                onPaginationModelChange={
                    updatePagination
                }

                pageSizeOptions={[
                    10,
                    25,
                    50,
                    100
                ]}

                loading={loadingHistory}

                disableRowSelectionOnClick

                sx={{
                    border: 0
                }}

            />

        </Paper>

    );

}