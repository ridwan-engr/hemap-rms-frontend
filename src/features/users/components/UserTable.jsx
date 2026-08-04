import {

    Card,
    CardContent,
    Chip,
    IconButton,
    Tooltip

} from "@mui/material";

import {

    DataGrid

} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useUser from "../hooks/useUser";

/*
|--------------------------------------------------------------------------
| Status Chip
|--------------------------------------------------------------------------
*/

function StatusChip({ status }) {

    let color = "default";

    switch ((status || "").toLowerCase()) {

        case "active":

            color = "success";
            break;

        case "inactive":

            color = "warning";
            break;

        case "disabled":

            color = "error";
            break;

        default:

            color = "default";

    }

    return (

        <Chip

            size="small"

            label={status || "Unknown"}

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

        users,

        total,

        loading,

        paginationModel,

        updatePagination,

        reload

    } = useUser();

    const columns = [

        {

            field: "fullName",

            headerName: "Full Name",

            flex: 1.4,

            minWidth: 220

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

            minWidth: 140

        },

        {
            field: "assignedSites",

            headerName: "Assigned Sites",

            flex: 1.3,

            minWidth: 220,

            renderCell: ({ value }) => {

                if (!value?.length) {

                    return "-";

                }

                return value

                    .map(site => site.siteName)

                    .join(", ");

            }

        },

        {

            field: "phone",

            headerName: "Phone",

            flex: 1,

            minWidth: 150

        },

        {

            field: "status",

            headerName: "Status",

            width: 130,

            renderCell: params => (

                <StatusChip

                    status={params.value}

                />

            )

        },

        {

            field: "lastLogin",

            headerName: "Last Login",

            flex: 1.2,

            minWidth: 180

        },

        {

            field: "actions",

            headerName: "Actions",

            sortable: false,

            filterable: false,

            width: 150,

            renderCell: params => (

                <>

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

                </>

            )

        }

    ];

    return (

        <Card>

            <CardContent>

                <DataGrid

                    autoHeight

                    rows={users}

                    columns={columns}

                    loading={loading}

                    rowCount={total}

                    paginationMode="server"

                    paginationModel={paginationModel}

                    pageSizeOptions={[10, 25, 50, 100]}

                    disableRowSelectionOnClick

                    onPaginationModelChange={model => {

                        updatePagination(model);

                        reload({

                            page: model.page + 1,

                            limit: model.pageSize

                        });

                    }}

                />

            </CardContent>

        </Card>

    );

}