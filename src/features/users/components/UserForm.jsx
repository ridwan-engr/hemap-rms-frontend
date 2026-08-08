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
    FormControlLabel,
    Switch
} from "@mui/material";

import useUser from "../hooks/useUser.js";

/*
|--------------------------------------------------------------------------
| User Form
|--------------------------------------------------------------------------
|
| Uses the existing User API through useUser().
|
| Supported API:
|
| POST  /users
| PUT   /users/:id
| PATCH /users/:id/activate
| PATCH /users/:id/deactivate
|
| Role and site lookup endpoints are NOT assumed here because the
| current userApi.js does not expose getRoles() or getSites().
|
*/

export default function UserForm({
    open,
    onClose,
    initialValues = null
}) {

    const {
        createUser,
        updateUser,
        reload
    } = useUser();

    const isEdit = Boolean(initialValues);

    /*
    |--------------------------------------------------------------------------
    | Form State
    |--------------------------------------------------------------------------
    */

    const [form, setForm] = useState({

        firstName: "",

        lastName: "",

        email: "",

        phone: "",

        role: "",

        assignedSites: [],

        avatar: "",

        isActive: true,

        password: "",

        confirmPassword: ""

    });

    /*
    |--------------------------------------------------------------------------
    | Populate Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!initialValues) {

            setForm({

                firstName: "",

                lastName: "",

                email: "",

                phone: "",

                role: "",

                assignedSites: [],

                avatar: "",

                isActive: true,

                password: "",

                confirmPassword: ""

            });

            return;

        }

        setForm({

            firstName:
                initialValues.firstName || "",

            lastName:
                initialValues.lastName || "",

            email:
                initialValues.email || "",

            phone:
                initialValues.phone || "",

            role:
                initialValues.role?._id ||
                initialValues.role ||
                "",

            assignedSites:
                initialValues.assignedSites?.map(
                    site =>
                        site?._id ||
                        site
                ) || [],

            avatar:
                initialValues.avatar || "",

            isActive:
                initialValues.isActive !== false,

            password: "",

            confirmPassword: ""

        });

    }, [initialValues, open]);

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
    | Assigned Sites
    |--------------------------------------------------------------------------
    |
    | Since userApi.js has no getSites(), site IDs can be entered directly.
    | If the parent already supplies available sites, this component can
    | later be upgraded to a site selector without changing the API layer.
    |
    */

    const handleAssignedSitesChange = event => {

        const value = event.target.value;

        setForm(previous => ({

            ...previous,

            assignedSites:
                typeof value === "string"
                    ? value.split(",")
                    : value

        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async () => {

        try {

            /*
            |------------------------------------------------------------------
            | Validate required fields
            |------------------------------------------------------------------
            */

            if (!form.firstName.trim()) {

                alert("First name is required.");

                return;

            }

            if (!form.lastName.trim()) {

                alert("Last name is required.");

                return;

            }

            if (!form.email.trim()) {

                alert("Email is required.");

                return;

            }

            if (!form.role) {

                alert("Role is required.");

                return;

            }

            /*
            |------------------------------------------------------------------
            | Create
            |------------------------------------------------------------------
            */

            if (!isEdit) {

                if (!form.password) {

                    alert("Password is required.");

                    return;

                }

                if (
                    form.password !==
                    form.confirmPassword
                ) {

                    alert(
                        "Passwords do not match."
                    );

                    return;

                }

                const payload = {

                    firstName:
                        form.firstName.trim(),

                    lastName:
                        form.lastName.trim(),

                    email:
                        form.email.trim(),

                    phone:
                        form.phone.trim(),

                    role:
                        form.role,

                    assignedSites:
                        form.assignedSites,

                    avatar:
                        form.avatar.trim(),

                    isActive:
                        form.isActive,

                    password:
                        form.password

                };

                await createUser(payload);

            }

            /*
            |------------------------------------------------------------------
            | Update
            |------------------------------------------------------------------
            */

            else {

                const payload = {

                    firstName:
                        form.firstName.trim(),

                    lastName:
                        form.lastName.trim(),

                    email:
                        form.email.trim(),

                    phone:
                        form.phone.trim(),

                    role:
                        form.role,

                    assignedSites:
                        form.assignedSites,

                    avatar:
                        form.avatar.trim()

                };

                await updateUser(

                    initialValues._id ||
                    initialValues.id,

                    payload

                );

            }

            /*
            |------------------------------------------------------------------
            | Reload User List
            |------------------------------------------------------------------
            */

            reload();

            onClose();

        }

        catch (error) {

            console.error(
                "User form submission failed:",
                error
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

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
                        ? "Edit User"
                        : "Create User"
                }

            </DialogTitle>


            <DialogContent>

                <Grid
                    container
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    {/* First Name */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <TextField

                            fullWidth

                            required

                            label="First Name"

                            name="firstName"

                            value={
                                form.firstName
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </Grid>


                    {/* Last Name */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <TextField

                            fullWidth

                            required

                            label="Last Name"

                            name="lastName"

                            value={
                                form.lastName
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </Grid>


                    {/* Email */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <TextField

                            fullWidth

                            required

                            type="email"

                            label="Email"

                            name="email"

                            value={
                                form.email
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </Grid>


                    {/* Phone */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <TextField

                            fullWidth

                            label="Phone"

                            name="phone"

                            value={
                                form.phone
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </Grid>


                    {/* Role */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <TextField

                            fullWidth

                            required

                            select

                            label="Role"

                            name="role"

                            value={
                                form.role
                            }

                            onChange={
                                handleChange
                            }

                        >

                            <MenuItem value="">

                                Select Role

                            </MenuItem>

                            <MenuItem value="ADMIN">

                                Administrator

                            </MenuItem>

                            <MenuItem value="ENGINEER">

                                Engineer

                            </MenuItem>

                            <MenuItem value="SUPERVISOR">

                                Supervisor

                            </MenuItem>

                        </TextField>

                    </Grid>


                    {/* Assigned Sites */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <TextField

                            fullWidth

                            label="Assigned Site IDs"

                            name="assignedSites"

                            value={
                                form.assignedSites.join(
                                    ", "
                                )
                            }

                            onChange={handleAssignedSitesChange}

                            placeholder="MongoDB Site IDs, comma separated"

                            helperText={
                                "Enter site IDs separated by commas"
                            }

                        />

                    </Grid>


                    {/* Avatar */}

                    <Grid
                        size={{
                            xs: 12
                        }}
                    >

                        <TextField

                            fullWidth

                            label="Avatar URL"

                            name="avatar"

                            value={
                                form.avatar
                            }

                            onChange={
                                handleChange
                            }

                        />

                    </Grid>


                    {/* Password */}

                    {!isEdit && (

                        <>

                            <Grid
                                size={{
                                    xs: 12,
                                    md: 6
                                }}
                            >

                                <TextField

                                    fullWidth

                                    required

                                    type="password"

                                    label="Password"

                                    name="password"

                                    value={
                                        form.password
                                    }

                                    onChange={
                                        handleChange
                                    }

                                />

                            </Grid>


                            <Grid
                                size={{
                                    xs: 12,
                                    md: 6
                                }}
                            >

                                <TextField

                                    fullWidth

                                    required

                                    type="password"

                                    label="Confirm Password"

                                    name="confirmPassword"

                                    value={
                                        form.confirmPassword
                                    }

                                    onChange={
                                        handleChange
                                    }

                                />

                            </Grid>

                        </>

                    )}


                    {/* Active */}

                    <Grid
                        size={{
                            xs: 12
                        }}
                    >

                        <FormControlLabel

                            control={

                                <Switch

                                    checked={
                                        form.isActive
                                    }

                                    onChange={
                                        event =>
                                            setForm(
                                                previous => ({
                                                    ...previous,
                                                    isActive:
                                                        event
                                                            .target
                                                            .checked
                                                })
                                            )
                                    }

                                />

                            }

                            label="Active"

                        />

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

                    onClick={
                        handleSubmit
                    }

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