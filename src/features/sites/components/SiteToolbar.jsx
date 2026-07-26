import { useState } from "react";

import {

    Card,
    CardContent,
    Stack,
    Button,
    CircularProgress

} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import DownloadIcon from "@mui/icons-material/Download";

import useSite from "../hooks/useSite";
import SiteForm from "./SiteForm";

/*
|--------------------------------------------------------------------------
| Site Toolbar
|--------------------------------------------------------------------------
*/

export default function SiteToolbar() {

    const {

        refresh,

        refreshing

    } = useSite();

    const [openForm, setOpenForm] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Form Controls
    |--------------------------------------------------------------------------
    */

    const handleOpenForm = () => {

        setOpenForm(true);

    };

    const handleCloseForm = () => {

        setOpenForm(false);

    };

    /*
    |--------------------------------------------------------------------------
    | Export
    |--------------------------------------------------------------------------
    |
    | Placeholder.
    | CSV / Excel / PDF export will be implemented
    | in the Reporting module.
    |
    */

    const handleExport = () => {

        console.info(

            "Export Sites..."

        );

    };

    return (

        <>

            <Card>

                <CardContent>

                    <Stack

                        direction="row"

                        spacing={2}

                        justifyContent="flex-end"

                    >

                        <Button

                            variant="outlined"

                            startIcon={

                                refreshing

                                    ? (

                                        <CircularProgress

                                            size={18}

                                        />

                                    )

                                    : (

                                        <RefreshIcon />

                                    )

                            }

                            onClick={refresh}

                            disabled={refreshing}

                        >

                            Refresh

                        </Button>

                        <Button

                            variant="outlined"

                            startIcon={

                                <DownloadIcon />

                            }

                            onClick={handleExport}

                        >

                            Export

                        </Button>

                        <Button

                            variant="contained"

                            startIcon={

                                <AddIcon />

                            }

                            onClick={handleOpenForm}

                        >

                            Add Site

                        </Button>

                    </Stack>

                </CardContent>

            </Card>

            <SiteForm

                open={openForm}

                onClose={handleCloseForm}

            />

        </>

    );

}