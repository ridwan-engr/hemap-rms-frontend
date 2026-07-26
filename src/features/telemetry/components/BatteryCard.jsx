import {
    Card,
    CardContent,
    Divider,
    Grid,
    LinearProgress,
    Stack,
    Typography,
    Chip,
    CircularProgress
} from "@mui/material";

import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import BatteryAlertIcon from "@mui/icons-material/BatteryAlert";

import useTelemetry from "../hooks/useTelemetry";

/*
|--------------------------------------------------------------------------
| Metric Row
|--------------------------------------------------------------------------
*/

function Metric({

    label,

    value,

    unit = ""

}) {

    return (

        <Stack
            direction="row"
            justifyContent="space-between"
        >

            <Typography
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                fontWeight={600}
            >
                {value ?? "--"} {unit}
            </Typography>

        </Stack>

    );

}

/*
|--------------------------------------------------------------------------
| Battery Card
|--------------------------------------------------------------------------
*/

export default function BatteryCard({

    siteId

}) {

    const {

        telemetry,

        loading

    } = useTelemetry({

        siteId

    });

    if (loading) {

        return (

            <Card>

                <CardContent>

                    <Stack
                        py={5}
                        alignItems="center"
                    >

                        <CircularProgress />

                    </Stack>

                </CardContent>

            </Card>

        );

    }

    const battery = telemetry?.battery || {};

    const soc = battery.soc ?? 0;

    const status = battery.status || "UNKNOWN";

    return (

        <Card>

            <CardContent>

                <Stack

                    direction="row"

                    justifyContent="space-between"

                    alignItems="center"

                >

                    <Typography

                        variant="h6"

                        fontWeight={700}

                    >

                        Battery Bank

                    </Typography>

                    {

                        status === "CHARGING"

                        ?

                        <BatteryChargingFullIcon
                            color="success"
                        />

                        :

                        <BatteryAlertIcon
                            color="warning"
                        />

                    }

                </Stack>

                <Divider sx={{ my:2 }}/>

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    State of Charge

                </Typography>

                <Typography

                    variant="h3"

                    fontWeight={700}

                    mb={1}

                >

                    {soc}%

                </Typography>

                <LinearProgress

                    variant="determinate"

                    value={soc}

                    color={

                        soc > 60

                        ? "success"

                        : soc > 30

                        ? "warning"

                        : "error"

                    }

                />

                <Divider sx={{ my:2 }}/>

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{xs:12,md:6}}>

                        <Metric

                            label="SOH"

                            value={battery.soh}

                            unit="%"

                        />

                    </Grid>

                    <Grid size={{xs:12,md:6}}>

                        <Metric

                            label="Voltage"

                            value={battery.voltage}

                            unit="V"

                        />

                    </Grid>

                    <Grid size={{xs:12,md:6}}>

                        <Metric

                            label="Current"

                            value={battery.current}

                            unit="A"

                        />

                    </Grid>

                    <Grid size={{xs:12,md:6}}>

                        <Metric

                            label="Power"

                            value={battery.power}

                            unit="kW"

                        />

                    </Grid>

                    <Grid size={{xs:12,md:6}}>

                        <Metric

                            label="Temperature"

                            value={battery.temperature}

                            unit="°C"

                        />

                    </Grid>

                    <Grid size={{xs:12,md:6}}>

                        <Metric

                            label="Cycles"

                            value={battery.cycles}

                        />

                    </Grid>

                    <Grid size={{xs:12,md:6}}>

                        <Metric

                            label="Remaining Time"

                            value={battery.remainingTime}

                        />

                    </Grid>

                    <Grid size={{xs:12,md:6}}>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                        >

                            <Typography
                                color="text.secondary"
                            >

                                Status

                            </Typography>

                            <Chip

                                label={status}

                                color={

                                    status==="CHARGING"

                                    ? "success"

                                    : status==="DISCHARGING"

                                    ? "warning"

                                    : "default"

                                }

                                size="small"

                            />

                        </Stack>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}