import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
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

    const firstName = user.firstName || "";
    const lastName = user.lastName || "";

    const initials =
        `${firstName?.[0] || ""}${lastName?.[0] || ""}`
            .toUpperCase();

    const roleName =
        typeof user.role === "object"
            ? user.role?.name
            : user.role;

    const assignedSites =
        Array.isArray(user.assignedSites)
            ? user.assignedSites
            : [];

    return (
        <Dialog
            open={Boolean(open)}
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
                    sx={{
                        mt: 1
                    }}
                >

                    {/* User Header */}

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            alignItems: "center"
                        }}
                    >

                        <Avatar
                            src={user.avatar || undefined}
                            sx={{
                                width: 80,
                                height: 80
                            }}
                        >
                            {initials}
                        </Avatar>

                        <Stack>

                            <Typography
                                variant="h5"
                                fontWeight={700}
                            >
                                {firstName} {lastName}
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                {user.email || "-"}
                            </Typography>

                            <Chip
                                sx={{
                                    mt: 1,
                                    width: "fit-content"
                                }}
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
                                size="small"
                            />

                        </Stack>

                    </Stack>

                    <Divider />

                    {/* User Information */}

                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}
                        >

                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Phone
                            </Typography>

                            <Typography>
                                {user.phone || "-"}
                            </Typography>

                        </Grid>

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}
                        >

                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Role
                            </Typography>

                            <Typography>
                                {roleName || "-"}
                            </Typography>

                        </Grid>

                        {/* Assigned Sites */}

                        <Grid
                            size={{
                                xs: 12
                            }}
                        >

                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                            >
                                Assigned Sites
                            </Typography>

                            {assignedSites.length > 0 ? (

                                <List dense>

                                    {assignedSites.map(
                                        (site, index) => {

                                            const siteId =
                                                site?._id ||
                                                site?.id ||
                                                site;

                                            const siteName =
                                                site?.siteName ||
                                                site?.name ||
                                                siteId;

                                            return (
                                                <ListItem
                                                    key={
                                                        siteId ||
                                                        index
                                                    }
                                                >

                                                    <ListItemText
                                                        primary={
                                                            siteName
                                                        }
                                                    />

                                                </ListItem>
                                            );

                                        }
                                    )}

                                </List>

                            ) : (

                                <Typography
                                    color="text.secondary"
                                >
                                    No assigned sites
                                </Typography>

                            )}

                        </Grid>

                        {/* Last Login */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}
                        >

                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
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

                        {/* Created */}

                        <Grid
                            size={{
                                xs: 12,
                                md: 6
                            }}
                        >

                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
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