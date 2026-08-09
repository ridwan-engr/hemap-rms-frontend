import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button,
    Alert
} from "@mui/material";

/*
|--------------------------------------------------------------------------
| Setting Delete Dialog
|--------------------------------------------------------------------------
*/

export default function SettingDeleteDialog({
    open,
    onClose,
    onConfirm,
    setting
}) {

    if (!setting) {
        return null;
    }

    const settingId =
        setting._id ||
        setting.id;

    return (
        <Dialog
            open={Boolean(open)}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>
                Delete Setting
            </DialogTitle>

            <DialogContent>

                <Alert
                    severity="warning"
                    sx={{ mb: 3 }}
                >
                    Deleting a system setting may affect
                    the operation of HEMAP. Ensure this
                    setting is no longer required.
                </Alert>

                <Typography>
                    Are you sure you want to delete this setting?
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        mt: 2,
                        fontWeight: 700
                    }}
                >
                    {setting.key || "-"}
                </Typography>

                <Typography
                    color="text.secondary"
                >
                    {setting.description || "-"}
                </Typography>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    disabled={!settingId}
                    onClick={() => {

                        if (onConfirm) {
                            onConfirm(setting);
                        }

                    }}
                >
                    Delete
                </Button>

            </DialogActions>

        </Dialog>
    );

}