import {

    Card,
    CardContent,
    Stack,
    Button,
    Typography

} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

import useDevice from "../hooks/useDevice";

/*
|--------------------------------------------------------------------------
| Device Toolbar
|--------------------------------------------------------------------------
*/

export default function DeviceToolbar({

    onCreate

}) {

    const {

        refresh,

        refreshing

    } = useDevice();

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

                        Device Management

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

                            New Device

                        </Button>

                    </Stack>

                </Stack>

            </CardContent>

        </Card>

    );

}