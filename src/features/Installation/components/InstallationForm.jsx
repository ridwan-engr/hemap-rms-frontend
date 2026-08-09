import {
    useEffect,
    useState
} from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";


/*
|--------------------------------------------------------------------------
| Default Form State
|--------------------------------------------------------------------------
*/

const defaultFormData = {

    name: "",

    siteId: "",

    description: "",

    location: "",

    status: "ACTIVE",

    type: "HYBRID",

    latitude: "",

    longitude: "",

    timezone: "Africa/Lagos",

    capacity: "",

    notes: ""

};


/*
|--------------------------------------------------------------------------
| Installation Form
|--------------------------------------------------------------------------
*/

export default function InstallationForm({

    initialData = null,

    onSubmit,

    onCancel,

    loading = false,

    error = null

}) {

    /*
    |--------------------------------------------------------------------------
    | Form State
    |--------------------------------------------------------------------------
    */

    const [
        formData,
        setFormData
    ] = useState(
        defaultFormData
    );


    const [
        validationErrors,
        setValidationErrors
    ] = useState({});


    /*
    |--------------------------------------------------------------------------
    | Initialize Form
    |--------------------------------------------------------------------------
    */

    useEffect(
        () => {

            if (!initialData) {

                setFormData(
                    defaultFormData
                );

                return;

            }


            setFormData({

                name:
                    initialData.name ||
                    "",

                siteId:
                    initialData.siteId ||
                    "",

                description:
                    initialData.description ||
                    "",

                location:
                    typeof initialData.location ===
                    "string"
                        ? initialData.location
                        : initialData.location?.name ||
                          "",

                status:
                    initialData.status ||
                    "ACTIVE",

                type:
                    initialData.type ||
                    initialData.installationType ||
                    "HYBRID",

                latitude:
                    initialData.latitude ??
                    initialData.coordinates?.latitude ??
                    "",

                longitude:
                    initialData.longitude ??
                    initialData.coordinates?.longitude ??
                    "",

                timezone:
                    initialData.timezone ||
                    "Africa/Lagos",

                capacity:
                    initialData.capacity ??
                    "",

                notes:
                    initialData.notes ||
                    ""

            });

        },
        [
            initialData
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Input Handler
    |--------------------------------------------------------------------------
    */

    const handleChange = event => {

        const {
            name,
            value
        } = event.target;


        setFormData(
            previous => ({

                ...previous,

                [name]: value

            })
        );


        if (
            validationErrors[name]
        ) {

            setValidationErrors(
                previous => {

                    const next = {
                        ...previous
                    };

                    delete next[name];

                    return next;

                }
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    const validateForm = () => {

        const errors = {};


        if (
            !formData.name.trim()
        ) {

            errors.name =
                "Installation name is required";

        }


        if (
            !formData.siteId.trim()
        ) {

            errors.siteId =
                "Site ID is required";

        }


        if (
            formData.latitude !== "" &&
            Number.isNaN(
                Number(formData.latitude)
            )
        ) {

            errors.latitude =
                "Latitude must be a valid number";

        }


        if (
            formData.longitude !== "" &&
            Number.isNaN(
                Number(formData.longitude)
            )
        ) {

            errors.longitude =
                "Longitude must be a valid number";

        }


        if (
            formData.capacity !== "" &&
            Number.isNaN(
                Number(formData.capacity)
            )
        ) {

            errors.capacity =
                "Capacity must be a valid number";

        }


        setValidationErrors(
            errors
        );


        return (
            Object.keys(errors).length === 0
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async event => {

        event.preventDefault();


        if (
            !validateForm()
        ) {
            return;
        }


        const payload = {

            ...formData,

            latitude:
                formData.latitude === ""
                    ? undefined
                    : Number(
                        formData.latitude
                    ),

            longitude:
                formData.longitude === ""
                    ? undefined
                    : Number(
                        formData.longitude
                    ),

            capacity:
                formData.capacity === ""
                    ? undefined
                    : Number(
                        formData.capacity
                    )

        };


        try {

            await onSubmit(
                payload
            );

        }
        catch (submitError) {

            console.error(
                "Installation form submission failed:",
                submitError
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Error Normalization
    |--------------------------------------------------------------------------
    */

    const errorMessage =
        typeof error === "string"
            ? error
            : error?.message ||
              error?.error ||
              null;


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <Box
            component="form"
            onSubmit={handleSubmit}
        >

            <Stack spacing={3}>

                {errorMessage && (

                    <Alert severity="error">
                        {errorMessage}
                    </Alert>

                )}


                <Grid
                    container
                    spacing={2}
                >

                    {/*
                    |--------------------------------------------------------------------------
                    | Name
                    |--------------------------------------------------------------------------
                    */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Installation Name"
                            name="name"
                            value={
                                formData.name
                            }
                            onChange={
                                handleChange
                            }
                            error={
                                Boolean(
                                    validationErrors.name
                                )
                            }
                            helperText={
                                validationErrors.name
                            }
                            disabled={loading}
                            required
                        />

                    </Grid>


                    {/*
                    |--------------------------------------------------------------------------
                    | Site ID
                    |--------------------------------------------------------------------------
                    */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Site ID"
                            name="siteId"
                            value={
                                formData.siteId
                            }
                            onChange={
                                handleChange
                            }
                            error={
                                Boolean(
                                    validationErrors.siteId
                                )
                            }
                            helperText={
                                validationErrors.siteId
                            }
                            disabled={loading}
                            required
                        />

                    </Grid>


                    {/*
                    |--------------------------------------------------------------------------
                    | Type
                    |--------------------------------------------------------------------------
                    */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <TextField
                            select
                            fullWidth
                            label="Installation Type"
                            name="type"
                            value={
                                formData.type
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                        >

                            <MenuItem value="HYBRID">
                                Hybrid
                            </MenuItem>

                            <MenuItem value="SOLAR">
                                Solar
                            </MenuItem>

                            <MenuItem value="GRID">
                                Grid
                            </MenuItem>

                            <MenuItem value="GENERATOR">
                                Generator
                            </MenuItem>

                            <MenuItem value="OFF_GRID">
                                Off-Grid
                            </MenuItem>

                        </TextField>

                    </Grid>


                    {/*
                    |--------------------------------------------------------------------------
                    | Status
                    |--------------------------------------------------------------------------
                    */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <TextField
                            select
                            fullWidth
                            label="Status"
                            name="status"
                            value={
                                formData.status
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                        >

                            <MenuItem value="ACTIVE">
                                Active
                            </MenuItem>

                            <MenuItem value="INACTIVE">
                                Inactive
                            </MenuItem>

                            <MenuItem value="MAINTENANCE">
                                Maintenance
                            </MenuItem>

                        </TextField>

                    </Grid>


                    {/*
                    |--------------------------------------------------------------------------
                    | Location
                    |--------------------------------------------------------------------------
                    */}

                    <Grid
                        size={{
                            xs: 12
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            value={
                                formData.location
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                        />

                    </Grid>


                    {/*
                    |--------------------------------------------------------------------------
                    | Latitude
                    |--------------------------------------------------------------------------
                    */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >

                        <TextField
                            fullWidth
                            type="number"
                            label="Latitude"
                            name="latitude"
                            value={
                                formData.latitude
                            }
                            onChange={
                                handleChange
                            }
                            error={
                                Boolean(
                                    validationErrors.latitude
                                )
                            }
                            helperText={
                                validationErrors.latitude
                            }
                            disabled={loading}
                            inputProps={{
                                step: "any"
                            }}
                        />

                    </Grid>


                    {/*
                    |--------------------------------------------------------------------------
                    | Longitude
                    |--------------------------------------------------------------------------
                    */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >

                        <TextField
                            fullWidth
                            type="number"
                            label="Longitude"
                            name="longitude"
                            value={
                                formData.longitude
                            }
                            onChange={
                                handleChange
                            }
                            error={
                                Boolean(
                                    validationErrors.longitude
                                )
                            }
                            helperText={
                                validationErrors.longitude
                            }
                            disabled={loading}
                            inputProps={{
                                step: "any"
                            }}
                        />

                    </Grid>


                    {/*
                    |--------------------------------------------------------------------------
                    | Capacity
                    |--------------------------------------------------------------------------
                    */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 4
                        }}
                    >

                        <TextField
                            fullWidth
                            type="number"
                            label="Capacity (kW)"
                            name="capacity"
                            value={
                                formData.capacity
                            }
                            onChange={
                                handleChange
                            }
                            error={
                                Boolean(
                                    validationErrors.capacity
                                )
                            }
                            helperText={
                                validationErrors.capacity
                            }
                            disabled={loading}
                            inputProps={{
                                min: 0,
                                step: "any"
                            }}
                        />

                    </Grid>


                    {/*
                    |--------------------------------------------------------------------------
                    | Timezone
                    |--------------------------------------------------------------------------
                    */}

                    <Grid
                        size={{
                            xs: 12
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Timezone"
                            name="timezone"
                            value={
                                formData.timezone
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                        />

                    </Grid>


                    {/*
                    |--------------------------------------------------------------------------
                    | Description
                    |--------------------------------------------------------------------------
                    */}

                    <Grid
                        size={{
                            xs: 12
                        }}
                    >

                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            label="Description"
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                        />

                    </Grid>


                    {/*
                    |--------------------------------------------------------------------------
                    | Notes
                    |--------------------------------------------------------------------------
                    */}

                    <Grid
                        size={{
                            xs: 12
                        }}
                    >

                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            label="Notes"
                            name="notes"
                            value={
                                formData.notes
                            }
                            onChange={
                                handleChange
                            }
                            disabled={loading}
                        />

                    </Grid>

                </Grid>


                {/*
                |--------------------------------------------------------------------------
                | Actions
                |--------------------------------------------------------------------------
                */}

                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={2}
                >

                    <Button
                        variant="outlined"
                        onClick={
                            onCancel
                        }
                        disabled={
                            loading
                        }
                    >
                        Cancel
                    </Button>


                    <Button
                        type="submit"
                        variant="contained"
                        disabled={
                            loading
                        }
                        startIcon={
                            loading
                                ? (
                                    <CircularProgress
                                        size={18}
                                    />
                                )
                                : null
                        }
                    >

                        {
                            loading
                                ? "Saving..."
                                : initialData
                                    ? "Update Installation"
                                    : "Create Installation"
                        }

                    </Button>

                </Stack>

            </Stack>

        </Box>

    );

}