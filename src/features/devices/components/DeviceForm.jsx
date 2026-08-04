import { useEffect, useState } from "react";

import {

    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

    Grid,
    TextField,
    MenuItem,
    Button

} from "@mui/material";

import {

    getDeviceTypes,
    getManufacturers

} from "../api/deviceApi";

import {

    getSiteLookup

} from "../../sites/api/siteApi";

import useDevice from "../hooks/useDevice";

/*
|--------------------------------------------------------------------------
| Device Form
|--------------------------------------------------------------------------
*/

export default function DeviceForm({

    open,

    onClose,

    initialValues = null

}) {

    const {

        createDevice,

        updateDevice

    } = useDevice();

    const [

        manufacturers,

        setManufacturers

    ] = useState([]);

    const [

        deviceTypes,

        setDeviceTypes

    ] = useState([]);

    const [

        sites,

        setSites

    ] = useState([]);

    const [

        form,

        setForm

    ] = useState({

        name: "",

        manufacturer: "",

        model: "",

        type: "",

        serialNumber: "",

        firmwareVersion: "",

        siteId: "",

        status: "Healthy"

    });

    /*
    |--------------------------------------------------------------------------
    | Load Lookups
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!open) return;

        async function loadLookups() {

            try {

                const [

                    manufacturersData,

                    deviceTypesData,

                    siteData

                ] = await Promise.all([

                    getManufacturers(),

                    getDeviceTypes(),

                    getSiteLookup()

                ]);

                setManufacturers(

                    manufacturersData || []

                );

                setDeviceTypes(

                    deviceTypesData || []

                );

                setSites(

                    siteData || []

                );

            }

            catch (error) {

                console.error(error);

            }

        }

        loadLookups();

    }, [open]);

    /*
    |--------------------------------------------------------------------------
    | Edit Mode
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (initialValues) {

            setForm(initialValues);

        }

    }, [initialValues]);

    /*
    |--------------------------------------------------------------------------
    | Change Handler
    |--------------------------------------------------------------------------
    */

    const handleChange = event => {

        const {

            name,

            value

        } = event.target;

        setForm(previous => ({

            ...previous,

            [name]: value

        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async () => {

        if (initialValues?.id) {

            await updateDevice(

                initialValues.id,

                form

            );

        }

        else {

            await createDevice(form);

        }

        reload();

        onClose();

    };

    return (

        <Dialog

            open={open}

            onClose={onClose}

            fullWidth

            maxWidth="md"

        >

            <DialogTitle>

                {

                    initialValues

                        ? "Edit Device"

                        : "New Device"

                }

            </DialogTitle>

            <DialogContent>

                <Grid

                    container

                    spacing={2}

                    mt={1}

                >

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            fullWidth

                            label="Device Name"

                            name="name"

                            value={form.name}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            fullWidth

                            label="Model"

                            name="model"

                            value={form.model}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            select

                            fullWidth

                            label="Manufacturer"

                            name="manufacturer"

                            value={form.manufacturer}

                            onChange={handleChange}

                        >

                            {

                                manufacturers.map(item => (

                                    <MenuItem

                                        key={item.id}

                                        value={item.name}

                                    >

                                        {item.name}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            select

                            fullWidth

                            label="Device Type"

                            name="type"

                            value={form.type}

                            onChange={handleChange}

                        >

                            {

                                deviceTypes.map(item => (

                                    <MenuItem

                                        key={item.id}

                                        value={item.name}

                                    >

                                        {item.name}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            fullWidth

                            label="Serial Number"

                            name="serialNumber"

                            value={form.serialNumber}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            fullWidth

                            label="Firmware Version"

                            name="firmwareVersion"

                            value={form.firmwareVersion}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12 }}>

                        <TextField

                            select

                            fullWidth

                            label="Site"

                            name="siteId"

                            value={form.siteId}

                            onChange={handleChange}

                        >

                            {

                                sites.map(site => (

                                    <MenuItem

                                        key={site.id}

                                        value={site.id}

                                    >

                                        {site.name}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button

                    onClick={onClose}

                >

                    Cancel

                </Button>

                <Button

                    variant="contained"

                    onClick={handleSubmit}

                >

                    Save

                </Button>

            </DialogActions>

        </Dialog>

    );

}