import "./PowerChart.css";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function PowerChart() {

    const {

        telemetryHistory

    } = useDashboard();

    const data = (telemetryHistory || []).map((row) => ({

        time: new Date(row.timestamp).toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit"

        }),

        solar: row.solarPower || 0,

        load: row.loadPower || 0,

        battery: row.batteryPower || 0,

        grid: row.gridPower || 0,

        generator: row.generatorPower || 0,

        inverter: row.inverterPower || 0

    }));

    return (

        <section className="power-chart">

            <div className="chart-header">

                <h3>

                    Power Trend

                </h3>

            </div>

            <ResponsiveContainer
                width="100%"
                height={380}
            >

                <LineChart
                    data={data}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="time"
                    />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Line

                        type="monotone"

                        dataKey="solar"

                        stroke="#F59E0B"

                        strokeWidth={2}

                        dot={false}

                    />

                    <Line

                        type="monotone"

                        dataKey="load"

                        stroke="#2563EB"

                        strokeWidth={2}

                        dot={false}

                    />

                    <Line

                        type="monotone"

                        dataKey="battery"

                        stroke="#16A34A"

                        strokeWidth={2}

                        dot={false}

                    />

                    <Line

                        type="monotone"

                        dataKey="grid"

                        stroke="#7C3AED"

                        strokeWidth={2}

                        dot={false}

                    />

                    <Line

                        type="monotone"

                        dataKey="generator"

                        stroke="#DC2626"

                        strokeWidth={2}

                        dot={false}

                    />

                    <Line

                        type="monotone"

                        dataKey="inverter"

                        stroke="#0EA5E9"

                        strokeWidth={2}

                        dot={false}

                    />

                </LineChart>

            </ResponsiveContainer>

        </section>

    );

}