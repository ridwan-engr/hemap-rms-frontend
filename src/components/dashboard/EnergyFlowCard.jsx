import "./EnergyFlowCard.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function EnergyFlowCard() {

    const { telemetry } = useDashboard();

    if (!telemetry) {

        return (

            <div className="energy-flow-card">

                No Energy Flow Data

            </div>

        );

    }

    const {

        solarPower = 0,

        batteryPower = 0,

        batterySOC = 0,

        gridPower = 0,

        generatorPower = 0,

        inverterPower = 0,

        loadPower = 0

    } = telemetry;

    return (

        <section className="energy-flow-card">

            <div className="card-header">

                <h3>

                    Energy Flow

                </h3>

            </div>

            <div className="energy-flow">

                <div className="energy-node">

                    <div className="icon">☀️</div>

                    <span>Solar</span>

                    <strong>{solarPower} W</strong>

                </div>

                <div className="arrow">

                    ➜

                </div>

                <div className="energy-node">

                    <div className="icon">🔋</div>

                    <span>Battery</span>

                    <strong>{batterySOC}%</strong>

                    <small>{batteryPower} W</small>

                </div>

                <div className="arrow">

                    ➜

                </div>

                <div className="energy-node">

                    <div className="icon">⚡</div>

                    <span>Inverter</span>

                    <strong>{inverterPower} W</strong>

                </div>

                <div className="arrow">

                    ➜

                </div>

                <div className="energy-node">

                    <div className="icon">🏢</div>

                    <span>Load</span>

                    <strong>{loadPower} W</strong>

                </div>

            </div>

            <div className="secondary-flow">

                <div>

                    <span>🏛 Grid</span>

                    <strong>{gridPower} W</strong>

                </div>

                <div>

                    <span>⛽ Generator</span>

                    <strong>{generatorPower} W</strong>

                </div>

            </div>

        </section>

    );

}