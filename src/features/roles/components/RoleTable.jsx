import {

    Chip,
    IconButton,
    Stack

} from "@mui/material";

import {

    DataGrid

} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useRole from "../hooks/useRole";

/*
|--------------------------------------------------------------------------
| Role Table
|--------------------------------------------------------------------------
*/

export default function RoleTable({

    onView,
    onEdit,
    onDelete

}) {

    const {

        roles,
        total,

        loading,

        paginationModel,
        updatePagination

    } = useRole();

    const columns = [

        {

            field: "name",

            headerName: "Role",

            flex: 1,

            minWidth: 180

        },

        {

            field: "description",

            headerName: "Description",

            flex: 2,

            minWidth: 280,

            renderCell: ({ value }) => value || "-"

        },

        {

            field: "permissions",

            headerName: "Permissions",

            flex: 1,

            minWidth: 180,

            sortable: false,

            renderCell: ({ value }) => (

                <Chip

                    label={`${value?.length || 0} Permission(s)`}

                    color="primary"

                    variant="outlined"

                />

            )

        },

        {

            field: "createdAt",

            headerName: "Created",

            flex: 1,

            minWidth: 180,

            renderCell: ({ value }) =>

                value

                    ? new Date(value).toLocaleDateString()

                    : "-"

        },

        {

            field: "actions",

            headerName: "Actions",

            sortable: false,

            filterable: false,

            width: 150,

            renderCell: ({ row }) => (

                <Stack

                    direction="row"

                    spacing={1}

                >

                    <IconButton

                        color="primary"

                        onClick={() => onView(row)}

                    >

                        <VisibilityIcon />

                    </IconButton>

                    <IconButton

                        color="warning"

                        onClick={() => onEdit(row)}

                    >

                        <EditIcon />

                    </IconButton>

                    <IconButton

                        color="error"

                        onClick={() => onDelete(row)}

                    >

                        <DeleteIcon />

                    </IconButton>

                </Stack>

            )

        }

    ];

    return (

        <DataGrid

            autoHeight

            rows={roles}

            columns={columns}

            loading={loading}

            rowCount={total}

            getRowId={row => row._id}

            pagination

            paginationMode="server"

            paginationModel={paginationModel}

            onPaginationModelChange={updatePagination}

            pageSizeOptions={[

                10,
                25,
                50,
                100

            ]}

            disableRowSelectionOnClick

        />

    );

}