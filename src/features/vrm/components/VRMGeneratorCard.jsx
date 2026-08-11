import {
    Card,
    CardContent,
    Stack,
    Typography
} from "@mui/material";

import PowerIcon from "@mui/icons-material/Power";

/**
 * ============================================================================
 * VRM Generator Card
 * ============================================================================
 *
 * Displays normalized generator/genset power.
 *
 * Expected prop:
 *
 * {
 *     power: number | null
 * }
 *
 * ============================================================================
 */

export default function VRMGeneratorCard({
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

                    {/* -----------------------------------------------------------------
                        Header
                    ------------------------------------------------------------------ */}

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

                            <PowerIcon
                                color="warning"
                            />

                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                            >
                                Generator
                            </Typography>

                        </Stack>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            GENSET
                        </Typography>

                    </Stack>

                    {/* -----------------------------------------------------------------
                        Generator Power
                    ------------------------------------------------------------------ */}

                    <Stack spacing={0.25}>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Generator Power
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {formatPower(power)}
                        </Typography>

                    </Stack>

                    {/* -----------------------------------------------------------------
                        Description
                    ------------------------------------------------------------------ */}

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Current generator output
                    </Typography>

                </Stack>

            </CardContent>

        </Card>
    );
}

/**
 * ============================================================================
 * Format Power
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

    if (typeof value === "number") {

        return `${value.toLocaleString(
            undefined,
            {
                maximumFractionDigits: 2
            }
        )} kW`;

    }

    return `${value} kW`;
}