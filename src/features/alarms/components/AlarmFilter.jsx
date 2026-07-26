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

import { useEffect, useState } from "react";

import useAlarm from "../hooks/useAlarm";

/*
|--------------------------------------------------------------------------
| Default Filter
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

        reload

    } = useAlarm();

    const [form, setForm] = useState({

        ...defaultFilters,

        ...filters

    });

    useEffect(() => {

        setForm({

            ...defaultFilters,

            ...filters

        });

    }, [filters]);

    function handleChange(event) {

        const {

            name,

            value

        } = event.target;

        setForm((previous) => ({

            ...previous,

            [name]: value

        }));

    }

    function handleApply() {

        updateFilters(form);

        reload(form);

    }

    function handleReset() {

        setForm(defaultFilters);

        updateFilters(defaultFilters);

        reload(defaultFilters);

    }

    return (

        <Card>

            <CardContent>

                <Typography

                    variant="h6"

                    fontWeight={700}

                    mb={2}

                >

                    Alarm Filters

                </Typography>

                <Grid

                    container

                    spacing={2}

                >

                    {/* Site */}

                    <Grid size={{ xs: 12, md: 3 }}>

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

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            select

                            fullWidth

                            size="small"

                            label="Severity"

                            name="severity"

                            value={form.severity}

                            onChange={handleChange}

                        >

                            <MenuItem value="">All</MenuItem>

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

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            select

                            fullWidth

                            size="small"

                            label="Status"

                            name="status"

                            value={form.status}

                            onChange={handleChange}

                        >

                            <MenuItem value="">All</MenuItem>

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

                    <Grid size={{ xs: 12, md: 3 }}>

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

                    <Grid size={{ xs: 12, md: 3 }}>

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

                    <Grid size={{ xs: 12, md: 3 }}>

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

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            fullWidth

                            size="small"

                            type="date"

                            label="From"

                            name="from"

                            value={form.from}

                            onChange={handleChange}

                            InputLabelProps={{

                                shrink: true

                            }}

                        />

                    </Grid>

                    {/* To */}

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            fullWidth

                            size="small"

                            type="date"

                            label="To"

                            name="to"

                            value={form.to}

                            onChange={handleChange}

                            InputLabelProps={{

                                shrink: true

                            }}

                        />

                    </Grid>

                </Grid>

                <Stack

                    direction="row"

                    spacing={2}

                    justifyContent="flex-end"

                    mt={3}

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