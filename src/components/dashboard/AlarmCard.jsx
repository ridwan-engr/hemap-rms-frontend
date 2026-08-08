import "./AlarmCard.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function AlarmCard() {

    const { alarms } = useDashboard();

    const activeAlarms = alarms || [];

    return (

        <section className="alarm-card">

            <div className="alarm-header">

                <h3>

                    Active Alarms

                </h3>

                <span className="alarm-count">

                    {activeAlarms.length}

                </span>

            </div>

            {

                activeAlarms.length === 0 && (

                    <div className="alarm-empty">

                        ✅ No active alarms

                    </div>

                )

            }

            {

                activeAlarms.length > 0 && (

                    <div className="alarm-list">

                        {

                            activeAlarms.map((alarm) => (

                                <div

                                    key={alarm._id || alarm.id}

                                    className={`alarm-item ${getSeverityClass(alarm.severity)}`}

                                >

                                    <div>

                                        <strong>

                                            {alarm.title || alarm.name || "Alarm"}

                                        </strong>

                                    </div>

                                    <div className="alarm-message">

                                        {alarm.message}

                                    </div>

                                    <div className="alarm-footer">

                                        <span>

                                            {alarm.severity || "INFO"}

                                        </span>

                                        <span>

                                            {

                                                alarm.timestamp

                                                    ? new Date(alarm.timestamp).toLocaleString()

                                                    : ""

                                            }

                                        </span>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </section>

    );

}

function getSeverityClass(level = "") {

    switch (level.toUpperCase()) {

        case "CRITICAL":

            return "critical";

        case "MAJOR":

            return "major";

        case "MINOR":

            return "minor";

        case "WARNING":

            return "warning";

        default:

            return "info";

    }

}