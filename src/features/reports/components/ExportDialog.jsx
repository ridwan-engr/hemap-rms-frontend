import {

    useState

} from "react";

import {

    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

    Grid,

    Button,

    TextField,

    MenuItem,

    FormControlLabel,

    Checkbox,

    Stack,

    Typography,

    Alert,

    CircularProgress

} from "@mui/material";

import useReports from "../hooks/useReports.js";

/*
|--------------------------------------------------------------------------
| Export Formats
|--------------------------------------------------------------------------
*/

const FORMATS = [

    {

        label: "PDF",

        value: "pdf"

    },

    {

        label: "Excel",

        value: "xlsx"

    },

    {

        label: "CSV",

        value: "csv"

    }

];

/*
|--------------------------------------------------------------------------
| Export Dialog
|--------------------------------------------------------------------------
*/

export default function ExportDialog({

    open,

    onClose

}) {

    const {

        report,

        exportGeneratedReport,

        exporting

    } = useReports();

    const [

        options,

        setOptions

    ] = useState({

        format: "pdf",

        includeSummary: true,

        includeCharts: true,

        includeTable: true,

        orientation: "portrait"

    });

    /*
    |--------------------------------------------------------------------------
    | Change
    |--------------------------------------------------------------------------
    */

    const handleChange = event => {

        const {

            name,

            value,

            checked,

            type

        } = event.target;

        setOptions(previous => ({

            ...previous,

            [

                name

            ]:

                type === "checkbox"

                    ? checked

                    : value

        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Export
    |--------------------------------------------------------------------------
    */

    const handleExport = async () => {

        if (!report) {

            return;

        }

        await exportGeneratedReport({

            reportId: report._id,

            ...options

        });

        onClose();

    };

    return (

        <Dialog

            open={open}

            onClose={onClose}

            fullWidth

            maxWidth="sm"

        >

            <DialogTitle>

                Export Report

            </DialogTitle>

            <DialogContent>

                {

                    !report && (

                        <Alert

                            severity="warning"

                            sx={{ mb:2 }}

                        >

                            Generate a report before exporting.

                        </Alert>

                    )

                }

                <Grid

                    container

                    spacing={2}

                >

                    <Grid size={{ xs:12 }}>

                        <TextField

                            fullWidth

                            select

                            label="Export Format"

                            name="format"

                            value={options.format}

                            onChange={handleChange}

                        >

                            {

                                FORMATS.map(format => (

                                    <MenuItem

                                        key={format.value}

                                        value={format.value}

                                    >

                                        {format.label}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    {

                        options.format === "pdf" && (

                            <Grid size={{ xs:12 }}>

                                <TextField

                                    fullWidth

                                    select

                                    label="Orientation"

                                    name="orientation"

                                    value={options.orientation}

                                    onChange={handleChange}

                                >

                                    <MenuItem value="portrait">

                                        Portrait

                                    </MenuItem>

                                    <MenuItem value="landscape">

                                        Landscape

                                    </MenuItem>

                                </TextField>

                            </Grid>

                        )

                    }

                    <Grid size={{ xs:12 }}>

                        <Typography

                            fontWeight={600}

                        >

                            Include

                        </Typography>

                        <Stack>

                            <FormControlLabel

                                control={

                                    <Checkbox

                                        checked={options.includeSummary}

                                        name="includeSummary"

                                        onChange={handleChange}

                                    />

                                }

                                label="Summary Cards"

                            />

                            <FormControlLabel

                                control={

                                    <Checkbox

                                        checked={options.includeCharts}

                                        name="includeCharts"

                                        onChange={handleChange}

                                    />

                                }

                                label="Charts"

                            />

                            <FormControlLabel

                                control={

                                    <Checkbox

                                        checked={options.includeTable}

                                        name="includeTable"

                                        onChange={handleChange}

                                    />

                                }

                                label="Detailed Table"

                            />

                        </Stack>

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

                    disabled={

                        exporting ||

                        !report

                    }

                    onClick={handleExport}

                    startIcon={

                        exporting

                        ? <CircularProgress size={18}/>

                        : null

                    }

                >

                    Export

                </Button>

            </DialogActions>

        </Dialog>

    );

}