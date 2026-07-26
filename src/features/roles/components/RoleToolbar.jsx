import {

    Card,
    CardContent,
    Stack,
    Typography,
    Button

} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

import useRole from "../hooks/useRole";

/*
|--------------------------------------------------------------------------
| Role Toolbar
|--------------------------------------------------------------------------
*/

export default function RoleToolbar({

    onCreate

}) {

    const {

        refresh,

        refreshing

    } = useRole();

    return (

        <Card>

            <CardContent>

                <Stack

                    direction="row"

                    justifyContent="space-between"

                    alignItems="center"

                >

                    <Typography

                        variant="h6"

                        fontWeight={700}

                    >

                        Role Management

                    </Typography>

                    <Stack

                        direction="row"

                        spacing={2}

                    >

                        <Button

                            variant="outlined"

                            startIcon={<RefreshIcon />}

                            onClick={refresh}

                            disabled={refreshing}

                        >

                            Refresh

                        </Button>

                        <Button

                            variant="contained"

                            startIcon={<AddIcon />}

                            onClick={onCreate}

                        >

                            New Role

                        </Button>

                    </Stack>

                </Stack>

            </CardContent>

        </Card>

    );

}