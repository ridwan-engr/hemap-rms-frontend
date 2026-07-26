import {

    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

    Button,

    Grid,

    Stack,

    Typography,

    Divider,

    Chip,

    Paper

} from "@mui/material";

/*
|--------------------------------------------------------------------------
| Audit Details
|--------------------------------------------------------------------------
*/

export default function AuditDetails({

    open,

    onClose,

    audit

}) {

    if (!audit) {

        return null;

    }

    return (

        <Dialog

            open={open}

            onClose={onClose}

            fullWidth

            maxWidth="lg"

        >

            <DialogTitle>

                Audit Log Details

            </DialogTitle>

            <DialogContent>

                <Stack

                    spacing={3}

                    sx={{ mt: 1 }}

                >

                    <Grid

                        container

                        spacing={3}

                    >

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                User

                            </Typography>

                            <Typography>

                                {

                                    audit.user

                                        ? `${audit.user.firstName} ${audit.user.lastName}`

                                        : "-"

                                }

                            </Typography>

                        </Grid>

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Email

                            </Typography>

                            <Typography>

                                {

                                    audit.user?.email ||

                                    "-"

                                }

                            </Typography>

                        </Grid>

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Site

                            </Typography>

                            <Typography>

                                {

                                    audit.site?.name ||

                                    "-"

                                }

                            </Typography>

                        </Grid>

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Site Code

                            </Typography>

                            <Typography>

                                {

                                    audit.site?.siteCode ||

                                    "-"

                                }

                            </Typography>

                        </Grid>

                    </Grid>

                    <Divider />

                    <Grid

                        container

                        spacing={3}

                    >

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Module

                            </Typography>

                            <Chip

                                label={audit.module}

                                color="primary"

                            />

                        </Grid>

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                Action

                            </Typography>

                            <Chip

                                label={audit.action}

                                color="secondary"

                            />

                        </Grid>

                    </Grid>

                    <Divider />

                    <Typography

                        variant="subtitle2"

                    >

                        Description

                    </Typography>

                    <Typography>

                        {

                            audit.description ||

                            "-"

                        }

                    </Typography>

                    <Divider />

                    <Grid

                        container

                        spacing={3}

                    >

                        <Grid size={{ xs:12, md:6 }}>

                            <Typography

                                variant="subtitle2"

                            >

                                IP Address

                            </Typography>

                            <Typography>

                                {

                                    audit.ipAddress ||

                                    "-"

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

                                    audit.createdAt

                                        ? new Date(

                                            audit.createdAt

                                        ).toLocaleString()

                                        : "-"

                                }

                            </Typography>

                        </Grid>

                    </Grid>

                    <Divider />

                    <Typography

                        variant="subtitle2"

                    >

                        User Agent

                    </Typography>

                    <Paper

                        variant="outlined"

                        sx={{

                            p:2,

                            bgcolor:"grey.50"

                        }}

                    >

                        <Typography

                            variant="body2"

                            sx={{

                                wordBreak:"break-word"

                            }}

                        >

                            {

                                audit.userAgent ||

                                "-"

                            }

                        </Typography>

                    </Paper>

                    <Divider />

                    <Typography

                        variant="subtitle2"

                    >

                        Metadata

                    </Typography>

                    <Paper

                        variant="outlined"

                        sx={{

                            p:2,

                            bgcolor:"grey.50"

                        }}

                    >

                        <pre

                            style={{

                                margin:0,

                                whiteSpace:"pre-wrap",

                                wordBreak:"break-word"

                            }}

                        >

                            {

                                JSON.stringify(

                                    audit.metadata ||

                                    {},

                                    null,

                                    2

                                )

                            }

                        </pre>

                    </Paper>

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