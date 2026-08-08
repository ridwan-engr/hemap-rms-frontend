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

import useSite from "../hooks/useSites.js";
import SiteForm from "./SiteForm.jsx";

export default function SiteToolbar() {

    const {
        reload,
        refreshing,
        loading
    } = useSite();

    const [openForm, setOpenForm] = useState(false);

    const handleOpenForm = () => {
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleRefresh = () => {
        reload();
    };

    const handleExport = () => {
        console.info("Export Sites...");
    };

    return (
        <>
            <Card>
                <CardContent>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center"
                        }}
                    >

                        <Button
                            variant="outlined"
                            startIcon={
                                refreshing || loading ? (
                                    <CircularProgress size={18} />
                                ) : (
                                    <RefreshIcon />
                                )
                            }
                            onClick={handleRefresh}
                            disabled={refreshing || loading}
                        >
                            Refresh
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<DownloadIcon />}
                            onClick={handleExport}
                        >
                            Export
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
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