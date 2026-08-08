import { Container, Grid, Stack } from "@mui/material";

import useTelemetry from "../hooks/useTelemetry";

import LiveTelemetryCard from "../components/LiveTelemetryCard";
import BatteryCard from "../components/BatteryCard";
import SolarCard from "../components/SolarCard";
import GeneratorCard from "../components/GeneratorCard";
import GridCard from "../components/GridCard";
import InverterCard from "../components/InverterCard";
import RectifierCard from "../components/RectifierCard";
import SmartMeterCard from "../components/SmartMeterCard";
import LoadCard from "../components/LoadCard";
import DeviceStatus from "../components/DeviceStatus";
import CommunicationStatus from "../components/CommunicationStatus";
import WeatherCard from "../components/WeatherCard";

export default function TelemetryPage() {

    const {

        telemetry,

        kpis,

        alarms,

        loading,

        error,

        reload

    } = useTelemetry();

    return (

        <Container
            maxWidth="xl"
            sx={{ py: 3 }}
        >

            <Stack spacing={3}>

                <LiveTelemetryCard

                    telemetry={telemetry}

                    kpis={kpis}

                    loading={loading}

                    onRefresh={reload}

                />

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                        <BatteryCard

                            telemetry={telemetry}

                            loading={loading}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                        <SolarCard

                            telemetry={telemetry}

                            loading={loading}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                        <GeneratorCard

                            telemetry={telemetry}

                            loading={loading}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                        <GridCard

                            telemetry={telemetry}

                            loading={loading}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                        <InverterCard

                            telemetry={telemetry}

                            loading={loading}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                        <RectifierCard

                            telemetry={telemetry}

                            loading={loading}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                        <SmartMeterCard

                            telemetry={telemetry}

                            loading={loading}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                        <LoadCard

                            telemetry={telemetry}

                            loading={loading}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>

                        <WeatherCard

                            telemetry={telemetry}

                            loading={loading}

                        />

                    </Grid>

                </Grid>

                <Grid container spacing={3}>

                    <Grid size={{ xs: 12, lg: 6 }}>

                        <DeviceStatus

                            telemetry={telemetry}

                            loading={loading}

                        />

                    </Grid>

                    <Grid size={{ xs: 12, lg: 6 }}>

                        <CommunicationStatus

                            telemetry={telemetry}

                            loading={loading}

                        />

                    </Grid>

                </Grid>

            </Stack>

        </Container>

    );

}