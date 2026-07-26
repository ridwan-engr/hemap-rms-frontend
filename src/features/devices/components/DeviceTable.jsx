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

import useDevice from "../hooks/useDevice";

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

            label={status || "Unknown"}

            color={color}

            size="small"

        />

    );

}

/*
|--------------------------------------------------------------------------
| Device Table
|--------------------------------------------------------------------------
*/

export default function DeviceTable({
    onEdit
}) {

    const {

        devices,

        total,

        loading,

        paginationModel,

        updatePagination,

        reload,

        viewDevice

    } = useDevice();

    const columns = [

        {

            field: "deviceId",

            headerName: "Device ID",

            flex: 1,

            minWidth: 140

        },

        {

            field: "name",

            headerName: "Device Name",

            flex: 1.4,

            minWidth: 180

        },

        {

            field: "type",

            headerName: "Type",

            flex: 1,

            minWidth: 140

        },

        {

            field: "manufacturer",

            headerName: "Manufacturer",

            flex: 1,

            minWidth: 140

        },

        {

            field: "siteName",

            headerName: "Site",

            flex: 1.3,

            minWidth: 180

        },

        {

            field: "firmwareVersion",

            headerName: "Firmware",

            flex: 0.9,

            minWidth: 120

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

        },

        {

            field: "lastSeen",

            headerName: "Last Seen",

            flex: 1.2,

            minWidth: 180

        },

        {

            field: "actions",

            headerName: "Actions",

            sortable: false,

            filterable: false,

            width: 90,

            renderCell: params => (

                <Tooltip title="View Device">

                    <IconButton

                        onClick={() =>

                            viewDevice(

                                params.row.id

                            )

                        }

                    >

                        <VisibilityIcon />

                    </IconButton>

                </Tooltip>

            )

        }

    ];

    return (

        <Card>

            <CardContent>

                <DataGrid

                    autoHeight

                    rows={devices}

                    columns={columns}

                    loading={loading}

                    rowCount={total}

                    paginationMode="server"

                    pageSizeOptions={[10, 25, 50, 100]}

                    paginationModel={paginationModel}

                    onPaginationModelChange={model => {

                        updatePagination(model);

                        reload();

                    }}

                    disableRowSelectionOnClick

                />

            </CardContent>

        </Card>

    );

}