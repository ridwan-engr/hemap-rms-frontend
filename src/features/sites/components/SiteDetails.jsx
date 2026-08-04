import {

    Card,
    CardContent,
    Typography,
    Grid,
    Divider,
    Stack,
    Chip,
    Box

} from "@mui/material";

import useSite from "../hooks/useSite.js";

/*
|--------------------------------------------------------------------------
| Detail Item
|--------------------------------------------------------------------------
*/

function DetailItem({

    label,

    value

}) {

    return (

        <Box>

            <Typography

                variant="caption"

                color="text.secondary"

            >

                {label}

            </Typography>

            <Typography

                variant="body1"

                fontWeight={500}

            >

                {

                    value ||

                    "-"

                }

            </Typography>

        </Box>

    );

}

/*
|--------------------------------------------------------------------------
| Status Chip
|--------------------------------------------------------------------------
*/

function StatusChip({

    status

}) {

    let color = "default";

    switch (

        status?.toLowerCase()

    ) {

        case "healthy":

        case "online":

            color = "success";

            break;

        case "warning":

            color = "warning";

            break;

        case "critical":

        case "offline":

            color = "error";

            break;

        default:

            color = "default";

    }

    return (

        <Chip

            label={

                status ||

                "Unknown"

            }

            color={color}

            size="small"

        />

    );

}

/*
|--------------------------------------------------------------------------
| Site Details
|--------------------------------------------------------------------------
*/

export default function SiteDetails() {

    const {

        selectedSite

    } = useSite();

    if (

        !selectedSite

    ) {

        return (

            <Card>

                <CardContent>

                    <Typography

                        color="text.secondary"

                    >

                        Select a site from the table to view its details.

                    </Typography>

                </CardContent>

            </Card>

        );

    }

    return (

        <Card>

            <CardContent>

                <Stack

                    direction="row"

                    justifyContent="space-between"

                    alignItems="center"

                    sx={{ mb: 2 }}

                >

                    <Typography

                        variant="h6"

                        fontWeight={700}

                    >

                        Site Details

                    </Typography>

                    <StatusChip

                        status={selectedSite.status}

                    />

                </Stack>

                <Divider sx={{ mb: 3 }} />

                <Grid

                    container

                    spacing={3}

                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Site Code"

                            value={selectedSite.siteCode}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Site Name"

                            value={selectedSite.siteName}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="State"

                            value={selectedSite.state}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Technology"

                            value={selectedSite.technology}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Power Source"

                            value={selectedSite.powerSource}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Latitude"

                            value={selectedSite.latitude}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Longitude"

                            value={selectedSite.longitude}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Status"

                            value={selectedSite.status}

                        />

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}