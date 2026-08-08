import {
    Grid,
    Paper,
    Stack,
    Typography,
    Divider,
    Box
} from "@mui/material";

import useDashboard from "../hooks/useDashboard";

const telemetryItems = [

    {
        key: "solarPower",
        label: "Solar Power",
        unit: "W"
    },

    {
        key: "loadPower",
        label: "Load Power",
        unit: "W"
    },

    {
        key: "batterySOC",
        label: "Battery SOC",
        unit: "%"
    },

    {
        key: "batteryVoltage",
        label: "Battery Voltage",
        unit: "V"
    },

    {
        key: "batteryCurrent",
        label: "Battery Current",
        unit: "A"
    },

    {
        key: "batteryPower",
        label: "Battery Power",
        unit: "W"
    },

    {
        key: "gridPower",
        label: "Grid Power",
        unit: "W"
    },

    {
        key: "generatorPower",
        label: "Generator Power",
        unit: "W"
    },

    {
        key: "inverterPower",
        label: "Inverter Power",
        unit: "W"
    },

    {
        key: "frequency",
        label: "Frequency",
        unit: "Hz"
    },

    {
        key: "temperature",
        label: "Temperature",
        unit: "°C"
    }

];

export default function DashboardTelemetry() {

    const {

        dashboard,

        loading

    } = useDashboard();

    const telemetry =
        dashboard?.telemetry ?? {};

    return (

        <Paper
            elevation={1}
            sx={{
                p: 3,
                borderRadius: 3
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >

                Live Telemetry

            </Typography>

            <Grid
                container
                spacing={2}
            >

                {

                    telemetryItems.map((item) => (

                        <Grid
                            key={item.key}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <TelemetryCard

                                label={item.label}

                                value={
                                    loading
                                        ? "--"
                                        : telemetry?.[item.key] ?? 0
                                }

                                unit={item.unit}

                            />

                        </Grid>

                    ))

                }

            </Grid>

        </Paper>

    );

}

function TelemetryCard({

    label,

    value,

    unit

}) {

    return (

        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 2,
                height: "100%"
            }}
        >

            <Stack spacing={1}>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >

                    {label}

                </Typography>

                <Divider />

                <Typography
                    variant="h5"
                    fontWeight={700}
                >

                    {value}

                    <Box
                        component="span"
                        sx={{
                            ml: 1,
                            fontSize: 15,
                            color: "text.secondary"
                        }}
                    >

                        {unit}

                    </Box>

                </Typography>

            </Stack>

        </Paper>

    );

}