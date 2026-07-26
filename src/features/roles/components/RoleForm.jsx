import { useEffect, useState } from "react";

import {

    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

    Grid,

    TextField,

    Button,

    Typography,

    Checkbox,

    FormGroup,

    FormControlLabel,

    Divider,

    CircularProgress

} from "@mui/material";

import {

    getAvailablePermissions

} from "../api/roleApi";

import useRole from "../hooks/useRole";

/*
|--------------------------------------------------------------------------
| Role Form
|--------------------------------------------------------------------------
*/

export default function RoleForm({

    open,

    onClose,

    initialValues = null

}) {

    const {

        createRole,

        updateRole,

        reload

    } = useRole();

    const isEdit = Boolean(initialValues);

    const [

        loadingPermissions,

        setLoadingPermissions

    ] = useState(false);

    const [

        availablePermissions,

        setAvailablePermissions

    ] = useState([]);

    const [

        form,

        setForm

    ] = useState({

        name: "",

        description: "",

        permissions: []

    });

    /*
    |--------------------------------------------------------------------------
    | Load Permissions
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        async function loadPermissions() {

            try {

                setLoadingPermissions(true);

                const permissions = await getAvailablePermissions();

                setAvailablePermissions(

                    permissions || []

                );

            }

            catch (error) {

                console.error(error);

            }

            finally {

                setLoadingPermissions(false);

            }

        }

        if (open) {

            loadPermissions();

        }

    }, [open]);

    /*
    |--------------------------------------------------------------------------
    | Populate Edit Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!initialValues) {

            setForm({

                name: "",

                description: "",

                permissions: []

            });

            return;

        }

        setForm({

            name: initialValues.name || "",

            description: initialValues.description || "",

            permissions: initialValues.permissions || []

        });

    }, [initialValues]);

    /*
    |--------------------------------------------------------------------------
    | Input Change
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
    | Permission Toggle
    |--------------------------------------------------------------------------
    */

    const togglePermission = permission => {

        setForm(previous => {

            const exists = previous.permissions.includes(permission);

            return {

                ...previous,

                permissions: exists

                    ? previous.permissions.filter(

                        item => item !== permission

                    )

                    : [

                        ...previous.permissions,

                        permission

                    ]

            };

        });

    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async () => {

        const payload = {

            name: form.name,

            description: form.description,

            permissions: form.permissions

        };

        if (isEdit) {

            await updateRole(

                initialValues._id,

                payload

            );

        }

        else {

            await createRole(payload);

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

                    isEdit

                        ? "Edit Role"

                        : "Create Role"

                }

            </DialogTitle>

            <DialogContent>

                <Grid

                    container

                    spacing={2}

                    sx={{ mt:1 }}

                >

                    <Grid size={{ xs:12 }}>

                        <TextField

                            fullWidth

                            label="Role Name"

                            name="name"

                            value={form.name}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12 }}>

                        <TextField

                            fullWidth

                            multiline

                            rows={3}

                            label="Description"

                            name="description"

                            value={form.description}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12 }}>

                        <Divider sx={{ mb:2 }} />

                        <Typography

                            variant="h6"

                        >

                            Permissions

                        </Typography>

                    </Grid>

                    <Grid size={{ xs:12 }}>

                        {

                            loadingPermissions

                                ? (

                                    <CircularProgress />

                                )

                                : (

                                    <FormGroup>

                                        {

                                            availablePermissions.map(permission => (

                                                <FormControlLabel

                                                    key={permission}

                                                    control={

                                                        <Checkbox

                                                            checked={

                                                                form.permissions.includes(permission)

                                                            }

                                                            onChange={() =>

                                                                togglePermission(permission)

                                                            }

                                                        />

                                                    }

                                                    label={permission}

                                                />

                                            ))

                                        }

                                    </FormGroup>

                                )

                        }

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

                    {

                        isEdit

                            ? "Update"

                            : "Create"

                    }

                </Button>

            </DialogActions>

        </Dialog>

    );

}