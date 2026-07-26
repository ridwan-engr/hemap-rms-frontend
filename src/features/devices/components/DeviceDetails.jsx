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

import useDevice from "../hooks/useDevice";

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

                {value ?? "-"}

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

            label={status || "Unknown"}

            color={color}

            size="small"

        />

    );

}

/*
|--------------------------------------------------------------------------
| Device Details
|--------------------------------------------------------------------------
*/

export default function DeviceDetails() {

    const {

        selectedDevice

    } = useDevice();

    if (!selectedDevice) {

        return (

            <Card>

                <CardContent>

                    <Typography

                        color="text.secondary"

                    >

                        Select a device from the table to view its details.

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

                        Device Details

                    </Typography>

                    <StatusChip

                        status={selectedDevice.status}

                    />

                </Stack>

                <Divider sx={{ mb: 3 }} />

                <Grid

                    container

                    spacing={3}

                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Device ID"

                            value={selectedDevice.deviceId}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Device Name"

                            value={selectedDevice.name}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Manufacturer"

                            value={selectedDevice.manufacturer}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Model"

                            value={selectedDevice.model}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Type"

                            value={selectedDevice.type}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Serial Number"

                            value={selectedDevice.serialNumber}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Firmware"

                            value={selectedDevice.firmwareVersion}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Communication"

                            value={selectedDevice.communication}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Site"

                            value={selectedDevice.siteName}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Last Seen"

                            value={selectedDevice.lastSeen}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Installation Date"

                            value={selectedDevice.installationDate}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <DetailItem

                            label="Status"

                            value={selectedDevice.status}

                        />

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}