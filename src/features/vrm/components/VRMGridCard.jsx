import {
    Card,
    CardContent,
    Stack,
    Typography
} from "@mui/material";

import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

/**
 * ============================================================================
 * VRM Grid Card
 * ============================================================================
 *
 * Displays normalized utility/grid power.
 *
 * Expected prop:
 *
 * {
 *     power: number | null
 * }
 *
 * ============================================================================
 */

export default function VRMGridCard({
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

                    {/* Header */}

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

                            <ElectricBoltIcon
                                color="primary"
                            />

                            <Typography
                                variant="subtitle1"
                                fontWeight={700}
                            >
                                Grid
                            </Typography>

                        </Stack>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            AC
                        </Typography>

                    </Stack>

                    {/* Power */}

                    <Stack spacing={0.25}>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            Grid Power
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={700}
                        >
                            {formatPower(power)}
                        </Typography>

                    </Stack>

                    {/* Description */}

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Current utility/grid contribution
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