import {
    Container,
    Grid,
    Stack
} from "@mui/material";

import useTelemetry from "../hooks/useTelemetry.js";

import LiveTelemetryCard from "../components/LiveTelemetryCard.jsx";
import BatteryCard from "../components/BatteryCard.jsx";
import SolarCard from "../components/SolarCard.jsx";
import GeneratorCard from "../components/GeneratorCard.jsx";
import GridCard from "../components/GridCard.jsx";
import InverterCard from "../components/InverterCard.jsx";
import RectifierCard from "../components/RectifierCard.jsx";
import SmartMeterCard from "../components/SmartMeterCard.jsx";
import LoadCard from "../components/LoadCard.jsx";
import DeviceStatus from "../components/DeviceStatus.jsx";
import CommunicationStatus from "../components/CommunicationStatus.jsx";
import WeatherCard from "../components/WeatherCard.jsx";

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
            sx={{
                py: 3
            }}
        >
            <Stack spacing={3}>

                {/* =====================================================
                    LIVE TELEMETRY
                ====================================================== */}

                <LiveTelemetryCard
                    telemetry={telemetry}
                    kpis={kpis}
                    loading={loading}
                    error={error}
                    alarms={alarms}
                    onRefresh={reload}
                />

                {/* =====================================================
                    PRIMARY POWER SYSTEM CARDS
                ====================================================== */}

                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                            lg: 4
                        }}
                    >
                        <BatteryCard
                            telemetry={telemetry}
                            loading={loading}
                            error={error}
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                            lg: 4
                        }}
                    >
                        <SolarCard
                            telemetry={telemetry}
                            loading={loading}
                            error={error}
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                            lg: 4
                        }}
                    >
                        <GeneratorCard
                            telemetry={telemetry}
                            loading={loading}
                            error={error}
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                            lg: 4
                        }}
                    >
                        <GridCard
                            telemetry={telemetry}
                            loading={loading}
                            error={error}
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                            lg: 4
                        }}
                    >
                        <InverterCard
                            telemetry={telemetry}
                            loading={loading}
                            error={error}
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                            lg: 4
                        }}
                    >
                        <RectifierCard
                            telemetry={telemetry}
                            loading={loading}
                            error={error}
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                            lg: 4
                        }}
                    >
                        <SmartMeterCard
                            telemetry={telemetry}
                            loading={loading}
                            error={error}
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                            lg: 4
                        }}
                    >
                        <LoadCard
                            telemetry={telemetry}
                            loading={loading}
                            error={error}
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6,
                            lg: 4
                        }}
                    >
                        <WeatherCard
                            telemetry={telemetry}
                            loading={loading}
                            error={error}
                        />
                    </Grid>

                </Grid>

                {/* =====================================================
                    DEVICE / COMMUNICATION STATUS
                ====================================================== */}

                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        size={{
                            xs: 12,
                            lg: 6
                        }}
                    >
                        <DeviceStatus
                            telemetry={telemetry}
                            loading={loading}
                            error={error}
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            lg: 6
                        }}
                    >
                        <CommunicationStatus
                            telemetry={telemetry}
                            loading={loading}
                            error={error}
                        />
                    </Grid>

                </Grid>

            </Stack>
        </Container>
    );
}