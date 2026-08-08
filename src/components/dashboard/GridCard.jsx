import "./GridCard.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function GridCard() {

    const { telemetry } = useDashboard();

    if (!telemetry) {

        return (

            <div className="grid-card">

                No Grid Data

            </div>

        );

    }

    const gridPower = telemetry.gridPower ?? 0;

    const voltage = telemetry.gridVoltage ?? 0;

    const current = telemetry.gridCurrent ?? 0;

    const frequency = telemetry.gridFrequency ?? 0;

    const dailyEnergy = telemetry.dailyGridEnergy ?? 0;

    const availability = telemetry.gridAvailability ?? 0;

    const saidi = telemetry.saidi ?? 0;

    const saifi = telemetry.saifi ?? 0;

    const status = gridPower > 0 || voltage > 180
        ? "Available"
        : "Outage";

    return (

        <section className="grid-card">

            <div className="grid-header">

                <h3>

                    ⚡ Utility Grid

                </h3>

                <span
                    className={
                        status === "Available"
                            ? "status-online"
                            : "status-offline"
                    }
                >

                    {status}

                </span>

            </div>

            <div className="grid-power">

                <h1>

                    {gridPower.toLocaleString()} W

                </h1>

            </div>

            <div className="grid-details">

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

                        Frequency

                    </label>

                    <strong>

                        {frequency} Hz

                    </strong>

                </div>

                <div>

                    <label>

                        Energy Today

                    </label>

                    <strong>

                        {dailyEnergy} kWh

                    </strong>

                </div>

                <div>

                    <label>

                        Availability

                    </label>

                    <strong>

                        {availability} %

                    </strong>

                </div>

                <div>

                    <label>

                        SAIDI

                    </label>

                    <strong>

                        {saidi}

                    </strong>

                </div>

                <div>

                    <label>

                        SAIFI

                    </label>

                    <strong>

                        {saifi}

                    </strong>

                </div>

            </div>

        </section>

    );

}