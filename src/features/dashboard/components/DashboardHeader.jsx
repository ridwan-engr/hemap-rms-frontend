import {
    Button,
    Chip,
    Stack,
    Typography
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

export default function DashboardHeader({
    loading = false,
    lastUpdated = null,
    onRefresh
}) {
    return (
        <Stack
            direction="row"
            mb={4}
            sx={{
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Stack spacing={0.5}>
                <Typography
                    variant="h4"
                    fontWeight={700}
                >
                    Dashboard
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Hybrid Energy Monitoring & Analytics Platform
                </Typography>
            </Stack>

            <Stack
                direction="row"
                spacing={2}
                sx={{
                    alignItems: "center"
                }}
            >
                <Chip
                    color={lastUpdated ? "success" : "default"}
                    label={
                        lastUpdated
                            ? `Updated ${new Date(
                                lastUpdated
                            ).toLocaleTimeString()}`
                            : "Waiting for data..."
                    }
                />

                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    disabled={loading}
                    onClick={onRefresh}
                >
                    Refresh
                </Button>
            </Stack>
        </Stack>
    );
}

/*import "./DashboardHeader.css";

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

}*/