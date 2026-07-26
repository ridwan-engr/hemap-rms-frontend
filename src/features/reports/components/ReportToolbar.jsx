import {

    Card,
    CardContent,

    Stack,

    Typography,

    Button,

    Divider

} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ClearAllIcon from "@mui/icons-material/ClearAll";

import useReports from "../hooks/useReports";

/*
|--------------------------------------------------------------------------
| Report Toolbar
|--------------------------------------------------------------------------
*/

export default function ReportToolbar({

    onExport

}) {

    const {

        report,

        loading,

        exportGeneratedReport,

        resetReport

    } = useReports();

    /*
    |--------------------------------------------------------------------------
    | Export
    |--------------------------------------------------------------------------
    */

    const handleExport = async () => {

        if (!report) {

            return;

        }

        await exportGeneratedReport({

            report

        });

        if (onExport) {

            onExport();

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Clear
    |--------------------------------------------------------------------------
    */

    const handleClear = () => {

        resetReport();

    };

    return (

        <Card>

            <CardContent>

                <Stack

                    direction="row"

                    justifyContent="space-between"

                    alignItems="center"

                    spacing={2}

                >

                    <Typography

                        variant="h5"

                        fontWeight={700}

                    >

                        Reports

                    </Typography>

                    <Stack

                        direction="row"

                        spacing={2}

                    >

                        <Button

                            variant="outlined"

                            startIcon={

                                <RefreshIcon />

                            }

                            disabled={loading}

                            onClick={onRefresh}

                        >

                            Refresh

                        </Button>

                        <Button

                            variant="outlined"

                            color="warning"

                            startIcon={

                                <ClearAllIcon />

                            }

                            onClick={onClear}

                        >

                            Clear

                        </Button>

                        <Button

                            variant="contained"

                            startIcon={

                                <FileDownloadIcon />

                            }

                            disabled={!report}

                            onClick={onExport}

                        >

                            Export

                        </Button>

                    </Stack>

                </Stack>

                <Divider

                    sx={{ mt: 2 }}

                />

            </CardContent>

        </Card>

    );

}