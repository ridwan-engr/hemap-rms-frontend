import {
    Card,
    CardContent,
    LinearProgress,
    Stack,
    Typography
} from "@mui/material";

import BatteryChargingFullIcon
    from "@mui/icons-material/BatteryChargingFull";

/**
 * ============================================================================
 * HEMAP RMS
 * VRM Battery Card
 * ============================================================================
 *
 * Displays normalized battery telemetry.
 *
 * Expected props:
 *
 * {
 *     power: number | null,
 *     soc: number | null
 * }
 *
 * Data flow:
 *
 * normalizeVRM.js
 *       ↓
 * useVRM()
 *       ↓
 * VRMInstallationPage
 *       ↓
 * VRMLiveDashboard
 *       ↓
 * VRMBatteryCard
 *
 * This component:
 * - does NOT call Axios
 * - does NOT access Redux
 * - does NOT call useVRM()
 * - does NOT parse raw VRM attributes
 *
 * ============================================================================
 */

export default function VRMBatteryCard({
    power = null,
    soc = null
}) {

    /*
    |--------------------------------------------------------------------------
    | Validate SOC
    |--------------------------------------------------------------------------
    */

    const hasSoc =
        typeof soc === "number" &&
        Number.isFinite(soc);

    /*
    |--------------------------------------------------------------------------
    | Validate Battery Power
    |--------------------------------------------------------------------------
    */

    const hasPower =
        typeof power === "number" &&
        Number.isFinite(power);

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <Card
            sx={{
                height: "100%"
            }}
        >

            <CardContent>

                <Stack spacing={2}>

                    {/* ------------------------------------------------------
                        Header
                    ------------------------------------------------------ */}

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                        >

                            <BatteryChargingFullIcon
                                color="primary"
                            />

                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                            >
                                Battery
                            </Typography>

                        </Stack>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {hasSoc
                                ? `${formatNumber(soc)}%`
                                : "—"}
                        </Typography>

                    </Stack>


                    {/* ------------------------------------------------------
                        State of Charge
                    ------------------------------------------------------ */}

                    <Stack spacing={0.5}>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            State of Charge
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {hasSoc
                                ? `${formatNumber(soc)}%`
                                : "—"}
                        </Typography>

                    </Stack>


                    {/* ------------------------------------------------------
                        SOC Progress
                    ------------------------------------------------------ */}

                    <LinearProgress
                        variant={
                            hasSoc
                                ? "determinate"
                                : "indeterminate"
                        }
                        value={
                            hasSoc
                                ? clamp(
                                    soc,
                                    0,
                                    100
                                )
                                : undefined
                        }
                        sx={{
                            height: 8,
                            borderRadius: 4
                        }}
                    />


                    {/* ------------------------------------------------------
                        Battery Power
                    ------------------------------------------------------ */}

                    <Stack spacing={0.25}>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Battery Power
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight={600}
                        >
                            {hasPower
                                ? `${formatNumber(power)} kW`
                                : "—"}
                        </Typography>

                    </Stack>

                </Stack>

            </CardContent>

        </Card>

    );
}


/**
 * ============================================================================
 * Number Formatter
 * ============================================================================
 */

function formatNumber(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "—";
    }

    if (
        typeof value !== "number" ||
        !Number.isFinite(value)
    ) {
        return String(value);
    }

    return value.toLocaleString(
        undefined,
        {
            maximumFractionDigits: 2
        }
    );
}


/**
 * ============================================================================
 * Clamp
 * ============================================================================
 */

function clamp(
    value,
    min,
    max
) {

    return Math.min(
        Math.max(value, min),
        max
    );
}