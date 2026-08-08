import "./EnergyChart.css";

import {

    ResponsiveContainer,

    BarChart,

    Bar,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

    Legend

} from "recharts";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function EnergyChart() {

    const {

        statistics

    } = useDashboard();

    const data = (statistics || []).map((row) => ({

        period:

            new Date(row.timestamp).toLocaleDateString(),

        solar:

            row.energyGenerated || 0,

        load:

            row.energyConsumed || 0,

        grid:

            row.gridImport || 0,

        generator:

            row.generatorEnergy || 0

    }));

    return (

        <section className="energy-chart">

            <div className="chart-header">

                <h3>

                    Energy Consumption (kWh)

                </h3>

            </div>

            <ResponsiveContainer

                width="100%"

                height={380}

            >

                <BarChart

                    data={data}

                >

                    <CartesianGrid

                        strokeDasharray="3 3"

                    />

                    <XAxis

                        dataKey="period"

                    />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar

                        dataKey="solar"

                        fill="#FBBF24"

                    />

                    <Bar

                        dataKey="load"

                        fill="#2563EB"

                    />

                    <Bar

                        dataKey="grid"

                        fill="#7C3AED"

                    />

                    <Bar

                        dataKey="generator"

                        fill="#DC2626"

                    />

                </BarChart>

            </ResponsiveContainer>

        </section>

    );

}