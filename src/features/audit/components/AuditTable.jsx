import {

    Chip,
    IconButton,
    Stack,
    Tooltip

} from "@mui/material";

import {

    DataGrid

} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";

import useAudit from "../hooks/useAudit";

/*
|--------------------------------------------------------------------------
| Audit Table
|--------------------------------------------------------------------------
*/

export default function AuditTable({

    onView,

    onDelete

}) {

    const {

        logs,

        total,

        loading,

        paginationModel,

        updatePagination

    } = useAudit();

    const columns = [

        {

            field: "createdAt",

            headerName: "Date",

            width: 180,

            renderCell: ({ value }) =>

                value

                    ? new Date(value).toLocaleString()

                    : "-"

        },

        {

            field: "user",

            headerName: "User",

            minWidth: 220,

            flex: 1,

            renderCell: ({ value }) => {

                if (!value) {

                    return "-";

                }

                return `${

                    value.firstName || ""

                } ${

                    value.lastName || ""

                }`;

            }

        },

        {

            field: "site",

            headerName: "Site",

            minWidth: 180,

            flex: 1,

            renderCell: ({ value }) =>

                value?.name || "-"

        },

        {

            field: "module",

            headerName: "Module",

            minWidth: 150,

            flex: 1,

            renderCell: ({ value }) => (

                <Chip

                    label={value}

                    color="primary"

                    variant="outlined"

                    size="small"

                />

            )

        },

        {

            field: "action",

            headerName: "Action",

            minWidth: 150,

            flex: 1,

            renderCell: ({ value }) => (

                <Chip

                    label={value}

                    color="secondary"

                    size="small"

                />

            )

        },

        {

            field: "description",

            headerName: "Description",

            minWidth: 320,

            flex: 2

        },

        {

            field: "ipAddress",

            headerName: "IP Address",

            width: 150

        },

        {

            field: "actions",

            headerName: "Actions",

            sortable: false,

            filterable: false,

            width: 120,

            renderCell: ({ row }) => (

                <Stack

                    direction="row"

                    spacing={1}

                >

                    <Tooltip title="View">

                        <IconButton

                            color="primary"

                            onClick={() => onView(row)}

                        >

                            <VisibilityIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Delete">

                        <IconButton

                            color="error"

                            onClick={() => onDelete(row)}

                        >

                            <DeleteIcon />

                        </IconButton>

                    </Tooltip>

                </Stack>

            )

        }

    ];

    return (

        <DataGrid

            autoHeight

            rows={logs}

            columns={columns}

            getRowId={row => row._id}

            loading={loading}

            pagination

            paginationMode="server"

            rowCount={total}

            paginationModel={paginationModel}

            onPaginationModelChange={updatePagination}

            pageSizeOptions={[

                20,

                50,

                100

            ]}

            disableRowSelectionOnClick

        />

    );

}