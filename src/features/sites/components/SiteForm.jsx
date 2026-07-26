import { useEffect, useState } from "react";

import {

    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

    Grid,

    TextField,

    Button,

    MenuItem,

    CircularProgress

} from "@mui/material";

import useSite from "../hooks/useSite";

/*
|--------------------------------------------------------------------------
| Initial Form State
|--------------------------------------------------------------------------
*/

const INITIAL_FORM = {

    siteCode: "",

    siteName: "",

    state: "",

    technology: "",

    powerSource: "",

    latitude: "",

    longitude: "",

    status: "Healthy"

};

/*
|--------------------------------------------------------------------------
| Site Form
|--------------------------------------------------------------------------
*/

export default function SiteForm({

    open,

    onClose,

    site = null

}) {

    const {

        createSite,

        updateSite,

        loading

    } = useSite();

    const [form, setForm] = useState(INITIAL_FORM);

    /*
    |--------------------------------------------------------------------------
    | Populate Form (Edit Mode)
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (site) {

            setForm({

                ...INITIAL_FORM,

                ...site

            });

        }

        else {

            setForm(INITIAL_FORM);

        }

    }, [site]);

    /*
    |--------------------------------------------------------------------------
    | Handle Change
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
    | Save
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async () => {

        if (site?.id) {

            await updateSite(

                site.id,

                form

            );

        }

        else {

            await createSite(form);

        }

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

                    site

                        ? "Edit Site"

                        : "Create Site"

                }

            </DialogTitle>

            <DialogContent>

                <Grid

                    container

                    spacing={2}

                    sx={{ mt: 1 }}

                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            fullWidth

                            required

                            label="Site Code"

                            name="siteCode"

                            value={form.siteCode}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            fullWidth

                            required

                            label="Site Name"

                            name="siteName"

                            value={form.siteName}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            fullWidth

                            label="State"

                            name="state"

                            value={form.state}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            select

                            fullWidth

                            label="Technology"

                            name="technology"

                            value={form.technology}

                            onChange={handleChange}

                        >

                            <MenuItem value="2G">2G</MenuItem>

                            <MenuItem value="3G">3G</MenuItem>

                            <MenuItem value="4G">4G</MenuItem>

                            <MenuItem value="5G">5G</MenuItem>

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            fullWidth

                            label="Power Source"

                            name="powerSource"

                            value={form.powerSource}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            fullWidth

                            label="Latitude"

                            name="latitude"

                            value={form.latitude}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            fullWidth

                            label="Longitude"

                            name="longitude"

                            value={form.longitude}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField

                            select

                            fullWidth

                            label="Status"

                            name="status"

                            value={form.status}

                            onChange={handleChange}

                        >

                            <MenuItem value="Healthy">

                                Healthy

                            </MenuItem>

                            <MenuItem value="Warning">

                                Warning

                            </MenuItem>

                            <MenuItem value="Critical">

                                Critical

                            </MenuItem>

                            <MenuItem value="Offline">

                                Offline

                            </MenuItem>

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

                    disabled={loading}

                >

                    {

                        loading

                            ? <CircularProgress size={20} />

                            : site

                                ? "Update"

                                : "Create"

                    }

                </Button>

            </DialogActions>

        </Dialog>

    );

}