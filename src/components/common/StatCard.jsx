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

                justifyContent="space-between"

                alignItems="center"

            >

                <Typography

                    color="text.secondary"

                    variant="body2"

                >

                    {title}

                </Typography>

                <Box

                    sx={{

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

                {

                    loading

                        ? "--"

                        : `${value}${unit}`

                }

            </Typography>

        </Paper>

    );

}