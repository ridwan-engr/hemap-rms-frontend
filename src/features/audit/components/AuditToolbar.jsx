import {

    Card,
    CardContent,

    Stack,

    Typography,

    Button

} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";

import useAudit from "../hooks/useAudit";

/*
|--------------------------------------------------------------------------
| Audit Toolbar
|--------------------------------------------------------------------------
*/

export default function AuditToolbar({

    onExport

}) {

    const {

        refresh,

        refreshing

    } = useAudit();

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

                        Audit Logs

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

                        {

                            onExport && (

                                <Button

                                    variant="contained"

                                    startIcon={<DownloadIcon />}

                                    onClick={onExport}

                                >

                                    Export

                                </Button>

                            )

                        }

                    </Stack>

                </Stack>

            </CardContent>

        </Card>

    );

}