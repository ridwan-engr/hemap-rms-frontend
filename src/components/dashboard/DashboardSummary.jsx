import "./DashboardSummary.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function DashboardSummary() {

    const {

        telemetry,

        statistics

    } = useDashboard();

    const summary = [

        {
            title: "Battery SOC",
            value: `${telemetry?.batterySOC ?? 0}%`,
            color: "#16a34a"
        },

        {
            title: "Solar Power",
            value: `${telemetry?.solarPower ?? 0} W`,
            color: "#f59e0b"
        },

        {
            title: "Load Power",
            value: `${telemetry?.loadPower ?? 0} W`,
            color: "#2563eb"
        },

        {
            title: "Grid Power",
            value: `${telemetry?.gridPower ?? 0} W`,
            color: "#7c3aed"
        },

        {
            title: "Generator",
            value: `${telemetry?.generatorPower ?? 0} W`,
            color: "#dc2626"
        },

        {
            title: "Renewable Fraction",
            value: `${statistics?.renewableFraction ?? 0}%`,
            color: "#059669"
        }

    ];

    return (

        <section className="dashboard-summary">

            {

                summary.map((item) => (

                    <div

                        key={item.title}

                        className="summary-card"

                    >

                        <span>

                            {item.title}

                        </span>

                        <h2
                            style={{
                                color: item.color
                            }}
                        >

                            {item.value}

                        </h2>

                    </div>

                ))

            }

        </section>

    );

}