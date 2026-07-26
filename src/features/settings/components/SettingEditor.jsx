import { useEffect, useState } from "react";

import {

    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

    Grid,

    TextField,

    FormControlLabel,
    Switch,

    Button

} from "@mui/material";

/*
|--------------------------------------------------------------------------
| Setting Editor
|--------------------------------------------------------------------------
*/

export default function SettingEditor({

    open,

    onClose,

    onSave,

    setting

}) {

    const [

        form,

        setForm

    ] = useState({

        key: "",

        value: "",

        description: "",

        category: "SYSTEM",

        editable: true

    });

    /*
    |--------------------------------------------------------------------------
    | Populate
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!setting) {

            setForm({

                key: "",

                value: "",

                description: "",

                category: "SYSTEM",

                editable: true

            });

            return;

        }

        setForm({

            key: setting.key || "",

            value: setting.value,

            description: setting.description || "",

            category: setting.category || "SYSTEM",

            editable: setting.editable

        });

    }, [

        setting

    ]);

    /*
    |--------------------------------------------------------------------------
    | Change
    |--------------------------------------------------------------------------
    */

    const handleChange = event => {

        const {

            name,

            value

        } = event.target;

        setForm(previous => ({

            ...previous,

            [name]: value

        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Switch
    |--------------------------------------------------------------------------
    */

    const handleSwitch = event => {

        setForm(previous => ({

            ...previous,

            editable: event.target.checked

        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Save
    |--------------------------------------------------------------------------
    */

    const handleSave = () => {

        let parsedValue = form.value;

        /*
        ------------------------------------------------------------
        Attempt automatic parsing
        ------------------------------------------------------------
        */

        try {

            parsedValue = JSON.parse(form.value);

        }

        catch {

            if (

                form.value === "true"

            ) {

                parsedValue = true;

            }

            else if (

                form.value === "false"

            ) {

                parsedValue = false;

            }

            else if (

                !Number.isNaN(

                    Number(form.value)

                )

            ) {

                parsedValue = Number(form.value);

            }

        }

        onSave({

            ...form,

            value: parsedValue

        });

    };

    return (

        <Dialog

            open={open}

            onClose={onClose}

            fullWidth

            maxWidth="md"

        >

            <DialogTitle>

                Edit Setting

            </DialogTitle>

            <DialogContent>

                <Grid

                    container

                    spacing={3}

                    sx={{ mt:1 }}

                >

                    <Grid size={{ xs:12 }}>

                        <TextField

                            fullWidth

                            label="Key"

                            name="key"

                            value={form.key}

                            disabled

                        />

                    </Grid>

                    <Grid size={{ xs:12 }}>

                        <TextField

                            fullWidth

                            multiline

                            minRows={3}

                            label="Value"

                            name="value"

                            value={

                                typeof form.value === "object"

                                    ? JSON.stringify(

                                        form.value,

                                        null,

                                        2

                                    )

                                    : form.value

                            }

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12 }}>

                        <TextField

                            fullWidth

                            label="Description"

                            name="description"

                            value={form.description}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:6 }}>

                        <TextField

                            fullWidth

                            label="Category"

                            value={form.category}

                            disabled

                        />

                    </Grid>

                    <Grid

                        size={{ xs:12, md:6 }}

                        display="flex"

                        alignItems="center"

                    >

                        <FormControlLabel

                            control={

                                <Switch

                                    checked={form.editable}

                                    onChange={handleSwitch}

                                />

                            }

                            label="Editable"

                        />

                    </Grid>

                </Grid>

            </DialogContent>

            <DialogActions>

                <Button

                    onClick={onClose}

                >

                    Cancel

                </Button>

                <Button

                    variant="contained"

                    onClick={handleSave}

                >

                    Save

                </Button>

            </DialogActions>

        </Dialog>

    );

}