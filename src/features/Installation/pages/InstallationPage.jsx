import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";

import useInstallations from "../hooks/useInstallation.js";

import InstallationTable from "../components/InstallationTable.jsx";
import InstallationForm from "../components/InstallationForm.jsx";
import InstallationDetails from "../components/InstallationDetails.jsx";


/*
|--------------------------------------------------------------------------
| Installation Page
|--------------------------------------------------------------------------
|
| Central installation management page.
|
| Responsibilities:
|
| - Display installation table
| - Open installation form
| - Open installation details
| - Refresh installations
| - Coordinate CRUD operations through useInstallations()
|
| Components must NOT:
|
| - Call Axios directly
| - Dispatch Redux actions directly
|
|--------------------------------------------------------------------------
*/

export default function InstallationPage() {

    const {
        installations,

        loading,
        error,

        createInstallation,
        updateInstallation,

        refreshInstallations,

        selectedInstallation,

        showForm,
        showDetails,

        openCreateForm,
        openEditForm,
        openDetails,

        closeForm,
        closeDetails
    } = useInstallations();


    /*
    |--------------------------------------------------------------------------
    | Refresh Installations
    |--------------------------------------------------------------------------
    */

    const handleRefresh = async () => {

        await refreshInstallations();

    };


    /*
    |--------------------------------------------------------------------------
    | Create Installation
    |--------------------------------------------------------------------------
    */

    const handleCreate = async formData => {

        return await createInstallation(
            formData
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Update Installation
    |--------------------------------------------------------------------------
    */

    const handleUpdate = async (
        installationId,
        formData
    ) => {

        return await updateInstallation(
            installationId,
            formData
        );

    };


    /*
    |--------------------------------------------------------------------------
    | Installation Deleted
    |--------------------------------------------------------------------------
    */

    const handleDeleted = async () => {

        closeDetails();

        await refreshInstallations();

    };


    /*
    |--------------------------------------------------------------------------
    | Initial Loading
    |--------------------------------------------------------------------------
    */

    if (
        loading &&
        !installations?.length
    ) {

        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="60vh"
            >
                <CircularProgress />
            </Box>
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Installation Details
    |--------------------------------------------------------------------------
    */

    if (
        showDetails &&
        selectedInstallation
    ) {

        const installationId =
            selectedInstallation.id ||
            selectedInstallation._id ||
            selectedInstallation.installationId;

        return (

            <InstallationDetails
                installationId={
                    installationId
                }

                installation={
                    selectedInstallation
                }

                onBack={
                    closeDetails
                }

                onDeleted={
                    handleDeleted
                }

            />

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Installation Page
    |--------------------------------------------------------------------------
    */

    return (

        <Stack spacing={3}>


            {/* ------------------------------------------------------------ */}
            {/* Page Header                                                  */}
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
                        Installations
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Manage site installations,
                        synchronization and
                        installation performance.
                    </Typography>

                </Box>


                <Stack
                    direction="row"
                    spacing={1}
                >

                    <Button
                        variant="outlined"

                        startIcon={
                            <RefreshIcon />
                        }

                        onClick={
                            handleRefresh
                        }

                        disabled={
                            loading
                        }
                    >
                        Refresh
                    </Button>


                    <Button
                        variant="contained"

                        startIcon={
                            <AddIcon />
                        }

                        onClick={
                            openCreateForm
                        }
                    >
                        Add Installation
                    </Button>

                </Stack>

            </Stack>


            {/* ------------------------------------------------------------ */}
            {/* Error                                                        */}
            {/* ------------------------------------------------------------ */}

            {error && (

                <Typography
                    color="error"
                    sx={{
                        p: 2,
                        borderRadius: 1
                    }}
                >
                    {
                        typeof error === "string"
                            ? error
                            : error?.message ||
                              "Unable to load installations."
                    }
                </Typography>

            )}


            {/* ------------------------------------------------------------ */}
            {/* Installation Table                                           */}
            {/* ------------------------------------------------------------ */}

            <InstallationTable

                installations={
                    installations || []
                }

                loading={
                    loading
                }

                onView={
                    openDetails
                }

                onEdit={
                    openEditForm
                }

                onRefresh={
                    handleRefresh
                }

            />


            {/* ------------------------------------------------------------ */}
            {/* Installation Form                                            */}
            {/* ------------------------------------------------------------ */}

            {showForm && (

                <InstallationForm

                    open={
                        showForm
                    }

                    installation={
                        selectedInstallation
                    }

                    loading={
                        loading
                    }

                    onClose={
                        closeForm
                    }

                    onSubmit={
                        selectedInstallation
                            ? handleUpdate
                            : handleCreate
                    }

                />

            )}

        </Stack>

    );

}