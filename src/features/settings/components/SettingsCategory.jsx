import {

    Card,
    CardContent,
    Typography,
    IconButton,
    Chip,
    Stack

} from "@mui/material";

import {

    DataGrid

} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import useSettings from "../hooks/useSettings";

/*
|--------------------------------------------------------------------------
| Settings Category
|--------------------------------------------------------------------------
*/

export default function SettingsCategory({

    onEdit,

    onDelete

}) {

    const {

        filteredSettings,

        loading

    } = useSettings();

    /*
    |--------------------------------------------------------------------------
    | Columns
    |--------------------------------------------------------------------------
    */

    const columns = [

        {

            field: "key",

            headerName: "Key",

            flex: 1.2,

            minWidth: 220

        },

        {

            field: "value",

            headerName: "Value",

            flex: 1.5,

            minWidth: 260,

            renderCell: ({ value }) => {

                if (

                    typeof value === "boolean"

                ) {

                    return value ? "True" : "False";

                }

                if (

                    typeof value === "object" &&

                    value !== null

                ) {

                    return JSON.stringify(value);

                }

                return String(value);

            }

        },

        {

            field: "description",

            headerName: "Description",

            flex: 2,

            minWidth: 300,

            renderCell: ({ value }) =>

                value || "-"

        },

        {

            field: "category",

            headerName: "Category",

            width: 160,

            renderCell: ({ value }) => (

                <Chip

                    label={value}

                    color="primary"

                    size="small"

                    variant="outlined"

                />

            )

        },

        {

            field: "editable",

            headerName: "Editable",

            width: 130,

            renderCell: ({ value }) => (

                <Chip

                    label={

                        value

                            ? "Yes"

                            : "No"

                    }

                    color={

                        value

                            ? "success"

                            : "default"

                    }

                    size="small"

                />

            )

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

                    <IconButton

                        color="primary"

                        disabled={!row.editable}

                        onClick={() =>

                            onEdit(row)

                        }

                    >

                        <EditIcon />

                    </IconButton>

                    <IconButton

                        color="error"

                        disabled={!row.editable}

                        onClick={() =>

                            onDelete(row)

                        }

                    >

                        <DeleteIcon />

                    </IconButton>

                </Stack>

            )

        }

    ];

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    gutterBottom

                >

                    Settings

                </Typography>

                <DataGrid

                    autoHeight

                    rows={filteredSettings}

                    columns={columns}

                    loading={loading}

                    getRowId={(row) => row._id}

                    disableRowSelectionOnClick

                    pageSizeOptions={[

                        10,

                        25,

                        50,

                        100

                    ]}

                    initialState={{

                        pagination: {

                            paginationModel: {

                                page: 0,

                                pageSize: 25

                            }

                        }

                    }}

                />

            </CardContent>

        </Card>

    );

}