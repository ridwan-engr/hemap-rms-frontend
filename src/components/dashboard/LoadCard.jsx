import "./LoadCard.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function LoadCard() {

    const { telemetry } = useDashboard();

    if (!telemetry) {

        return (

            <div className="load-card">

                No Load Data

            </div>

        );

    }

    const totalLoad =
        telemetry.loadPower ?? 0;

    const acLoad =
        telemetry.acLoadPower ?? 0;

    const dcLoad =
        telemetry.dcLoadPower ?? 0;

    const criticalLoad =
        telemetry.criticalLoad ?? 0;

    const nonCriticalLoad =
        telemetry.nonCriticalLoad ?? 0;

    const peakLoad =
        telemetry.peakLoad ?? 0;

    const averageLoad =
        telemetry.averageLoad ?? 0;

    const powerFactor =
        telemetry.powerFactor ?? 0;

    return (

        <section className="load-card">

            <div className="load-header">

                <h3>

                    ⚡ Site Load

                </h3>

            </div>

            <div className="load-total">

                <h1>

                    {totalLoad.toLocaleString()} W

                </h1>

            </div>

            <div className="load-grid">

                <div>

                    <label>AC Load</label>

                    <strong>{acLoad} W</strong>

                </div>

                <div>

                    <label>DC Load</label>

                    <strong>{dcLoad} W</strong>

                </div>

                <div>

                    <label>Critical</label>

                    <strong>{criticalLoad} W</strong>

                </div>

                <div>

                    <label>Non-Critical</label>

                    <strong>{nonCriticalLoad} W</strong>

                </div>

                <div>

                    <label>Peak</label>

                    <strong>{peakLoad} W</strong>

                </div>

                <div>

                    <label>Average</label>

                    <strong>{averageLoad} W</strong>

                </div>

                <div>

                    <label>Power Factor</label>

                    <strong>{powerFactor}</strong>

                </div>

            </div>

        </section>

    );

}