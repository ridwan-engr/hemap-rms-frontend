import {
    Button,
    Card,
    CardContent,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import {
    useEffect,
    useState
} from "react";

import useAlarm from "../hooks/useAlarm";

/*
|--------------------------------------------------------------------------
| Default Filters
|--------------------------------------------------------------------------
*/

const defaultFilters = {
    siteId: "",
    severity: "",
    status: "",
    category: "",
    source: "",
    from: "",
    to: "",
    search: ""
};

/*
|--------------------------------------------------------------------------
| Alarm Filter
|--------------------------------------------------------------------------
*/

export default function AlarmFilter() {

    const {
        filters,
        updateFilters,
        updatePagination,
        loadAlarmHistory,
        loadActiveAlarms,
        loadAlarmStatistics,
        loadAlarmSummary
    } = useAlarm();

    const [form, setForm] = useState({
        ...defaultFilters,
        ...filters
    });

    /*
    |--------------------------------------------------------------------------
    | Synchronize Form With Filters
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        setForm({
            ...defaultFilters,
            ...filters
        });

    }, [filters]);

    /*
    |--------------------------------------------------------------------------
    | Change Handler
    |--------------------------------------------------------------------------
    */

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Reload Alarm Data
    |--------------------------------------------------------------------------
    */

    const reload = (activeFilters) => {

        /*
        | Reset pagination when filters change
        */

        if (typeof updatePagination === "function") {

            updatePagination({
                page: 1
            });

        }

        /*
        | Load alarm history
        */

        if (typeof loadAlarmHistory === "function") {

            loadAlarmHistory(activeFilters);

        }

        /*
        | Load active alarms
        */

        if (typeof loadActiveAlarms === "function") {

            loadActiveAlarms(activeFilters);

        }

        /*
        | Load alarm statistics
        */

        if (typeof loadAlarmStatistics === "function") {

            loadAlarmStatistics(activeFilters);

        }

        /*
        | Load alarm summary
        */

        if (typeof loadAlarmSummary === "function") {

            loadAlarmSummary(activeFilters);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Apply Filters
    |--------------------------------------------------------------------------
    */

    const handleApply = () => {

        const cleanedFilters = Object.fromEntries(

            Object.entries(form).filter(
                ([, value]) =>
                    value !== "" &&
                    value !== null &&
                    value !== undefined
            )

        );

        updateFilters(cleanedFilters);

        reload(cleanedFilters);

    };

    /*
    |--------------------------------------------------------------------------
    | Reset Filters
    |--------------------------------------------------------------------------
    */

    const handleReset = () => {

        const resetFilters = {
            ...defaultFilters
        };

        setForm(resetFilters);

        updateFilters(resetFilters);

        reload(resetFilters);

    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                        mb: 2
                    }}
                >
                    Alarm Filters
                </Typography>

                <Grid
                    container
                    spacing={2}
                >

                    {/* Site */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField
                            fullWidth
                            size="small"
                            label="Site"
                            name="siteId"
                            value={form.siteId}
                            onChange={handleChange}
                        />

                    </Grid>

                    {/* Severity */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="Severity"
                            name="severity"
                            value={form.severity}
                            onChange={handleChange}
                        >

                            <MenuItem value="">
                                All
                            </MenuItem>

                            <MenuItem value="critical">
                                Critical
                            </MenuItem>

                            <MenuItem value="major">
                                Major
                            </MenuItem>

                            <MenuItem value="minor">
                                Minor
                            </MenuItem>

                            <MenuItem value="warning">
                                Warning
                            </MenuItem>

                            <MenuItem value="information">
                                Information
                            </MenuItem>

                        </TextField>

                    </Grid>

                    {/* Status */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="Status"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >

                            <MenuItem value="">
                                All
                            </MenuItem>

                            <MenuItem value="active">
                                Active
                            </MenuItem>

                            <MenuItem value="acknowledged">
                                Acknowledged
                            </MenuItem>

                            <MenuItem value="resolved">
                                Resolved
                            </MenuItem>

                        </TextField>

                    </Grid>

                    {/* Category */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField
                            fullWidth
                            size="small"
                            label="Category"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                        />

                    </Grid>

                    {/* Source */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField
                            fullWidth
                            size="small"
                            label="Source"
                            name="source"
                            value={form.source}
                            onChange={handleChange}
                        />

                    </Grid>

                    {/* Search */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField
                            fullWidth
                            size="small"
                            label="Search"
                            name="search"
                            value={form.search}
                            onChange={handleChange}
                        />

                    </Grid>

                    {/* From */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="From"
                            name="from"
                            value={form.from}
                            onChange={handleChange}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                        />

                    </Grid>

                    {/* To */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField
                            fullWidth
                            size="small"
                            type="date"
                            label="To"
                            name="to"
                            value={form.to}
                            onChange={handleChange}
                            slotProps={{
                                inputLabel: {
                                    shrink: true
                                }
                            }}
                        />

                    </Grid>

                </Grid>

                {/* Actions */}

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "flex-end",
                        alignItems: "center",
                        mt: 3
                    }}
                >

                    <Button
                        variant="outlined"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleApply}
                    >
                        Apply Filters
                    </Button>

                </Stack>

            </CardContent>

        </Card>

    );

}