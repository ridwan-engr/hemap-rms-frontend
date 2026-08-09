import { useEffect, useState } from "react";

import {
    Box,
    Stack
} from "@mui/material";

import useUser from "../hooks/useUser.js";

import UserToolbar from "../components/UserToolbar.jsx";
import UserSummaryCards from "../components/UserSummaryCards.jsx";
import UserStatistics from "../components/UserStatistics.jsx";
import UserFilter from "../components/UserFilter.jsx";
import UserTable from "../components/UserTable.jsx";
import UserDetails from "../components/UserDetails.jsx";
import UserForm from "../components/UserForm.jsx";

/*
|--------------------------------------------------------------------------
| Users Page
|--------------------------------------------------------------------------
*/

export default function UsersPage() {

    const {
        reload,
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

    }, [reload]);

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

        if (!user) {
            return;
        }

        const userName = [
            user.firstName,
            user.lastName
        ]
            .filter(Boolean)
            .join(" ");

        const confirmed =
            window.confirm(
                `Delete ${userName || user.email || "this user"}?`
            );

        if (!confirmed) {
            return;
        }

        try {

            const userId =
                user._id ||
                user.id;

            await deleteUser(userId);

            await reload();

        }
        catch (error) {

            console.error(
                "Failed to delete user:",
                error
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Close Form
    |--------------------------------------------------------------------------
    */

    const handleCloseForm = () => {

        setFormOpen(false);

        setEditingUser(null);

    };

    /*
    |--------------------------------------------------------------------------
    | Close Details
    |--------------------------------------------------------------------------
    */

    const handleCloseDetails = () => {

        setDetailsOpen(false);

        setSelectedUser(null);

    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

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