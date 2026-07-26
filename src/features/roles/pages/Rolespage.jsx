import { useEffect, useState } from "react";

import {

    Box,
    Stack

} from "@mui/material";

import useRole from "../hooks/useRole";

import RoleToolbar from "../components/RoleToolbar";
import RoleSummaryCards from "../components/RoleSummaryCards";
import RoleStatistics from "../components/RoleStatistics";
import RoleFilter from "../components/RoleFilter";
import RoleTable from "../components/RoleTable";
import RoleForm from "../components/RoleForm";
import RoleDetails from "../components/RoleDetails";

/*
|--------------------------------------------------------------------------
| Roles Page
|--------------------------------------------------------------------------
*/

export default function RolesPage() {

    const {

        reload,
        loadSummary,
        loadStatistics,
        deleteRole

    } = useRole();

    /*
    |--------------------------------------------------------------------------
    | Dialog State
    |--------------------------------------------------------------------------
    */

    const [

        formOpen,

        setFormOpen

    ] = useState(false);

    const [

        detailsOpen,

        setDetailsOpen

    ] = useState(false);

    const [

        selectedRole,

        setSelectedRole

    ] = useState(null);

    const [

        editingRole,

        setEditingRole

    ] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        reload();

        loadSummary();

        loadStatistics();

    }, [

        reload,
        loadSummary,
        loadStatistics

    ]);

    /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

    const handleCreate = () => {

        setEditingRole(null);

        setFormOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | View
    |--------------------------------------------------------------------------
    */

    const handleView = role => {

        setSelectedRole(role);

        setDetailsOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | Edit
    |--------------------------------------------------------------------------
    */

    const handleEdit = role => {

        setEditingRole(role);

        setFormOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = async role => {

        const confirmed = window.confirm(

            `Delete role "${role.name}"?`

        );

        if (!confirmed) {

            return;

        }

        await deleteRole(role._id);

        reload();

    };

    /*
    |--------------------------------------------------------------------------
    | Close Dialogs
    |--------------------------------------------------------------------------
    */

    const handleCloseForm = () => {

        setEditingRole(null);

        setFormOpen(false);

    };

    const handleCloseDetails = () => {

        setSelectedRole(null);

        setDetailsOpen(false);

    };

    return (

        <Box>

            <Stack spacing={3}>

                <RoleToolbar

                    onCreate={handleCreate}

                />

                <RoleSummaryCards />

                <RoleFilter />

                <RoleStatistics />

                <RoleTable

                    onView={handleView}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />

            </Stack>

            <RoleForm

                open={formOpen}

                onClose={handleCloseForm}

                initialValues={editingRole}

            />

            <RoleDetails

                open={detailsOpen}

                onClose={handleCloseDetails}

                role={selectedRole}

            />

        </Box>

    );

}