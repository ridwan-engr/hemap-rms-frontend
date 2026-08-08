import "./PowerFlow.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function PowerFlow() {

    const {

        telemetry

    } = useDashboard();

    if (!telemetry) {

        return (

            <div className="powerflow">

                No telemetry available.

            </div>

        );

    }

    return (

        <section className="powerflow">

            <div className="power-node">

                <h4>☀ Solar</h4>

                <h2>

                    {telemetry.solarPower ?? 0} W

                </h2>

            </div>

            <div className="arrow">

                ↓

            </div>

            <div className="power-node">

                <h4>🔋 Battery</h4>

                <h2>

                    {telemetry.batterySOC ?? 0} %

                </h2>

                <small>

                    {telemetry.batteryVoltage ?? 0} V

                </small>

            </div>

            <div className="arrow">

                ↓

            </div>

            <div className="power-center">

                <div className="grid">

                    <h4>⚡ Grid</h4>

                    <strong>

                        {telemetry.gridPower ?? 0} W

                    </strong>

                </div>

                <div className="inverter">

                    <h3>🔄 Inverter</h3>

                    <strong>

                        {telemetry.inverterPower ?? 0} W

                    </strong>
                </div>

                <div className="generator">

                    <h4>⛽ Generator</h4>

                    <strong>

                        {telemetry.generatorPower ?? 0} W

                    </strong>

                </div>

            </div>

            <div className="arrow">

                ↓

            </div>

            <div className="power-node">

                <h4>🏠 Load</h4>

                <h2>

                    {telemetry.loadPower ?? 0} W

                </h2>

            </div>

        </section>

    );

}