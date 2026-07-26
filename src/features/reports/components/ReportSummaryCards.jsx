import {

    Card,
    CardContent,

    Grid,

    Typography,

    Stack

} from "@mui/material";

import SolarPowerIcon from "@mui/icons-material/SolarPower";
import BoltIcon from "@mui/icons-material/Bolt";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import TimerIcon from "@mui/icons-material/Timer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShieldIcon from "@mui/icons-material/Shield";

import useReports from "../hooks/useReports";

/*
|--------------------------------------------------------------------------
| KPI Card
|--------------------------------------------------------------------------
*/

function SummaryCard({

    title,

    value,

    unit,

    icon

}) {

    return (

        <Card>

            <CardContent>

                <Stack

                    direction="row"

                    justifyContent="space-between"

                    alignItems="center"

                >

                    <div>

                        <Typography

                            variant="body2"

                            color="text.secondary"

                        >

                            {title}

                        </Typography>

                        <Typography

                            variant="h5"

                            fontWeight={700}

                        >

                            {value ?? 0}

                            {unit}

                        </Typography>

                    </div>

                    {icon}

                </Stack>

            </CardContent>

        </Card>

    );

}

/*
|--------------------------------------------------------------------------
| Report Summary
|--------------------------------------------------------------------------
*/

export default function ReportSummaryCards() {

    const {

        summary

    } = useReports();

    if (!summary) {

        return null;

    }

    return (

        <Grid

            container

            spacing={2}

        >

            <Grid size={{ xs:12, sm:6, lg:3 }}>

                <SummaryCard

                    title="Solar Energy"

                    value={summary.totalSolarEnergy}

                    unit=" kWh"

                    icon={<SolarPowerIcon fontSize="large" color="warning" />}

                />

            </Grid>

            <Grid size={{ xs:12, sm:6, lg:3 }}>

                <SummaryCard

                    title="Grid Energy"

                    value={summary.totalGridEnergy}

                    unit=" kWh"

                    icon={<BoltIcon fontSize="large" color="primary" />}

                />

            </Grid>

            <Grid size={{ xs:12, sm:6, lg:3 }}>

                <SummaryCard

                    title="Generator Energy"

                    value={summary.totalGeneratorEnergy}

                    unit=" kWh"

                    icon={<ElectricBoltIcon fontSize="large" color="error" />}

                />

            </Grid>

            <Grid size={{ xs:12, sm:6, lg:3 }}>

                <SummaryCard

                    title="Battery Efficiency"

                    value={summary.batteryEfficiency}

                    unit="%"

                    icon={<BatteryChargingFullIcon fontSize="large" color="success" />}

                />

            </Grid>

            <Grid size={{ xs:12, sm:6, lg:3 }}>

                <SummaryCard

                    title="Renewable Fraction"

                    value={summary.renewableFraction}

                    unit="%"

                    icon={<TrendingUpIcon fontSize="large" color="success" />}

                />

            </Grid>

            <Grid size={{ xs:12, sm:6, lg:3 }}>

                <SummaryCard

                    title="Generator Runtime"

                    value={summary.generatorRuntime}

                    unit=" hrs"

                    icon={<TimerIcon fontSize="large" color="warning" />}

                />

            </Grid>

            <Grid size={{ xs:12, sm:6, lg:3 }}>

                <SummaryCard

                    title="Alarms"

                    value={summary.alarms}

                    unit=""

                    icon={<WarningAmberIcon fontSize="large" color="error" />}

                />

            </Grid>

            <Grid size={{ xs:12, sm:6, lg:3 }}>

                <SummaryCard

                    title="Resilience"

                    value={summary.resilience}

                    unit="%"

                    icon={<ShieldIcon fontSize="large" color="success" />}

                />

            </Grid>

            <Grid size={{ xs:12, md:4 }}>

                <SummaryCard

                    title="SAIDI"

                    value={summary.saidi}

                    unit=" hrs"

                    icon={<TrendingUpIcon fontSize="large" />}

                />

            </Grid>

            <Grid size={{ xs:12, md:4 }}>

                <SummaryCard

                    title="SAIFI"

                    value={summary.saifi}

                    unit=""

                    icon={<TrendingUpIcon fontSize="large" />}

                />

            </Grid>

            <Grid size={{ xs:12, md:4 }}>

                <SummaryCard

                    title="ENS"

                    value={summary.ens}

                    unit=" kWh"

                    icon={<TrendingUpIcon fontSize="large" />}

                />

            </Grid>

            <Grid size={{ xs:12 }}>

                <SummaryCard

                    title="Loss of Load Probability (LOLP)"

                    value={summary.lolp}

                    unit="%"

                    icon={<WarningAmberIcon fontSize="large" color="error" />}

                />

            </Grid>

        </Grid>

    );

}