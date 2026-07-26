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
*/

export default function SettingsPage() {

    const {

        reload,

        updateSetting,

        deleteSetting

    } = useSettings();

    /*
    |--------------------------------------------------------------------------
    | State
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
    | Edit
    |--------------------------------------------------------------------------
    */

    const handleEdit = setting => {

        if (!setting.editable) {

            return;

        }

        setSelectedSetting(setting);

        setEditorOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const handleDelete = setting => {

        if (!setting.editable) {

            return;

        }

        setSelectedSetting(setting);

        setDeleteOpen(true);

    };

    /*
    |--------------------------------------------------------------------------
    | Save
    |--------------------------------------------------------------------------
    */

    const handleSave = async form => {

        await updateSetting(

            selectedSetting._id,

            form

        );

        setEditorOpen(false);

        setSelectedSetting(null);

        reload();

    };

    /*
    |--------------------------------------------------------------------------
    | Confirm Delete
    |--------------------------------------------------------------------------
    */

    const handleConfirmDelete = async setting => {

        await deleteSetting(

            setting._id

        );

        setDeleteOpen(false);

        setSelectedSetting(null);

        reload();

    };

    /*
    |--------------------------------------------------------------------------
    | Close
    |--------------------------------------------------------------------------
    */

    const handleCloseEditor = () => {

        setEditorOpen(false);

        setSelectedSetting(null);

    };

    const handleCloseDelete = () => {

        setDeleteOpen(false);

        setSelectedSetting(null);

    };

    return (

        <Box>

            <SettingsToolbar />

            <Grid

                container

                spacing={3}

                sx={{ mt: 1 }}

            >

                <Grid

                    size={{

                        xs: 12,

                        md: 3

                    }}

                >

                    <SettingsSidebar />

                </Grid>

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

            <SettingEditor

                open={editorOpen}

                setting={selectedSetting}

                onClose={handleCloseEditor}

                onSave={handleSave}

            />

            <SettingDeleteDialog

                open={deleteOpen}

                setting={selectedSetting}

                onClose={handleCloseDelete}

                onConfirm={handleConfirmDelete}

            />

        </Box>

    );

}