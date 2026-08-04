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

    Switch,

    Checkbox,

    ListItemText,

    OutlinedInput

} from "@mui/material";

import {

    getRoles,
    getSites

} from "../api/userApi";

import useUser from "../hooks/useUser";

/*
|--------------------------------------------------------------------------
| User Form
|--------------------------------------------------------------------------
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

    const [roles, setRoles] = useState([]);

    const [sites, setSites] = useState([]);

    const isEdit = Boolean(initialValues);

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
    | Load Lookups
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        async function loadLookups() {

            try {

                const [

                    roleData,

                    siteData

                ] = await Promise.all([

                    getRoles(),

                    getSites()

                ]);

                setRoles(roleData || []);

                setSites(siteData || []);

            }

            catch (error) {

                console.error(error);

            }

        }

        loadLookups();

    }, []);

    /*
    |--------------------------------------------------------------------------
    | Populate Edit Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!initialValues) {

            return;

        }

        setForm({

            firstName: initialValues.firstName || "",

            lastName: initialValues.lastName || "",

            email: initialValues.email || "",

            phone: initialValues.phone || "",

            role: initialValues.role?._id || initialValues.role || "",

            assignedSites:

                initialValues.assignedSites?.map(

                    site => site._id || site

                ) || [],

            avatar: initialValues.avatar || "",

            isActive: initialValues.isActive,

            password: "",

            confirmPassword: ""

        });

    }, [initialValues]);

    /*
    |--------------------------------------------------------------------------
    | Change
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

        try {

            const payload = {

                firstName: form.firstName,

                lastName: form.lastName,

                email: form.email,

                phone: form.phone,

                role: form.role,

                assignedSites: form.assignedSites,

                avatar: form.avatar,

                isActive: form.isActive

            };

            if (!isEdit) {

                if (form.password !== form.confirmPassword) {

                    alert("Passwords do not match.");

                    return;

                }

                payload.password = form.password;

                await createUser(payload);

            }

            else {

                await updateUser(

                    initialValues._id,

                    payload

                );

            }

            reload();

            onClose();

        }

        catch (error) {

            console.error(error);

        }

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

                        ? "Edit User"

                        : "Create User"

                }

            </DialogTitle>

            <DialogContent>

                <Grid container spacing={2} sx={{ mt: 1 }}>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            fullWidth

                            label="First Name"

                            name="firstName"

                            value={form.firstName}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            fullWidth

                            label="Last Name"

                            name="lastName"

                            value={form.lastName}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            fullWidth

                            label="Email"

                            name="email"

                            value={form.email}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            fullWidth

                            label="Phone"

                            name="phone"

                            value={form.phone}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            fullWidth

                            select

                            label="Role"

                            name="role"

                            value={form.role}

                            onChange={handleChange}

                        >

                            {

                                roles.map(role => (

                                    <MenuItem

                                        key={role._id}

                                        value={role._id}

                                    >

                                        {role.name}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            select

                            fullWidth

                            SelectProps={{

                                multiple: true

                            }}

                            input={<OutlinedInput />}

                            label="Assigned Sites"

                            name="assignedSites"

                            value={form.assignedSites}

                            onChange={handleChange}

                        >

                            {

                                sites.map(site => (

                                    <MenuItem

                                        key={site._id}

                                        value={site._id}

                                    >

                                        <Checkbox

                                            checked={form.assignedSites.includes(site._id)}

                                        />

                                        <ListItemText

                                            primary={site.siteName}

                                        />

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={{ xs:12 }}>

                        <TextField

                            fullWidth

                            label="Avatar URL"

                            name="avatar"

                            value={form.avatar}

                            onChange={handleChange}

                        />

                    </Grid>

                    {

                        !isEdit && (

                            <>

                                <Grid size={{ xs:12, md:6 }}>

                                    <TextField

                                        fullWidth

                                        type="password"

                                        label="Password"

                                        name="password"

                                        value={form.password}

                                        onChange={handleChange}

                                    />

                                </Grid>

                                <Grid size={{ xs:12, md:6 }}>

                                    <TextField

                                        fullWidth

                                        type="password"

                                        label="Confirm Password"

                                        name="confirmPassword"

                                        value={form.confirmPassword}

                                        onChange={handleChange}

                                    />

                                </Grid>

                            </>

                        )

                    }

                    <Grid size={{ xs:12 }}>

                        <FormControlLabel

                            control={

                                <Switch

                                    checked={form.isActive}

                                    onChange={event =>

                                        setForm(previous => ({

                                            ...previous,

                                            isActive: event.target.checked

                                        }))

                                    }

                                />

                            }

                            label="Active"

                        />

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>

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