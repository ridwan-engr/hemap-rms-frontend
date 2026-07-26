import { useEffect, useState } from "react";

import {

    Box,
    Stack

} from "@mui/material";

import useUser from "../hooks/useUser";

import UserToolbar from "../components/UserToolbar";
import UserSummaryCards from "../components/UserSummaryCards";
import UserStatistics from "../components/UserStatistics";
import UserFilter from "../components/UserFilter";
import UserTable from "../components/UserTable";
import UserDetails from "../components/UserDetails";
import UserForm from "../components/UserForm";

/*
|--------------------------------------------------------------------------
| Users Page
|--------------------------------------------------------------------------
*/

export default function UsersPage() {

    const {

        reload,
        loadSummary,
        loadStatistics,
        deleteUser

    } = useUser();

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

        selectedUser,

        setSelectedUser

    ] = useState(null);

    const [

        editingUser,

        setEditingUser

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

        setEditingUser(null);

        setFormOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | View
    |--------------------------------------------------------------------------
    */

    const handleView = user => {

        setSelectedUser(user);

        setDetailsOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | Edit
    |--------------------------------------------------------------------------
    */

    const handleEdit = user => {

        setEditingUser(user);

        setFormOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = async user => {

        const confirmed = window.confirm(

            `Delete ${user.firstName} ${user.lastName}?`

        );

        if (!confirmed) {

            return;

        }

        await deleteUser(user._id);

        reload();

    };

    /*
    |--------------------------------------------------------------------------
    | Close Dialogs
    |--------------------------------------------------------------------------
    */

    const handleCloseForm = () => {

        setFormOpen(false);

        setEditingUser(null);

    };

    const handleCloseDetails = () => {

        setDetailsOpen(false);

        setSelectedUser(null);

    };

    return (

        <Box>

            <Stack spacing={3}>

                <UserToolbar

                    onCreate={handleCreate}

                />

                <UserSummaryCards />

                <UserFilter />

                <UserStatistics />

                <UserTable

                    onView={handleView}

                    onEdit={handleEdit}

                    onDelete={handleDelete}

                />

            </Stack>

            <UserForm

                open={formOpen}

                onClose={handleCloseForm}

                initialValues={editingUser}

            />

            <UserDetails

                open={detailsOpen}

                onClose={handleCloseDetails}

                user={selectedUser}

            />

        </Box>

    );

}