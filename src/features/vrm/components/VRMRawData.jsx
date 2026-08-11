import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Typography
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DataObjectIcon from "@mui/icons-material/DataObject";

/**
 * ============================================================================
 * VRM Raw Data
 * ============================================================================
 *
 * Displays normalized/raw VRM data for diagnostics and development.
 *
 * Responsibilities:
 * - Display dashboard diagnostic data.
 * - Display statistics diagnostic data.
 * - Safely serialize complex response objects.
 *
 * This component:
 * - does NOT call Axios.
 * - does NOT access Redux.
 * - does NOT call useVRM().
 * - does NOT normalize VRM data.
 * - does NOT calculate telemetry.
 *
 * ============================================================================
 */

export default function VRMRawData({
    dashboard = null,
    statistics = null
}) {

    const hasDashboard =
        dashboard !== null &&
        dashboard !== undefined;

    const hasStatistics =
        statistics !== null &&
        statistics !== undefined;

    /*
    |--------------------------------------------------------------------------
    | Prefer explicitly supplied raw payload where available.
    |--------------------------------------------------------------------------
    */

    const dashboardRaw =
        dashboard?.raw ??
        dashboard;

    const statisticsRaw =
        statistics?.raw ??
        statistics;

    return (
        <Card>

            <CardContent>

                <Stack spacing={2}>

                    {/* ======================================================
                        Header
                    ====================================================== */}

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={1.5}
                        sx={{
                            justifyContent: "space-between",
                            alignItems: {
                                xs: "flex-start",
                                sm: "center"
                            }
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignItems: "center"
                            }}
                        >

                            <DataObjectIcon
                                color="primary"
                            />

                            <Box>

                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                >
                                    VRM Raw Data
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Diagnostic view of the VRM
                                    responses received by HEMAP-RMS.
                                </Typography>

                            </Box>

                        </Stack>

                        <Chip
                            label="Diagnostics"
                            size="small"
                            variant="outlined"
                        />

                    </Stack>

                    <Divider />

                    {/* ======================================================
                        Dashboard
                    ====================================================== */}

                    <DataSection
                        title="Dashboard"
                        data={dashboardRaw}
                        available={hasDashboard}
                        defaultExpanded={hasDashboard}
                    />

                    {/* ======================================================
                        Statistics
                    ====================================================== */}

                    <DataSection
                        title="Statistics"
                        data={statisticsRaw}
                        available={hasStatistics}
                        defaultExpanded={false}
                    />

                </Stack>

            </CardContent>

        </Card>
    );
}


/**
 * ============================================================================
 * Data Section
 * ============================================================================
 */

function DataSection({
    title,
    data,
    available,
    defaultExpanded = false
}) {

    return (
        <Accordion
            disableGutters
            defaultExpanded={defaultExpanded}
            elevation={0}
            sx={{
                border: theme =>
                    `1px solid ${theme.palette.divider}`,

                borderRadius: 1,

                "&:before": {
                    display: "none"
                },

                "&:first-of-type": {
                    borderRadius: 1
                },

                "&:last-of-type": {
                    borderRadius: 1
                }
            }}
        >

            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon />
                }
            >

                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        alignItems: "center"
                    }}
                >

                    <Typography
                        fontWeight={700}
                    >
                        {title}
                    </Typography>

                    <Chip
                        label={
                            available
                                ? "Available"
                                : "No data"
                        }
                        size="small"
                        color={
                            available
                                ? "success"
                                : "default"
                        }
                        variant="outlined"
                    />

                </Stack>

            </AccordionSummary>

            <AccordionDetails>

                {!available ? (

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        No {title.toLowerCase()} data
                        is currently available.
                    </Typography>

                ) : (

                    <JsonViewer
                        data={data}
                    />

                )}

            </AccordionDetails>

        </Accordion>
    );
}


/**
 * ============================================================================
 * JSON Viewer
 * ============================================================================
 */

function JsonViewer({
    data
}) {

    if (
        data === null ||
        data === undefined
    ) {

        return (
            <Typography
                variant="body2"
                color="text.secondary"
            >
                No data available.
            </Typography>
        );
    }

    if (
        typeof data !== "object"
    ) {

        return (
            <ValueDisplay
                value={data}
            />
        );
    }

    return (
        <Box
            component="pre"
            sx={{
                m: 0,
                p: 2,

                width: "100%",

                maxHeight: 600,

                overflow: "auto",

                borderRadius: 1,

                bgcolor:
                    "background.default",

                border: theme =>
                    `1px solid ${theme.palette.divider}`,

                fontFamily:
                    '"Roboto Mono", "Courier New", monospace',

                fontSize: "0.78rem",

                lineHeight: 1.6,

                whiteSpace: "pre-wrap",

                wordBreak: "break-word"
            }}
        >
            {safeJSONStringify(data)}
        </Box>
    );
}


/**
 * ============================================================================
 * Primitive Value Display
 * ============================================================================
 */

function ValueDisplay({
    value
}) {

    if (
        value === null ||
        value === undefined
    ) {

        return (
            <Typography
                variant="body2"
                color="text.secondary"
            >
                —
            </Typography>
        );
    }

    if (
        typeof value === "boolean"
    ) {

        return (
            <Chip
                label={
                    value
                        ? "true"
                        : "false"
                }
                size="small"
                color={
                    value
                        ? "success"
                        : "default"
                }
                variant="outlined"
            />
        );
    }

    return (
        <Typography
            variant="body2"
        >
            {String(value)}
        </Typography>
    );
}


/**
 * ============================================================================
 * Safe JSON Stringify
 * ============================================================================
 */

function safeJSONStringify(
    value
) {

    try {

        return JSON.stringify(
            value,
            createJSONReplacer(),
            2
        );

    } catch (error) {

        console.error(
            "VRMRawData: unable to serialize data:",
            error
        );

        return String(value);
    }
}


/**
 * ============================================================================
 * JSON Replacer
 * ============================================================================
 */

function createJSONReplacer() {

    return function replacer(
        key,
        value
    ) {

        /*
        |--------------------------------------------------------------------------
        | Undefined
        |--------------------------------------------------------------------------
        */

        if (
            typeof value === "undefined"
        ) {

            return null;
        }

        /*
        |--------------------------------------------------------------------------
        | Functions
        |--------------------------------------------------------------------------
        */

        if (
            typeof value === "function"
        ) {

            return "[Function]";
        }

        /*
        |--------------------------------------------------------------------------
        | Symbols
        |--------------------------------------------------------------------------
        */

        if (
            typeof value === "symbol"
        ) {

            return value.toString();
        }

        return value;
    };
}