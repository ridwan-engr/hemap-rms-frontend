import "./KPICards.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function KPICards() {

    const {

        loading,
        kpis

    } = useDashboard();

    if (loading) {

        return (

            <div className="kpi-grid">

                Loading Dashboard...

            </div>

        );

    }

    const cards = [

        {

            title: "Battery SOC",

            value: `${kpis?.batterySOC ?? 0}%`

        },

        {

            title: "Solar Power",

            value: `${kpis?.solarPower ?? 0} W`

        },

        {

            title: "Load Power",

            value: `${kpis?.loadPower ?? 0} W`

        },

        {

            title: "Grid Power",

            value: `${kpis?.gridPower ?? 0} W`

        },

        {

            title: "Generator",

            value: `${kpis?.generatorPower ?? 0} W`

        },

        {

            title: "Energy Today",

            value: `${kpis?.energyToday ?? 0} kWh`

        },

        {

            title: "Grid Availability",

            value: `${kpis?.gridAvailability ?? 0}%`

        },

        {

            title: "Renewable Fraction",

            value: `${kpis?.renewableFraction ?? 0}%`

        }

    ];

    return (

        <section className="kpi-grid">

            {

                cards.map(card => (

                    <div

                        key={card.title}

                        className="kpi-card"

                    >

                        <span>

                            {card.title}

                        </span>

                        <h2>

                            {card.value}

                        </h2>

                    </div>

                ))

            }

        </section>

    );

}