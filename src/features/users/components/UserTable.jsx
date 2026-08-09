import {
    Card,
    CardContent,
    Chip,
    IconButton,
    Tooltip,
    Stack
} from "@mui/material";

import {
    DataGrid
} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useUser from "../hooks/useUser.js";

/*
|--------------------------------------------------------------------------
| Status Chip
|--------------------------------------------------------------------------
*/

function StatusChip({
    status,
    isActive
}) {

    const normalizedStatus =
        String(status || "").toLowerCase();

    let color = "default";
    let label = status || "Unknown";

    if (
        isActive === true ||
        normalizedStatus === "active"
    ) {

        color = "success";
        label = "Active";

    } else if (
        isActive === false ||
        normalizedStatus === "inactive"
    ) {

        color = "warning";
        label = "Inactive";

    } else if (
        normalizedStatus === "disabled"
    ) {

        color = "error";
        label = "Disabled";

    }

    return (

        <Chip
            size="small"
            label={label}
            color={color}
        />

    );

}

/*
|--------------------------------------------------------------------------
| User Table
|--------------------------------------------------------------------------
*/

export default function UserTable({
    onView,
    onEdit,
    onDelete
}) {

    const {
        users = [],
        total = 0,
        loading,
        paginationModel,
        updatePagination,
        reload
    } = useUser();

    /*
    |--------------------------------------------------------------------------
    | Columns
    |--------------------------------------------------------------------------
    */

    const columns = [

        {
            field: "fullName",
            headerName: "Full Name",
            flex: 1.4,
            minWidth: 220,

            valueGetter: (
                _value,
                row
            ) => {

                return [
                    row?.firstName,
                    row?.lastName
                ]
                    .filter(Boolean)
                    .join(" ") || "-";

            }

        },

        {
            field: "email",
            headerName: "Email",
            flex: 1.5,
            minWidth: 240
        },

        {
            field: "role",
            headerName: "Role",
            flex: 1,
            minWidth: 140,

            valueGetter: (
                _value,
                row
            ) => {

                if (
                    typeof row?.role === "string"
                ) {

                    return row.role;

                }

                return (
                    row?.role?.name ||
                    "-"
                );

            }

        },

        {
            field: "assignedSites",
            headerName: "Assigned Sites",
            flex: 1.3,
            minWidth: 220,

            renderCell: ({
                value
            }) => {

                if (
                    !Array.isArray(value) ||
                    value.length === 0
                ) {

                    return "-";

                }

                return value
                    .map(site => {

                        if (
                            typeof site === "string"
                        ) {

                            return site;

                        }

                        return (
                            site?.siteName ||
                            site?.name ||
                            site?._id ||
                            site?.id ||
                            "-"
                        );

                    })
                    .filter(Boolean)
                    .join(", ");

            }

        },

        {
            field: "phone",
            headerName: "Phone",
            flex: 1,
            minWidth: 150,

            renderCell: ({
                value
            }) => value || "-"

        },

        {
            field: "status",
            headerName: "Status",
            width: 130,

            renderCell: params => (

                <StatusChip
                    status={params.value}
                    isActive={
                        params.row?.isActive
                    }
                />

            )

        },

        {
            field: "lastLogin",
            headerName: "Last Login",
            flex: 1.2,
            minWidth: 180,

            renderCell: ({
                value
            }) => {

                if (!value) {

                    return "-";

                }

                const date =
                    new Date(value);

                if (
                    Number.isNaN(
                        date.getTime()
                    )
                ) {

                    return "-";

                }

                return date.toLocaleString();

            }

        },

        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            width: 150,

            renderCell: params => (

                <Stack
                    direction="row"
                    spacing={0.5}
                >

                    <Tooltip title="View">

                        <IconButton
                            size="small"
                            onClick={() =>
                                onView?.(
                                    params.row
                                )
                            }
                        >

                            <VisibilityIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Edit">

                        <IconButton
                            size="small"
                            onClick={() =>
                                onEdit?.(
                                    params.row
                                )
                            }
                        >

                            <EditIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Delete">

                        <IconButton
                            size="small"
                            color="error"
                            onClick={() =>
                                onDelete?.(
                                    params.row
                                )
                            }
                        >

                            <DeleteIcon />

                        </IconButton>

                    </Tooltip>

                </Stack>

            )

        }

    ];

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const handlePaginationChange = model => {

        updatePagination(model);

        reload({
            page: model.page + 1,
            limit: model.pageSize
        });

    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <Card>

            <CardContent>

                <DataGrid

                    autoHeight

                    rows={users}

                    columns={columns}

                    getRowId={row =>
                        row?.id ||
                        row?._id
                    }

                    rowCount={total}

                    paginationMode="server"

                    paginationModel={
                        paginationModel
                    }

                    pageSizeOptions={[
                        10,
                        25,
                        50,
                        100
                    ]}

                    loading={loading}

                    disableRowSelectionOnClick

                    onPaginationModelChange={
                        handlePaginationChange
                    }

                    sx={{
                        border: 0
                    }}

                />

            </CardContent>

        </Card>

    );

}