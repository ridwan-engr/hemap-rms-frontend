import {

    Card,
    CardContent,
    Stack,
    Typography,
    Button

} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import useSettings from "../hooks/useSettings";

/*
|--------------------------------------------------------------------------
| Settings Toolbar
|--------------------------------------------------------------------------
*/

export default function SettingsToolbar() {

    const {

        reload,
        initializeDefaults,
        loading

    } = useSettings();

    /*
    |--------------------------------------------------------------------------
    | Initialize Defaults
    |--------------------------------------------------------------------------
    */

    const handleInitialize = async () => {

        const confirmed = window.confirm(

            "Initialize default settings?\n\nExisting keys will be updated."

        );

        if (!confirmed) {

            return;

        }

        await initializeDefaults();

        reload();

    };

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

                        System Settings

                    </Typography>

                    <Stack

                        direction="row"

                        spacing={2}

                    >

                        <Button

                            variant="outlined"

                            startIcon={<RefreshIcon />}

                            onClick={reload}

                            disabled={loading}

                        >

                            Refresh

                        </Button>

                        <Button

                            variant="contained"

                            color="warning"

                            startIcon={<RestartAltIcon />}

                            onClick={handleInitialize}

                        >

                            Initialize Defaults

                        </Button>

                    </Stack>

                </Stack>

            </CardContent>

        </Card>

    );

}