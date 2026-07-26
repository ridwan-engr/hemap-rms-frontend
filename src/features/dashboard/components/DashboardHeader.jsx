import {
    Button,
    Chip,
    Stack,
    Typography
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

export default function DashboardHeader({

    loading,

    lastUpdated,

    onRefresh

}) {

    return (

        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
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

                    Hybrid Energy Monitoring &
                    Analytics Platform

                </Typography>

            </Stack>

            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
            >

                <Chip

                    color="success"

                    label={
                        lastUpdated
                            ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}`
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