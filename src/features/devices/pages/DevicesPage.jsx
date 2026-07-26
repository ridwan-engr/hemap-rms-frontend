import { useEffect, useState } from "react";

import {

    Box,
    Stack

} from "@mui/material";

import useDevice from "../hooks/useDevice";

import DeviceToolbar from "../components/DeviceToolbar";
import DeviceSummaryCards from "../components/DeviceSummaryCards";
import DeviceStatistics from "../components/DeviceStatistics";
import DeviceHealthChart from "../components/DeviceHealthChart";
import DeviceFilter from "../components/DeviceFilter";
import DeviceTable from "../components/DeviceTable";
import DeviceDetails from "../components/DeviceDetails";
import DeviceForm from "../components/DeviceForm";

/*
|--------------------------------------------------------------------------
| Devices Page
|--------------------------------------------------------------------------
*/

export default function DevicesPage() {

    const {

        reload,
        loadSummary,
        loadStatistics,
        loadHealth

    } = useDevice();

    const [

        formOpen,

        setFormOpen

    ] = useState(false);

    const [

        editingDevice,

        setEditingDevice

    ] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        reload();

        loadSummary();

        loadStatistics();

        loadHealth();

    }, [

        reload,
        loadSummary,
        loadStatistics,
        loadHealth

    ]);

    /*
    |--------------------------------------------------------------------------
    | Toolbar Actions
    |--------------------------------------------------------------------------
    */

    const handleCreate = () => {

        setEditingDevice(null);

        setFormOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | Edit Action
    |--------------------------------------------------------------------------
    */

    const handleEdit = device => {

        setEditingDevice(device);

        setFormOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | Close Dialog
    |--------------------------------------------------------------------------
    */

    const handleClose = () => {

        setFormOpen(false);

        setEditingDevice(null);

    };

    return (

        <Box>

            <Stack spacing={3}>

                <DeviceToolbar

                    onCreate={handleCreate}

                />

                <DeviceSummaryCards />

                <DeviceFilter />

                <DeviceStatistics />

                <DeviceHealthChart />

                <DeviceTable

                    onEdit={handleEdit}

                />

                <DeviceDetails />

            </Stack>

            <DeviceForm

                open={formOpen}

                onClose={handleClose}

                initialValues={editingDevice}

            />

        </Box>

    );

}