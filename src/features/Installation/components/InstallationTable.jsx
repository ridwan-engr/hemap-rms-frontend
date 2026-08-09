import {
    CircularProgress,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    Chip
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SyncIcon from "@mui/icons-material/Sync";
import AssessmentIcon from "@mui/icons-material/Assessment";


/*
|--------------------------------------------------------------------------
| Installation Table
|--------------------------------------------------------------------------
*/

export default function InstallationTable({

    installations = [],

    loading = false,

    syncLoading = false,

    onView,

    onEdit,

    onDelete,

    onSynchronize,

    onStatistics

}) {


    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    const getStatus = installation => {

        const value =
            installation?.status ||
            "UNKNOWN";

        const status =
            String(value).toUpperCase();


        if (
            status === "ACTIVE" ||
            status === "ONLINE" ||
            status === "CONNECTED"
        ) {

            return {
                label: status,
                color: "success"
            };

        }


        if (
            status === "INACTIVE" ||
            status === "OFFLINE" ||
            status === "DISCONNECTED"
        ) {

            return {
                label: status,
                color: "error"
            };

        }


        if (
            status === "MAINTENANCE" ||
            status === "WARNING"
        ) {

            return {
                label: status,
                color: "warning"
            };

        }


        return {
            label: status,
            color: "default"
        };

    };


    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (
        !loading &&
        installations.length === 0
    ) {

        return (

            <Paper
                variant="outlined"
                sx={{
                    p: 5,
                    textAlign: "center"
                }}
            >

                <Typography
                    color="text.secondary"
                >
                    No installations found.
                </Typography>

            </Paper>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <TableContainer
            component={Paper}
            variant="outlined"
        >

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>
                            Installation
                        </TableCell>

                        <TableCell>
                            Site ID
                        </TableCell>

                        <TableCell>
                            Location
                        </TableCell>

                        <TableCell>
                            Type
                        </TableCell>

                        <TableCell>
                            Status
                        </TableCell>

                        <TableCell align="right">
                            Actions
                        </TableCell>

                    </TableRow>

                </TableHead>


                <TableBody>

                    {loading && (

                        <TableRow>

                            <TableCell
                                colSpan={6}
                                align="center"
                            >

                                <CircularProgress
                                    size={28}
                                />

                            </TableCell>

                        </TableRow>

                    )}


                    {!loading &&
                        installations.map(
                            installation => {

                                const status =
                                    getStatus(
                                        installation
                                    );


                                const id =
                                    installation?.id ||
                                    installation?._id ||
                                    installation?.installationId;


                                const location =
                                    typeof installation?.location ===
                                    "string"
                                        ? installation.location
                                        : installation?.location?.name ||
                                          installation?.address ||
                                          "—";


                                return (

                                    <TableRow
                                        key={id}
                                        hover
                                    >

                                        <TableCell>

                                            <Typography
                                                fontWeight={600}
                                            >
                                                {
                                                    installation?.name ||
                                                    installation?.siteName ||
                                                    "Unnamed Installation"
                                                }
                                            </Typography>

                                        </TableCell>


                                        <TableCell>

                                            {
                                                installation?.siteId ||
                                                "—"
                                            }

                                        </TableCell>


                                        <TableCell>

                                            {location}

                                        </TableCell>


                                        <TableCell>

                                            {
                                                installation?.type ||
                                                installation?.installationType ||
                                                "—"
                                            }

                                        </TableCell>


                                        <TableCell>

                                            <Chip
                                                size="small"
                                                label={
                                                    status.label
                                                }
                                                color={
                                                    status.color
                                                }
                                            />

                                        </TableCell>


                                        <TableCell align="right">

                                            <Stack
                                                direction="row"
                                                justifyContent="flex-end"
                                                spacing={0.5}
                                            >

                                                <Tooltip
                                                    title="View"
                                                >

                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            onView?.(
                                                                installation
                                                            )
                                                        }
                                                    >
                                                        <VisibilityIcon />
                                                    </IconButton>

                                                </Tooltip>


                                                <Tooltip
                                                    title="Statistics"
                                                >

                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            onStatistics?.(
                                                                installation
                                                            )
                                                        }
                                                    >
                                                        <AssessmentIcon />
                                                    </IconButton>

                                                </Tooltip>


                                                <Tooltip
                                                    title="Synchronize"
                                                >

                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                        disabled={
                                                            syncLoading
                                                        }
                                                        onClick={() =>
                                                            onSynchronize?.(
                                                                installation
                                                            )
                                                        }
                                                    >

                                                        {
                                                            syncLoading
                                                                ? (
                                                                    <CircularProgress
                                                                        size={18}
                                                                    />
                                                                )
                                                                : (
                                                                    <SyncIcon />
                                                                )
                                                        }

                                                    </IconButton>

                                                </Tooltip>


                                                <Tooltip
                                                    title="Edit"
                                                >

                                                    <IconButton
                                                        size="small"
                                                        onClick={() =>
                                                            onEdit?.(
                                                                installation
                                                            )
                                                        }
                                                    >
                                                        <EditIcon />
                                                    </IconButton>

                                                </Tooltip>


                                                <Tooltip
                                                    title="Delete"
                                                >

                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() =>
                                                            onDelete?.(
                                                                installation
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>

                                                </Tooltip>

                                            </Stack>

                                        </TableCell>

                                    </TableRow>

                                );

                            }
                        )}

                </TableBody>

            </Table>

        </TableContainer>

    );

}