import {
    Card,
    CardContent,
    Stack,
    Button,
    Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

import useUser from "../hooks/useUser.js";

/*
|--------------------------------------------------------------------------
| User Toolbar
|--------------------------------------------------------------------------
*/

export default function UserToolbar({
    onCreate
}) {

    const {
        refresh,
        refreshing
    } = useUser();

    return (

        <Card>

            <CardContent>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={2}
                    sx={{
                        alignItems: {
                            xs: "stretch",
                            sm: "center"
                        },
                        justifyContent: "space-between"
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        User Management
                    </Typography>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        spacing={2}
                    >

                        <Button
                            variant="outlined"
                            startIcon={
                                <RefreshIcon />
                            }
                            onClick={refresh}
                            disabled={refreshing}
                        >
                            Refresh
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={
                                <AddIcon />
                            }
                            onClick={onCreate}
                        >
                            New User
                        </Button>

                    </Stack>

                </Stack>

            </CardContent>

        </Card>

    );

}