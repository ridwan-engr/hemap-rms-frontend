import {
    useEffect,
    useState
} from "react";

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
| Default Form
|--------------------------------------------------------------------------
*/

const DEFAULT_FORM = {
    key: "",
    value: "",
    description: "",
    category: "SYSTEM",
    editable: true
};

/*
|--------------------------------------------------------------------------
| Convert Value To Text
|--------------------------------------------------------------------------
*/

function valueToText(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    if (
        typeof value === "object"
    ) {
        return JSON.stringify(
            value,
            null,
            2
        );
    }

    return String(value);

}

/*
|--------------------------------------------------------------------------
| Parse Value
|--------------------------------------------------------------------------
*/

function parseValue(value) {

    const text = String(
        value ?? ""
    ).trim();

    if (text === "") {
        return "";
    }

    /*
    | JSON / object / array / quoted string
    */

    try {

        return JSON.parse(text);

    }

    catch {
        // Continue with primitive parsing.
    }

    /*
    | Boolean
    */

    if (text === "true") {
        return true;
    }

    if (text === "false") {
        return false;
    }

    /*
    | Number
    */

    if (
        text !== "" &&
        !Number.isNaN(Number(text))
    ) {

        return Number(text);

    }

    /*
    | Plain string
    */

    return value;

}

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
    ] = useState(DEFAULT_FORM);

    /*
    |--------------------------------------------------------------------------
    | Populate Form
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!setting) {

            setForm({
                ...DEFAULT_FORM
            });

            return;

        }

        setForm({

            key:
                setting.key || "",

            value:
                valueToText(
                    setting.value
                ),

            description:
                setting.description || "",

            category:
                setting.category || "SYSTEM",

            editable:
                setting.editable !== false

        });

    }, [setting]);

    /*
    |--------------------------------------------------------------------------
    | Handle Change
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
    | Handle Switch
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

        if (!form.key.trim()) {
            return;
        }

        const parsedValue =
            parseValue(form.value);

        if (onSave) {

            onSave({
                ...form,
                key: form.key.trim(),
                value: parsedValue
            });

        }

    };

    return (

        <Dialog
            open={Boolean(open)}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>
                {setting
                    ? "Edit Setting"
                    : "Create Setting"
                }
            </DialogTitle>

            <DialogContent>

                <Grid
                    container
                    spacing={3}
                    sx={{ mt: 1 }}
                >

                    <Grid
                        size={{ xs: 12 }}
                    >

                        <TextField
                            fullWidth
                            label="Key"
                            name="key"
                            value={form.key}
                            onChange={handleChange}
                            disabled={Boolean(setting)}
                        />

                    </Grid>

                    <Grid
                        size={{ xs: 12 }}
                    >

                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            label="Value"
                            name="value"
                            value={form.value}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid
                        size={{ xs: 12 }}
                    >

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={form.category}
                            disabled={Boolean(setting)}
                        />

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={Boolean(
                                        form.editable
                                    )}
                                    onChange={
                                        handleSwitch
                                    }
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
                    disabled={!form.key.trim()}
                >
                    Save
                </Button>

            </DialogActions>

        </Dialog>

    );

}