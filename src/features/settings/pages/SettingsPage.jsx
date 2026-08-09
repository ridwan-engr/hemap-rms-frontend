import { useEffect, useState } from "react";

import {
    Grid,
    Box
} from "@mui/material";

import useSettings from "../hooks/useSettings";

import SettingsToolbar from "../components/SettingsToolbar";
import SettingsSidebar from "../components/SettingsSidebar";
import SettingsCategory from "../components/SettingsCategory";
import SettingEditor from "../components/SettingEditor";
import SettingDeleteDialog from "../components/SettingDeleteDialog";

/*
|--------------------------------------------------------------------------
| Settings Page
|--------------------------------------------------------------------------
|
| Responsibilities:
|
| - Load system settings
| - Manage editor/delete dialog visibility
| - Delegate CRUD operations to useSettings
| - Pass callbacks to child components
|
| Components do not dispatch Redux actions directly.
|
|--------------------------------------------------------------------------
*/

export default function SettingsPage() {

    /*
    |--------------------------------------------------------------------------
    | Settings Hook
    |--------------------------------------------------------------------------
    */

    const {
        reload,
        updateSetting,
        deleteSetting
    } = useSettings();

    /*
    |--------------------------------------------------------------------------
    | Local UI State
    |--------------------------------------------------------------------------
    */

    const [
        editorOpen,
        setEditorOpen
    ] = useState(false);

    const [
        deleteOpen,
        setDeleteOpen
    ] = useState(false);

    const [
        selectedSetting,
        setSelectedSetting
    ] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        reload();

    }, [
        reload
    ]);

    /*
    |--------------------------------------------------------------------------
    | Edit Setting
    |--------------------------------------------------------------------------
    */

    const handleEdit = setting => {

        if (!setting) {
            return;
        }

        if (!setting.editable) {
            return;
        }

        setSelectedSetting(setting);
        setEditorOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | Delete Setting
    |--------------------------------------------------------------------------
    */

    const handleDelete = setting => {

        if (!setting) {
            return;
        }

        if (!setting.editable) {
            return;
        }

        setSelectedSetting(setting);
        setDeleteOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | Save Setting
    |--------------------------------------------------------------------------
    */

    const handleSave = async form => {

        if (!selectedSetting) {
            return;
        }

        const settingId =
            selectedSetting._id ||
            selectedSetting.id;

        if (!settingId) {
            console.error(
                "Cannot update setting: missing setting ID."
            );
            return;
        }

        try {

            /*
            |--------------------------------------------------------------------------
            | updateSetting already dispatches the Redux thunk.
            |
            | The slice updates the local settings collection after success.
            |--------------------------------------------------------------------------
            */

            await updateSetting(
                settingId,
                form
            ).unwrap();

            setEditorOpen(false);
            setSelectedSetting(null);

        }

        catch (error) {

            console.error(
                "Failed to update setting:",
                error
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Confirm Delete
    |--------------------------------------------------------------------------
    */

    const handleConfirmDelete = async setting => {

        if (!setting) {
            return;
        }

        const settingId =
            setting._id ||
            setting.id;

        if (!settingId) {
            console.error(
                "Cannot delete setting: missing setting ID."
            );
            return;
        }

        try {

            /*
            |--------------------------------------------------------------------------
            | Delete thunk updates Redux state after successful deletion.
            |--------------------------------------------------------------------------
            */

            await deleteSetting(
                settingId
            ).unwrap();

            setDeleteOpen(false);
            setSelectedSetting(null);

        }

        catch (error) {

            console.error(
                "Failed to delete setting:",
                error
            );

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Close Editor
    |--------------------------------------------------------------------------
    */

    const handleCloseEditor = () => {

        setEditorOpen(false);
        setSelectedSetting(null);

    };

    /*
    |--------------------------------------------------------------------------
    | Close Delete Dialog
    |--------------------------------------------------------------------------
    */

    const handleCloseDelete = () => {

        setDeleteOpen(false);
        setSelectedSetting(null);

    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <Box>

            <SettingsToolbar />

            <Grid
                container
                spacing={3}
                sx={{
                    mt: 1
                }}
            >

                {/* --------------------------------------------------------- */}
                {/* Settings Categories */}
                {/* --------------------------------------------------------- */}

                <Grid
                    size={{
                        xs: 12,
                        md: 3
                    }}
                >

                    <SettingsSidebar />

                </Grid>

                {/* --------------------------------------------------------- */}
                {/* Settings Table */}
                {/* --------------------------------------------------------- */}

                <Grid
                    size={{
                        xs: 12,
                        md: 9
                    }}
                >

                    <SettingsCategory
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                </Grid>

            </Grid>

            {/* ------------------------------------------------------------- */}
            {/* Setting Editor */}
            {/* ------------------------------------------------------------- */}

            <SettingEditor
                open={editorOpen}
                setting={selectedSetting}
                onClose={handleCloseEditor}
                onSave={handleSave}
            />

            {/* ------------------------------------------------------------- */}
            {/* Delete Confirmation */}
            {/* ------------------------------------------------------------- */}

            <SettingDeleteDialog
                open={deleteOpen}
                setting={selectedSetting}
                onClose={handleCloseDelete}
                onConfirm={handleConfirmDelete}
            />

        </Box>

    );

}