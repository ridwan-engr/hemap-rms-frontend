import {

    Box,

    Typography

} from "@mui/material";

export default function Footer() {

    return (

        <Box

            sx={{

                mt: 4,

                py: 2,

                textAlign: "center",

                borderTop: 1,

                borderColor: "divider"

            }}

        >

            <Typography

                variant="body2"

                color="text.secondary"

            >

                © {new Date().getFullYear()} HEMAP-RMS

            </Typography>

        </Box>

    );

}