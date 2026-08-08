import {
    Paper,
    Stack,
    Typography,
    Box
} from "@mui/material";

export default function StatCard({
    title,
    value,
    unit = "",
    icon,
    color = "primary.main",
    loading = false
}) {
    return (
        <Paper
            elevation={1}
            sx={{
                p: 3,
                height: 165,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
            }}
        >
            <Stack
                direction="row"
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    {title}
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        color
                    }}
                >
                    {icon}
                </Box>
            </Stack>

            <Typography
                variant="h3"
                fontWeight={700}
            >
                {loading
                    ? "--"
                    : `${value ?? 0}${unit}`
                }
            </Typography>
        </Paper>
    );
}