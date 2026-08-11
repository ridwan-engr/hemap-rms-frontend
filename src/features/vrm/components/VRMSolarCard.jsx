import {
    Card,
    CardContent,
    Stack,
    Typography
} from "@mui/material";

import SolarPowerIcon from "@mui/icons-material/SolarPower";

/**
 * ============================================================================
 * HEMAP RMS
 * VRM Solar Card
 * ============================================================================
 *
 * Displays normalized solar/PV generation telemetry.
 *
 * Expected prop:
 *
 * {
 *     power: number | string | null
 * }
 *
 * Responsibilities:
 *
 * - Display normalized solar generation.
 * - Perform presentation-only formatting.
 * - Does NOT call Axios.
 * - Does NOT access Redux.
 * - Does NOT call useVRM().
 * - Does NOT inspect raw VRM API structures.
 *
 * ============================================================================
 */

export default function VRMSolarCard({
    power = null
}) {

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

                            <SolarPowerIcon
                                color="success"
                            />

                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                            >
                                Solar
                            </Typography>

                        </Stack>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            PV
                        </Typography>

                    </Stack>


                    {/* ------------------------------------------------------
                        Power
                    ------------------------------------------------------ */}

                    <Stack spacing={0.25}>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Solar Generation
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {formatPower(power)}
                        </Typography>

                    </Stack>


                    {/* ------------------------------------------------------
                        Description
                    ------------------------------------------------------ */}

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Current photovoltaic generation
                    </Typography>

                </Stack>

            </CardContent>

        </Card>
    );
}


/**
 * ============================================================================
 * Power Formatter
 * ============================================================================
 */

function formatPower(value) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "—";
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
        return "—";
    }

    return `${numericValue.toLocaleString(
        undefined,
        {
            maximumFractionDigits: 2
        }
    )} kW`;
}