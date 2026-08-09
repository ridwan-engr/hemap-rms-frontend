import {
    useEffect,
    useState
} from "react";

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
| Initial Form State
|--------------------------------------------------------------------------
*/

const EMPTY_FORM = {
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
};

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
        updateUser
    } = useUser();

    const [form, setForm] = useState(
        EMPTY_FORM
    );

    const [submitting, setSubmitting] =
        useState(false);

    const isEdit =
        Boolean(initialValues);

    /*
    |--------------------------------------------------------------------------
    | Populate Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!open) {
            return;
        }

        if (!initialValues) {

            setForm({
                ...EMPTY_FORM
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
                initialValues.role?.id ||
                initialValues.role ||
                "",

            assignedSites:
                Array.isArray(
                    initialValues.assignedSites
                )
                    ? initialValues.assignedSites.map(
                        site =>
                            site?._id ||
                            site?.id ||
                            site
                    )
                    : [],

            avatar:
                initialValues.avatar || "",

            isActive:
                initialValues.isActive !== false,

            password: "",
            confirmPassword: ""

        });

    }, [
        initialValues,
        open
    ]);

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
    */

    const handleAssignedSitesChange =
        event => {

            const value =
                event.target.value;

            const sites =
                typeof value === "string"
                    ? value
                        .split(",")
                        .map(site =>
                            site.trim()
                        )
                        .filter(Boolean)
                    : value;

            setForm(previous => ({
                ...previous,
                assignedSites: sites
            }));

        };

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    const handleSubmit = async () => {

        if (submitting) {
            return;
        }

        if (!form.firstName.trim()) {

            alert(
                "First name is required."
            );

            return;
        }

        if (!form.lastName.trim()) {

            alert(
                "Last name is required."
            );

            return;
        }

        if (!form.email.trim()) {

            alert(
                "Email is required."
            );

            return;
        }

        if (!form.role) {

            alert(
                "Role is required."
            );

            return;
        }

        if (!isEdit) {

            if (!form.password) {

                alert(
                    "Password is required."
                );

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

        }

        try {

            setSubmitting(true);

            if (!isEdit) {

                await createUser({

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

                });

            } else {

                const userId =
                    initialValues?._id ||
                    initialValues?.id;

                if (!userId) {

                    throw new Error(
                        "User ID is required for update."
                    );

                }

                await updateUser(
                    userId,
                    {

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

                    }
                );

            }

            onClose();

        } catch (error) {

            console.error(
                "User form submission failed:",
                error
            );

            alert(
                error?.message ||
                "Unable to save user."
            );

        } finally {

            setSubmitting(false);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <Dialog
            open={Boolean(open)}
            onClose={
                submitting
                    ? undefined
                    : onClose
            }
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
                    sx={{
                        mt: 1
                    }}
                >

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
                            onChange={
                                handleAssignedSitesChange
                            }
                            placeholder="Site IDs, comma separated"
                            helperText={
                                "Enter MongoDB site IDs separated by commas."
                            }
                        />

                    </Grid>

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
                    disabled={submitting}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={submitting}
                >
                    {
                        submitting
                            ? "Saving..."
                            : isEdit
                                ? "Update"
                                : "Create"
                    }
                </Button>

            </DialogActions>

        </Dialog>
    );
}