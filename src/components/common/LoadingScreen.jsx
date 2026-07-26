import {

    Box,

    CircularProgress

} from "@mui/material";

export default function LoadingScreen() {

    return (

        <Box

            sx={{

                height: "60vh",

                display: "flex",

                justifyContent: "center",

                alignItems: "center"

            }}

        >

            <CircularProgress />

        </Box>

    );

}