import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import SyncIcon from "@mui/icons-material/Sync";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import useInstallations from "../hooks/useInstallation.js";


/*
|--------------------------------------------------------------------------
| Installation Details
|--------------------------------------------------------------------------
|
| Displays the selected installation and provides:
|
| - Installation information
| - Synchronization
| - Statistics
| - Deletion
| - Navigation back to installations
|
| Components do NOT call Axios directly.
| Components do NOT dispatch Redux actions directly.
|
|--------------------------------------------------------------------------
*/


export default function InstallationDetails({
    installationId,
    onBack,
    onDeleted
}) {

    const {
        installation,
        statistics,
        loading,
        error,
        synchronizing,
        deleting,

        loadInstallation,
        synchronizeInstallation,
        deleteInstallation,
        loadStatistics
    } = useInstallations();


    /*
    |--------------------------------------------------------------------------
    | Load Installation
    |--------------------------------------------------------------------------
    */

    const handleLoad = async () => {

        if (!installationId) {
            return;
        }

        await loadInstallation(
            installationId
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Synchronize Installation
    |--------------------------------------------------------------------------
    */

    const handleSynchronize = async () => {

        if (!installationId) {
            return;
        }

        await synchronizeInstallation(
            installationId
        );

        /*
        | Reload installation after synchronization
        */

        await loadInstallation(
            installationId
        );

        /*
        | Reload statistics
        */

        await loadStatistics(
            installationId
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Delete Installation
    |--------------------------------------------------------------------------
    */

    const handleDelete = async () => {

        if (!installationId) {
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this installation? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        const result = await deleteInstallation(
            installationId
        );

        if (
            result &&
            result.meta &&
            result.meta.requestStatus === "fulfilled"
        ) {

            if (onDeleted) {
                onDeleted(
                    installationId
                );
            }

            return;
        }

        /*
        | Some hooks may return the unwrapped result directly.
        */

        if (
            result &&
            result.success !== false
        ) {

            if (onDeleted) {
                onDeleted(
                    installationId
                );
            }

        }

    };


    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    if (!installationId) {

        return (

            <Card>

                <CardContent>

                    <Alert severity="warning">

                        No installation was selected.

                    </Alert>

                    {onBack && (

                        <Button
                            sx={{ mt: 2 }}
                            startIcon={
                                <ArrowBackIcon />
                            }
                            onClick={onBack}
                        >
                            Back to Installations
                        </Button>

                    )}

                </CardContent>

            </Card>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (
        loading &&
        !installation
    ) {

        return (
            
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: "400px"
                    }}
                >

                <CircularProgress />

            </Box>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (
        error &&
        !installation
    ) {

        return (

            <Card>

                <CardContent>

                    <Alert severity="error">

                        {typeof error === "string"
                            ? error
                            : error?.message ||
                            "Unable to load installation."
                        }

                    </Alert>

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ mt: 2 }}
                    >

                        <Button
                            variant="outlined"
                            startIcon={
                                <ArrowBackIcon />
                            }
                            onClick={onBack}
                        >
                            Back
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={
                                <RefreshIcon />
                            }
                            onClick={handleLoad}
                        >
                            Retry
                        </Button>

                    </Stack>

                </CardContent>

            </Card>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Installation Not Found
    |--------------------------------------------------------------------------
    */

    if (!installation) {

        return (

            <Card>

                <CardContent>

                    <Alert severity="info">

                        Installation not found.

                    </Alert>

                    {onBack && (

                        <Button
                            sx={{ mt: 2 }}
                            startIcon={
                                <ArrowBackIcon />
                            }
                            onClick={onBack}
                        >
                            Back to Installations
                        </Button>

                    )}

                </CardContent>

            </Card>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Normalize Installation Data
    |--------------------------------------------------------------------------
    */

    const id =
        installation.id ||
        installation._id ||
        installation.installationId;

    const name =
        installation.name ||
        installation.siteName ||
        installation.installationName ||
        "Unnamed Installation";

    const siteId =
        installation.siteId ||
        installation.site?.id ||
        installation.site?._id ||
        "N/A";

    const status =
        installation.status ||
        "N/A";

    const location =
        installation.location ||
        installation.site?.location ||
        "N/A";

    const address =
        installation.address ||
        installation.site?.address ||
        "N/A";

    const country =
        installation.country ||
        installation.site?.country ||
        "N/A";

    const timezone =
        installation.timezone ||
        installation.site?.timezone ||
        "N/A";

    const vrmInstallationId =
        installation.vrmInstallationId ||
        installation.vrmId ||
        installation.vrm?.installationId ||
        "N/A";

    const createdAt =
        installation.createdAt
            ? new Date(
                installation.createdAt
            ).toLocaleString()
            : "N/A";

    const updatedAt =
        installation.updatedAt
            ? new Date(
                installation.updatedAt
            ).toLocaleString()
            : "N/A";


    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    const statisticsData =
        statistics?.data ||
        statistics ||
        {};


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <Stack spacing={3}>


            {/* ------------------------------------------------------------ */}
            {/* Header                                                       */}
            {/* ------------------------------------------------------------ */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row"
                }}
                justifyContent="space-between"
                alignItems={{
                    xs: "flex-start",
                    sm: "center"
                }}
                spacing={2}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        {name}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Installation Details
                    </Typography>

                </Box>


                <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                >

                    {onBack && (

                        <Button
                            variant="outlined"
                            startIcon={
                                <ArrowBackIcon />
                            }
                            onClick={onBack}
                        >
                            Back
                        </Button>

                    )}


                    <Button
                        variant="outlined"
                        startIcon={
                            <RefreshIcon />
                        }
                        onClick={handleLoad}
                        disabled={loading}
                    >
                        Refresh
                    </Button>


                    <Button
                        variant="contained"
                        startIcon={
                            synchronizing
                                ? (
                                    <CircularProgress
                                        size={18}
                                        color="inherit"
                                    />
                                )
                                : (
                                    <SyncIcon />
                                )
                        }
                        onClick={
                            handleSynchronize
                        }
                        disabled={
                            synchronizing ||
                            deleting
                        }
                    >
                        {synchronizing
                            ? "Synchronizing..."
                            : "Synchronize"
                        }
                    </Button>


                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={
                            deleting
                                ? (
                                    <CircularProgress
                                        size={18}
                                        color="inherit"
                                    />
                                )
                                : (
                                    <DeleteIcon />
                                )
                        }
                        onClick={
                            handleDelete
                        }
                        disabled={
                            deleting ||
                            synchronizing
                        }
                    >
                        {deleting
                            ? "Deleting..."
                            : "Delete"
                        }
                    </Button>

                </Stack>

            </Stack>


            {/* ------------------------------------------------------------ */}
            {/* Error                                                        */}
            {/* ------------------------------------------------------------ */}

            {error && (

                <Alert severity="error">

                    {typeof error === "string"
                        ? error
                        : error?.message ||
                        "An analytics operation failed."
                    }

                </Alert>

            )}


            {/* ------------------------------------------------------------ */}
            {/* Basic Information                                            */}
            {/* ------------------------------------------------------------ */}

            <Card>

                <CardContent>

                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Installation Information
                    </Typography>

                    <Divider
                        sx={{
                            my: 2
                        }}
                    />


                    <Grid
                        container
                        spacing={3}
                    >

                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Installation ID
                            </Typography>

                            <Typography>
                                {id || "N/A"}
                            </Typography>

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Site ID
                            </Typography>

                            <Typography>
                                {siteId}
                            </Typography>

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Status
                            </Typography>

                            <Typography
                                fontWeight={600}
                            >
                                {status}
                            </Typography>

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Location
                            </Typography>

                            <Typography>
                                {location}
                            </Typography>

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Address
                            </Typography>

                            <Typography>
                                {address}
                            </Typography>

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Country
                            </Typography>

                            <Typography>
                                {country}
                            </Typography>

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Timezone
                            </Typography>

                            <Typography>
                                {timezone}
                            </Typography>

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                VRM Installation ID
                            </Typography>

                            <Typography>
                                {vrmInstallationId}
                            </Typography>

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Created
                            </Typography>

                            <Typography>
                                {createdAt}
                            </Typography>

                        </Grid>


                        <Grid
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 4
                            }}
                        >

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Last Updated
                            </Typography>

                            <Typography>
                                {updatedAt}
                            </Typography>

                        </Grid>

                    </Grid>

                </CardContent>

            </Card>


            {/* ------------------------------------------------------------ */}
            {/* Statistics                                                    */}
            {/* ------------------------------------------------------------ */}

            <Card>

                <CardContent>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Box>

                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                Installation Statistics
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Performance statistics returned by the backend.
                            </Typography>

                        </Box>


                        <Button
                            variant="outlined"
                            onClick={() =>
                                loadStatistics(
                                    installationId
                                )
                            }
                            disabled={loading}
                        >
                            Refresh Statistics
                        </Button>

                    </Stack>


                    <Divider
                        sx={{
                            my: 2
                        }}
                    />


                    {Object.keys(
                        statisticsData
                    ).length === 0 ? (

                        <Typography
                            color="text.secondary"
                        >
                            No statistics available.
                        </Typography>

                    ) : (

                        <Grid
                            container
                            spacing={2}
                        >

                            {Object.entries(
                                statisticsData
                            ).map(
                                ([key, value]) => (

                                    <Grid
                                        key={key}
                                        size={{
                                            xs: 12,
                                            sm: 6,
                                            md: 4
                                        }}
                                    >

                                        <Card
                                            variant="outlined"
                                        >

                                            <CardContent>

                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {key}
                                                </Typography>

                                                <Typography
                                                    variant="h6"
                                                    fontWeight={700}
                                                >
                                                    {typeof value === "object"
                                                        ? JSON.stringify(
                                                            value
                                                        )
                                                        : String(
                                                            value
                                                        )
                                                    }
                                                </Typography>

                                            </CardContent>

                                        </Card>

                                    </Grid>

                                )
                            )}

                        </Grid>

                    )}

                </CardContent>

            </Card>


        </Stack>

    );

}