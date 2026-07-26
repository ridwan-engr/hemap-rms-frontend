import {

    Dialog,
    DialogTitle,
    DialogContent,

    Stack,

    Typography,

    Divider,

    Chip,

    Grid,

    Button,

    DialogActions

} from "@mui/material";

/*
|--------------------------------------------------------------------------
| Role Details
|--------------------------------------------------------------------------
*/

export default function RoleDetails({

    open,

    onClose,

    role

}) {

    if (!role) {

        return null;

    }

    return (

        <Dialog

            open={open}

            onClose={onClose}

            fullWidth

            maxWidth="md"

        >

            <DialogTitle>

                Role Details

            </DialogTitle>

            <DialogContent>

                <Stack

                    spacing={3}

                    sx={{ mt: 1 }}

                >

                    <Grid

                        container

                        spacing={2}

                    >

                        <Grid size={{ xs:12 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Role Name

                            </Typography>

                            <Typography

                                variant="h5"

                                fontWeight={700}

                            >

                                {role.name}

                            </Typography>

                        </Grid>

                        <Grid size={{ xs:12 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Description

                            </Typography>

                            <Typography>

                                {

                                    role.description ||

                                    "No description"

                                }

                            </Typography>

                        </Grid>

                    </Grid>

                    <Divider />

                    <Typography

                        variant="h6"

                    >

                        Permissions

                    </Typography>

                    <Stack

                        direction="row"

                        flexWrap="wrap"

                        gap={1}

                    >

                        {

                            role.permissions?.length

                                ? (

                                    role.permissions.map(permission => (

                                        <Chip

                                            key={permission}

                                            label={permission}

                                            color="primary"

                                            variant="outlined"

                                        />

                                    ))

                                )

                                : (

                                    <Typography>

                                        No permissions assigned.

                                    </Typography>

                                )

                        }

                    </Stack>

                    <Divider />

                    <Grid

                        container

                        spacing={2}

                    >

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Created

                            </Typography>

                            <Typography>

                                {

                                    role.createdAt

                                        ? new Date(

                                            role.createdAt

                                        ).toLocaleString()

                                        : "-"

                                }

                            </Typography>

                        </Grid>

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Last Updated

                            </Typography>

                            <Typography>

                                {

                                    role.updatedAt

                                        ? new Date(

                                            role.updatedAt

                                        ).toLocaleString()

                                        : "-"

                                }

                            </Typography>

                        </Grid>

                    </Grid>

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button

                    variant="contained"

                    onClick={onClose}

                >

                    Close

                </Button>

            </DialogActions>

        </Dialog>

    );

}