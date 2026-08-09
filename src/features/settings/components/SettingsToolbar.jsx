import {
    Box,
    Button,
    Grid,
    TextField,
    Typography
} from "@mui/material";

export default function SettingsToolbar({
    search,
    onSearchChange,
    onRefresh,
    loading = false
}) {
    return (
        <Grid
            container
            spacing={2}
            sx={{
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
            <Grid
                size={{
                    xs: 12,
                    md: 6
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Settings
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Manage system configuration and preferences
                    </Typography>
                </Box>
            </Grid>

            <Grid
                size={{
                    xs: 12,
                    md: 6
                }}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: {
                        xs: "flex-start",
                        md: "flex-end"
                    },
                    gap: 2
                }}
            >
                <TextField
                    size="small"
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Search settings..."
                />

                <Button
                    variant="contained"
                    onClick={onRefresh}
                    disabled={loading}
                >
                    {loading ? "Refreshing..." : "Refresh"}
                </Button>
            </Grid>
        </Grid>
    );
}