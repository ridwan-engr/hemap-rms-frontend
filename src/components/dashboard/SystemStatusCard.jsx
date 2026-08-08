import "./SystemStatusCard.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function SystemStatusCard() {

    const {

        telemetry,

        alarms,

        deviceStatus

    } = useDashboard();

    const status = deviceStatus || {};

    const activeAlarms = alarms?.length || 0;

    return (

        <section className="system-status-card">

            <div className="card-title">

                <h3>

                    System Status

                </h3>

            </div>

            <div className="status-grid">

                <StatusItem
                    label="System"
                    value={status.online ? "ONLINE" : "OFFLINE"}
                    state={status.online ? "success" : "danger"}
                />

                <StatusItem
                    label="Battery"
                    value={`${telemetry?.batterySOC ?? 0}%`}
                    state={
                        telemetry?.batterySOC >= 50
                            ? "success"
                            : telemetry?.batterySOC >= 20
                            ? "warning"
                            : "danger"
                    }
                />

                <StatusItem
                    label="Grid"
                    value={
                        telemetry?.gridPower > 0
                            ? "AVAILABLE"
                            : "UNAVAILABLE"
                    }
                    state={
                        telemetry?.gridPower > 0
                            ? "success"
                            : "warning"
                    }
                />

                <StatusItem
                    label="Generator"
                    value={
                        telemetry?.generatorPower > 0
                            ? "RUNNING"
                            : "STOPPED"
                    }
                    state={
                        telemetry?.generatorPower > 0
                            ? "warning"
                            : "success"
                    }
                />

                <StatusItem
                    label="Solar"
                    value={
                        telemetry?.solarPower > 0
                            ? "ACTIVE"
                            : "IDLE"
                    }
                    state={
                        telemetry?.solarPower > 0
                            ? "success"
                            : "warning"
                    }
                />

                <StatusItem
                    label="Alarms"
                    value={activeAlarms}
                    state={
                        activeAlarms > 0
                            ? "danger"
                            : "success"
                    }
                />

            </div>

            <div className="last-sync">

                Last Seen

                <strong>

                    {

                        status.lastSeen

                            ? new Date(status.lastSeen).toLocaleString()

                            : "Never"

                    }

                </strong>

            </div>

        </section>

    );

}

function StatusItem({

    label,

    value,

    state

}) {

    return (

        <div className={`status-item ${state}`}>

            <span>

                {label}

            </span>

            <strong>

                {value}

            </strong>

        </div>

    );

}