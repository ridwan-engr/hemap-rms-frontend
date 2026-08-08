import "./SolarCard.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function SolarCard() {

    const { telemetry } = useDashboard();

    if (!telemetry) {

        return (

            <div className="solar-card">

                No Solar Data

            </div>

        );

    }

    const power = telemetry.solarPower ?? 0;

    const voltage = telemetry.solarVoltage ?? 0;

    const current = telemetry.solarCurrent ?? 0;

    const dailyYield = telemetry.dailySolarEnergy ?? 0;

    const monthlyYield = telemetry.monthlySolarEnergy ?? 0;

    const peakPower = telemetry.peakSolarPower ?? 0;

    const efficiency = telemetry.solarEfficiency ?? 0;

    const status = power > 0
        ? "Generating"
        : "Idle";

    return (

        <section className="solar-card">

            <div className="solar-header">

                <h3>

                    ☀ Solar Array

                </h3>

                <span>

                    {status}

                </span>

            </div>

            <div className="solar-power">

                <h1>

                    {power.toLocaleString()} W

                </h1>

            </div>

            <div className="solar-details">

                <div>

                    <label>

                        PV Voltage

                    </label>

                    <strong>

                        {voltage} V

                    </strong>

                </div>

                <div>

                    <label>

                        PV Current

                    </label>

                    <strong>

                        {current} A

                    </strong>

                </div>

                <div>

                    <label>

                        Today's Yield

                    </label>

                    <strong>

                        {dailyYield} kWh

                    </strong>

                </div>

                <div>

                    <label>

                        Monthly Yield

                    </label>

                    <strong>

                        {monthlyYield} kWh

                    </strong>

                </div>

                <div>

                    <label>

                        Peak Output

                    </label>

                    <strong>

                        {peakPower} W

                    </strong>

                </div>

                <div>

                    <label>

                        Efficiency

                    </label>

                    <strong>

                        {efficiency} %

                    </strong>

                </div>

            </div>

        </section>

    );

}