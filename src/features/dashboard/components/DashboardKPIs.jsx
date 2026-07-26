import {

    Grid

} from "@mui/material";

import SolarPowerIcon from "@mui/icons-material/SolarPower";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import StatCard from "../../../components/common/StatCard";

export default function DashboardKPIs({

    cards,

    loading

}) {

    return (

        <Grid
            container
            spacing={3}
        >

            <Grid size={{ xs: 12, md: 3 }}>

                <StatCard

                    title="Active Sites"

                    value={cards?.activeSites ?? 0}

                    icon={<ElectricalServicesIcon />}

                    loading={loading}

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <StatCard

                    title="Battery SOC"

                    value={cards?.batterySOC ?? 0}

                    unit="%"

                    icon={<BatteryChargingFullIcon />}

                    loading={loading}

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <StatCard

                    title="Renewable Energy"

                    value={cards?.renewableEnergy ?? 0}

                    unit="%"

                    icon={<SolarPowerIcon />}

                    loading={loading}

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <StatCard

                    title="Active Alarms"

                    value={cards?.activeAlarms ?? 0}

                    icon={<WarningAmberIcon />}

                    loading={loading}

                />

            </Grid>

        </Grid>

    );

}