import "./DashboardHeader.css";

import { useDashboard } from "../../contexts/DashboardContext.jsx";

export default function DashboardHeader() {

    const {

        selectedSite,

        refreshDashboard,

        loading

    } = useDashboard();

    return (

        <header className="dashboard-header">

            <div>

                <h1>

                    HEMAP RMS Dashboard

                </h1>

                <p>

                    {selectedSite?.name || "No Site Selected"}

                </p>

            </div>

            <button

                className="refresh-button"

                disabled={loading}

                onClick={refreshDashboard}

            >

                {

                    loading

                        ? "Refreshing..."

                        : "Refresh"

                }

            </button>

        </header>

    );

}