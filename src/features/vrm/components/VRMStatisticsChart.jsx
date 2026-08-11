import {
    Card,
    CardContent,
    Divider,
    Stack,
    Typography
} from "@mui/material";

/**
 * ============================================================================
 * HEMAP RMS
 * VRM Statistics
 * ============================================================================
 *
 * Displays historical VRM statistics without assigning semantic meaning
 * to individual statistics columns.
 *
 * Data flow:
 *
 * VRM API
 *     ↓
 * VRM service
 *     ↓
 * normalizeVRM()
 *     ↓
 * vrmSlice
 *     ↓
 * useVRM()
 *     ↓
 * VRMStatisticsChart
 *
 * IMPORTANT:
 *
 * normalizeVRM.js deliberately does not infer semantic meaning from
 * statistics columns.
 *
 * Therefore this component does NOT assume:
 *
 *     column 1 = SOC
 *     column 2 = voltage
 *     column 3 = current
 *     etc.
 *
 * Instead, it displays the selected series generically.
 *
 * ============================================================================
 */

export default function VRMStatisticsChart({
    statistics = null,
    code = null
}) {

    /*
    |--------------------------------------------------------------------------
    | No Statistics
    |--------------------------------------------------------------------------
    */

    if (
        !statistics ||
        typeof statistics !== "object"
    ) {

        return (
            <Card>

                <CardContent>

                    <StatisticsHeader />

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 1
                        }}
                    >
                        No historical statistics are
                        currently available.
                    </Typography>

                </CardContent>

            </Card>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Records
    |--------------------------------------------------------------------------
    */

    const records =
        statistics?.records &&
        typeof statistics.records === "object"
            ? statistics.records
            : {};


    /*
    |--------------------------------------------------------------------------
    | Available Series
    |--------------------------------------------------------------------------
    */

    const availableCodes =
        Object.keys(records);


    /*
    |--------------------------------------------------------------------------
    | Selected Series
    |--------------------------------------------------------------------------
    |
    | If the parent supplies a code, use it.
    |
    | Otherwise use the first available statistics
    | series.
    |
    */

    const selectedCode =
        code &&
        Object.prototype.hasOwnProperty.call(
            records,
            code
        )
            ? code
            : (
                availableCodes[0] ??
                null
            );


    /*
    |--------------------------------------------------------------------------
    | Selected Series Data
    |--------------------------------------------------------------------------
    */

    const series =
        selectedCode &&
        Array.isArray(
            records[selectedCode]
        )
            ? records[selectedCode]
            : [];


    return (
        <Card>

            <CardContent>

                <Stack spacing={2}>

                    {/* ------------------------------------------------------
                        Header
                    ------------------------------------------------------ */}

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={1}
                        justifyContent="space-between"
                        alignItems={{
                            xs: "flex-start",
                            sm: "center"
                        }}
                    >

                        <StatisticsHeader />

                        {selectedCode && (

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Series:{" "}
                                <strong>
                                    {selectedCode}
                                </strong>
                            </Typography>

                        )}

                    </Stack>


                    <Divider />


                    {/* ------------------------------------------------------
                        No Series
                    ------------------------------------------------------ */}

                    {!selectedCode ? (

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            No statistics series are
                            available.
                        </Typography>

                    ) : (

                        <StatisticsTable
                            series={series}
                        />

                    )}

                </Stack>

            </CardContent>

        </Card>
    );
}


/**
 * ============================================================================
 * Statistics Header
 * ============================================================================
 */

function StatisticsHeader() {

    return (
        <Stack spacing={0.5}>

            <Typography
                variant="h6"
                fontWeight={700}
            >
                VRM Statistics
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
            >
                Historical telemetry series
                returned by Victron VRM.
            </Typography>

        </Stack>
    );
}


/**
 * ============================================================================
 * Statistics Table
 * ============================================================================
 *
 * Deliberately generic.
 *
 * No semantic interpretation is performed on
 * the values array.
 *
 * ============================================================================
 */

function StatisticsTable({
    series = []
}) {

    if (
        !Array.isArray(series) ||
        series.length === 0
    ) {

        return (
            <Typography
                variant="body2"
                color="text.secondary"
            >
                No records are available for this
                statistics series.
            </Typography>
        );
    }


    const visibleRecords =
        series.slice(-10);


    return (
        <Stack spacing={1}>

            {visibleRecords.map(
                (
                    record,
                    index
                ) => {

                    const timestamp =
                        record?.timestamp ??
                        record?.time ??
                        null;

                    const values =
                        Array.isArray(
                            record?.values
                        )
                            ? record.values
                            : [];


                    return (
                        <Stack
                            key={
                                `${timestamp ?? "record"}-${index}`
                            }
                            direction={{
                                xs: "column",
                                sm: "row"
                            }}
                            spacing={1}
                            justifyContent="space-between"
                            sx={{
                                p: 1.25,
                                borderRadius: 1,
                                bgcolor:
                                    "background.default"
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {formatTimestamp(
                                    timestamp
                                )}
                            </Typography>

                            <Typography
                                variant="body2"
                                fontFamily="monospace"
                                sx={{
                                    wordBreak:
                                        "break-word"
                                }}
                            >
                                {formatValues(
                                    values
                                )}
                            </Typography>

                        </Stack>
                    );
                }
            )}


            {/* --------------------------------------------------------------
                Record Count
            -------------------------------------------------------------- */}

            {series.length > 10 && (

                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    Showing the latest 10 records
                    of{" "}
                    {series.length.toLocaleString()}.
                </Typography>

            )}

        </Stack>
    );
}


/**
 * ============================================================================
 * Timestamp Formatter
 * ============================================================================
 */

function formatTimestamp(timestamp) {

    if (
        timestamp === null ||
        timestamp === undefined ||
        timestamp === ""
    ) {
        return "—";
    }


    const date =
        timestamp instanceof Date
            ? timestamp
            : new Date(timestamp);


    if (
        !Number.isNaN(
            date.getTime()
        )
    ) {

        return date.toLocaleString();

    }


    return String(timestamp);
}


/**
 * ============================================================================
 * Values Formatter
 * ============================================================================
 */

function formatValues(values) {

    if (
        !Array.isArray(values) ||
        values.length === 0
    ) {
        return "—";
    }


    return values
        .map(value => {

            if (
                value === null ||
                value === undefined ||
                value === ""
            ) {
                return "—";
            }


            const numericValue =
                Number(value);


            if (
                typeof value === "number" ||
                (
                    typeof value === "string" &&
                    value.trim() !== "" &&
                    Number.isFinite(numericValue)
                )
            ) {

                return numericValue.toLocaleString(
                    undefined,
                    {
                        maximumFractionDigits: 2
                    }
                );

            }


            return String(value);

        })
        .join("  |  ");
}