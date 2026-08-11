import {
    Box,
    Card,
    CardContent,
    Divider,
    Grid,
    Link,
    Stack,
    Typography
} from "@mui/material";

/**
 * ============================================================================
 * HEMAP RMS
 * VRM Installation Identity
 * ============================================================================
 *
 * Displays identity/configuration information for the active VRM installation.
 *
 * Data flow:
 *
 * normalizeVRM.js
 *      ↓
 * vrmSlice
 *      ↓
 * useVRM()
 *      ↓
 * VRMInstallationPage
 *      ↓
 * VRMInstallationIdentity
 *
 * This component:
 *
 * - does NOT call Axios
 * - does NOT access Redux
 * - does NOT call useVRM()
 * - does NOT inspect raw VRM API structures
 *
 * ============================================================================
 */

export default function VRMInstallationIdentity({
    installation = {},
    dashboard = {}
}) {

    const identity = {
        installationId:
            installation?.installationId ??
            dashboard?.installationId,

        name:
            installation?.name ??
            installation?.installationName ??
            dashboard?.name,

        identifier:
            installation?.identifier ??
            dashboard?.identifier,

        systemType:
            installation?.systemType ??
            dashboard?.systemType,

        firmwareVersion:
            installation?.firmwareVersion ??
            dashboard?.firmwareVersion,

        timezone:
            installation?.timezone ??
            dashboard?.timezone ??
            "Africa/Lagos",

        vrmUrl:
            installation?.vrmUrl ??
            dashboard?.vrmUrl,

        location:
            installation?.location ??
            dashboard?.location
    };

    return (
        <Card>
            <CardContent>

                <Stack spacing={2}>

                    {/* ------------------------------------------------------
                        Header
                    ------------------------------------------------------ */}

                    <BoxHeader />

                    <Divider />

                    {/* ------------------------------------------------------
                        Identity Information
                    ------------------------------------------------------ */}

                    <Grid
                        container
                        spacing={2}
                    >

                        <InfoItem
                            label="Installation ID"
                            value={
                                identity.installationId
                            }
                        />

                        <InfoItem
                            label="Installation Name"
                            value={
                                identity.name
                            }
                        />

                        <InfoItem
                            label="Identifier"
                            value={
                                identity.identifier
                            }
                        />

                        <InfoItem
                            label="System Type"
                            value={
                                identity.systemType
                            }
                        />

                        <InfoItem
                            label="Firmware Version"
                            value={
                                identity.firmwareVersion
                            }
                        />

                        <InfoItem
                            label="Timezone"
                            value={
                                identity.timezone
                            }
                        />

                        <InfoItem
                            label="Location"
                            value={
                                formatLocation(
                                    identity.location
                                )
                            }
                        />

                        <InfoItem
                            label="VRM Portal"
                            value={
                                identity.vrmUrl
                            }
                            link={
                                isValidUrl(
                                    identity.vrmUrl
                                )
                            }
                        />

                    </Grid>

                </Stack>

            </CardContent>
        </Card>
    );
}

/**
 * ============================================================================
 * Section Header
 * ============================================================================
 */

function BoxHeader() {

    return (
        <Stack spacing={0.5}>

            <Typography
                variant="h6"
                fontWeight={700}
            >
                Installation Identity
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
            >
                Victron VRM installation information
                currently connected to HEMAP-RMS.
            </Typography>

        </Stack>
    );
}

/**
 * ============================================================================
 * Information Item
 * ============================================================================
 */

function InfoItem({
    label,
    value,
    link = false
}) {

    return (
        <Grid
            size={{
                xs: 12,
                sm: 6,
                md: 4
            }}
        >

            <Stack spacing={0.25}>

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {label}
                </Typography>

                {link && value ? (

                    <Link
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        sx={{
                            fontWeight: 600,
                            wordBreak: "break-word"
                        }}
                    >
                        {value}
                    </Link>

                ) : (

                    <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{
                            wordBreak: "break-word"
                        }}
                    >
                        {formatValue(value)}
                    </Typography>

                )}

            </Stack>

        </Grid>
    );
}

/**
 * ============================================================================
 * Location Formatter
 * ============================================================================
 */

function formatLocation(
    location
) {

    if (!location) {
        return "—";
    }

    if (
        typeof location === "string"
    ) {
        return location;
    }

    if (
        typeof location !== "object"
    ) {
        return String(location);
    }

    const parts = [

        location.address,

        location.city,

        location.state,

        location.country

    ].filter(Boolean);

    if (
        parts.length > 0
    ) {

        return parts.join(", ");
    }

    if (
        location.latitude !== undefined &&
        location.longitude !== undefined
    ) {

        return `${location.latitude}, ${location.longitude}`;
    }

    return "—";
}

/**
 * ============================================================================
 * Value Formatter
 * ============================================================================
 */

function formatValue(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "—";
    }

    if (
        typeof value === "object"
    ) {

        try {

            return JSON.stringify(
                value
            );

        } catch {

            return "—";
        }
    }

    return String(value);
}

/**
 * ============================================================================
 * URL Validator
 * ============================================================================
 */

function isValidUrl(
    value
) {

    if (
        typeof value !== "string" ||
        !value.trim()
    ) {

        return false;
    }

    try {

        const url =
            new URL(value);

        return (
            url.protocol === "http:" ||
            url.protocol === "https:"
        );

    } catch {

        return false;
    }
}