import {

    Dialog,
    DialogTitle,
    DialogContent,

    Grid,

    Typography,

    Avatar,

    Chip,

    Divider,

    Stack,

    Button,

    List,

    ListItem,

    ListItemText

} from "@mui/material";

/*
|--------------------------------------------------------------------------
| User Details
|--------------------------------------------------------------------------
*/

export default function UserDetails({

    open,

    onClose,

    user

}) {

    if (!user) {

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

                User Details

            </DialogTitle>

            <DialogContent>

                <Stack

                    spacing={3}

                    sx={{ mt: 1 }}

                >

                    <Stack

                        direction="row"

                        spacing={2}

                        alignItems="center"

                    >

                        <Avatar

                            src={user.avatar}

                            sx={{

                                width: 80,

                                height: 80

                            }}

                        >

                            {

                                `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`

                            }

                        </Avatar>

                        <Stack>

                            <Typography

                                variant="h5"

                                fontWeight={700}

                            >

                                {user.firstName} {user.lastName}

                            </Typography>

                            <Typography

                                color="text.secondary"

                            >

                                {user.email}

                            </Typography>

                            <Chip

                                sx={{ mt: 1, width: "fit-content" }}

                                color={

                                    user.isActive

                                        ? "success"

                                        : "error"

                                }

                                label={

                                    user.isActive

                                        ? "Active"

                                        : "Inactive"

                                }

                            />

                        </Stack>

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

                                Phone

                            </Typography>

                            <Typography>

                                {user.phone || "-"}

                            </Typography>

                        </Grid>

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Role

                            </Typography>

                            <Typography>

                                {user.role?.name || "-"}

                            </Typography>

                        </Grid>

                        <Grid size={{ xs:12 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Assigned Sites

                            </Typography>

                            <List dense>

                                {

                                    user.assignedSites?.length

                                        ? (

                                            user.assignedSites.map(site => (

                                                <ListItem

                                                    key={site._id}

                                                >

                                                    <ListItemText

                                                        primary={site.siteName}

                                                    />

                                                </ListItem>

                                            ))

                                        )

                                        : (

                                            <Typography>

                                                No assigned sites

                                            </Typography>

                                        )

                                }

                            </List>

                        </Grid>

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Last Login

                            </Typography>

                            <Typography>

                                {

                                    user.lastLogin

                                        ? new Date(

                                            user.lastLogin

                                        ).toLocaleString()

                                        : "-"

                                }

                            </Typography>

                        </Grid>

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Created

                            </Typography>

                            <Typography>

                                {

                                    user.createdAt

                                        ? new Date(

                                            user.createdAt

                                        ).toLocaleString()

                                        : "-"

                                }

                            </Typography>

                        </Grid>

                    </Grid>

                    <Divider />

                    <Stack

                        direction="row"

                        justifyContent="flex-end"

                    >

                        <Button

                            variant="contained"

                            onClick={onClose}

                        >

                            Close

                        </Button>

                    </Stack>

                </Stack>

            </DialogContent>

        </Dialog>

    );

}