import "./GeneratorCard.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function GeneratorCard() {

    const { telemetry } = useDashboard();

    if (!telemetry) {

        return (

            <div className="generator-card">

                No Generator Data

            </div>

        );

    }

    const running =
        (telemetry.generatorPower ?? 0) > 0;

    const power =
        telemetry.generatorPower ?? 0;

    const voltage =
        telemetry.generatorVoltage ?? 0;

    const current =
        telemetry.generatorCurrent ?? 0;

    const frequency =
        telemetry.generatorFrequency ?? 0;

    const runtimeToday =
        telemetry.generatorRuntimeToday ?? 0;

    const totalRuntime =
        telemetry.generatorRuntimeTotal ?? 0;

    const fuelLevel =
        telemetry.generatorFuelLevel ?? "--";

    const fuelConsumption =
        telemetry.generatorFuelConsumption ?? "--";

    const starts =
        telemetry.generatorStarts ?? 0;

    const serviceHours =
        telemetry.generatorServiceDue ?? "--";

    return (

        <section className="generator-card">

            <div className="generator-header">

                <h3>

                    ⛽ Generator

                </h3>

                <span
                    className={
                        running
                            ? "running"
                            : "stopped"
                    }
                >

                    {running
                        ? "Running"
                        : "Stopped"}

                </span>

            </div>

            <div className="generator-power">

                <h1>

                    {power.toLocaleString()} W

                </h1>

            </div>

            <div className="generator-details">

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

                        Fuel Level

                    </label>

                    <strong>

                        {fuelLevel} %

                    </strong>

                </div>

                <div>

                    <label>

                        Runtime Today

                    </label>

                    <strong>

                        {runtimeToday} hrs

                    </strong>

                </div>

                <div>

                    <label>

                        Total Runtime

                    </label>

                    <strong>

                        {totalRuntime} hrs

                    </strong>

                </div>

                <div>

                    <label>

                        Fuel Consumption

                    </label>

                    <strong>

                        {fuelConsumption} L/hr

                    </strong>

                </div>

                <div>

                    <label>

                        Start Count

                    </label>

                    <strong>

                        {starts}

                    </strong>

                </div>

                <div>

                    <label>

                        Service Due

                    </label>

                    <strong>

                        {serviceHours} hrs

                    </strong>

                </div>

            </div>

        </section>

    );

}