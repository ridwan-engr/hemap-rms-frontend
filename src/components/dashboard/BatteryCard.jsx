import "./BatteryCard.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function BatteryCard() {

    const {

        telemetry

    } = useDashboard();

    if (!telemetry) {

        return (

            <div className="battery-card">

                No Battery Data

            </div>

        );

    }

    const soc = telemetry.batterySOC ?? 0;

    const voltage = telemetry.batteryVoltage ?? 0;

    const current = telemetry.batteryCurrent ?? 0;

    const temperature = telemetry.batteryTemperature ?? "--";

    const lastSeen = telemetry.timestamp
        ? new Date(telemetry.timestamp).toLocaleString()
        : "--";

    const status = current >= 0
        ? "Charging"
        : "Discharging";

    const progressColor =

        soc >= 70
            ? "#198754"

            : soc >= 40
            ? "#ffc107"

            : "#dc3545";

    return (

        <section className="battery-card">

            <div className="battery-header">

                <h3>

                    🔋 Battery

                </h3>

                <span>

                    {status}

                </span>

            </div>

            <div className="battery-soc">

                <h1>

                    {soc}%

                </h1>

            </div>

            <div className="battery-progress">

                <div

                    className="battery-fill"

                    style={{

                        width: `${soc}%`,

                        background: progressColor

                    }}

                />

            </div>

            <div className="battery-details">

                <div>

                    <label>

                        Voltage

                    </label>

                    <strong>

                        {voltage} V

                    </strong>

                </div>

                <div>

                    <label>

                        Current

                    </label>

                    <strong>

                        {current} A

                    </strong>

                </div>

                <div>

                    <label>

                        Temperature

                    </label>

                    <strong>

                        {temperature} °C

                    </strong>

                </div>

                <div>

                    <label>

                        Last Update

                    </label>

                    <strong>

                        {lastSeen}

                    </strong>

                </div>

            </div>

        </section>

    );

}