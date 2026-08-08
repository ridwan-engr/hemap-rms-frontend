import "./Dashboard.css";

import DashboardHeader from "../../components/dashboard/DashboardHeader.jsx";
import DashboardSummary from "../../components/dashboard/DashboardSummary.jsx";

import SystemStatusCard from "../../components/dashboard/SystemStatusCard.jsx";

import BatteryCard from "../../components/dashboard/BatteryCard.jsx";
import SolarCard from "../../components/dashboard/SolarCard";
import GridCard from "../../components/dashboard/GridCard.jsx";
import GeneratorCard from "../../components/dashboard/GeneratorCard.jsx";
import LoadCard from "../../components/dashboard/LoadCard.jsx";

import EnergyFlowCard from "../../components/dashboard/EnergyFlowCard.jsx";

import PowerChart from "../../components/dashboard/PowerChart.jsx";
import EnergyChart from "../../components/dashboard/EnergyChart.jsx";

import AlarmCard from "../../components/dashboard/AlarmCard.jsx";
import WeatherCard from "../../components/dashboard/WeatherCard.jsx";

export default function Dashboard() {

    return (

        <div className="dashboard-page">

            <DashboardHeader />

            <DashboardSummary />

            <div className="dashboard-grid">

                <SystemStatusCard />

                <BatteryCard />

                <SolarCard />

                <GridCard />

                <GeneratorCard />

                <LoadCard />

            </div>

            <div className="dashboard-grid-two">

                <EnergyFlowCard />

                <WeatherCard />

            </div>

            <div className="dashboard-grid-chart">

                <PowerChart />

                <EnergyChart />

            </div>

            <AlarmCard />

        </div>

    );

}