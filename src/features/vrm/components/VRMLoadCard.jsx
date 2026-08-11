import {
    Card,
    CardContent,
    Stack,
    Typography
} from "@mui/material";

import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

/**
 * ============================================================================
 * HEMAP RMS
 * VRM Load Card
 * ============================================================================
 *
 * Displays normalized site/load consumption.
 *
 * Expected prop:
 *
 * {
 *     power: number | null
 * }
 *
 * ============================================================================
 */

export default function VRMLoadCard({
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
                        spacing={1}
                        sx={{
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                alignItems: "center"
                            }}
                        >

                            <ElectricBoltIcon
                                color="error"
                            />

                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                            >
                                Load
                            </Typography>

                        </Stack>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            SITE
                        </Typography>

                    </Stack>

                    {/* ------------------------------------------------------
                        Power Value
                    ------------------------------------------------------ */}

                    <Stack spacing={0.25}>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Current Load
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
                        Current site consumption
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

    /*
     * Numeric value
     */

    if (
        typeof value === "number" &&
        Number.isFinite(value)
    ) {

        return `${value.toLocaleString(
            undefined,
            {
                maximumFractionDigits: 2
            }
        )} kW`;
    }

    /*
     * Numeric string
     *
     * Example:
     * "12.456" → "12.46 kW"
     */

    if (
        typeof value === "string" &&
        value.trim() !== ""
    ) {

        const numericValue =
            Number(value);

        if (
            Number.isFinite(
                numericValue
            )
        ) {

            return `${numericValue.toLocaleString(
                undefined,
                {
                    maximumFractionDigits: 2
                }
            )} kW`;
        }
    }

    /*
     * Fallback
     */

    return `${String(value)} kW`;
}