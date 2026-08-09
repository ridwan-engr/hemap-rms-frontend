import {
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Button,
    Stack
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import {
    useState,
    useEffect
} from "react";

import useSite from "../hooks/useSites.js";

/*
|--------------------------------------------------------------------------
| Default Filters
|--------------------------------------------------------------------------
*/

const defaultFilters = {
    keyword: "",
    state: "",
    status: "",
    technology: ""
};

/*
|--------------------------------------------------------------------------
| Site Filter
|--------------------------------------------------------------------------
*/

export default function SiteFilter() {

    /*
    |--------------------------------------------------------------------------
    | Site Hook
    |--------------------------------------------------------------------------
    */

    const {
        filters,
        updateFilters,
        reload
    } = useSite();

    /*
    |--------------------------------------------------------------------------
    | Local Form State
    |--------------------------------------------------------------------------
    */

    const [form, setForm] = useState({
        ...defaultFilters,
        ...filters
    });

    /*
    |--------------------------------------------------------------------------
    | Synchronize Local Form With Redux Filters
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        setForm({
            ...defaultFilters,
            ...(filters || {})
        });

    }, [filters]);

    /*
    |--------------------------------------------------------------------------
    | Handle Input Change
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
    | Apply Filters / Search
    |--------------------------------------------------------------------------
    */

    const handleSearch = () => {

        updateFilters(form);

        reload(form);

    };

    /*
    |--------------------------------------------------------------------------
    | Reset Filters
    |--------------------------------------------------------------------------
    */

    const handleReset = () => {

        setForm({
            ...defaultFilters
        });

        updateFilters({
            ...defaultFilters
        });

        reload({
            ...defaultFilters
        });

    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <Card>

            <CardContent>

                <Grid
                    container
                    spacing={2}
                >

                    {/* ------------------------------------------------------
                        Keyword
                    ------------------------------------------------------ */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField
                            fullWidth
                            size="small"
                            label="Keyword"
                            name="keyword"
                            value={form.keyword}
                            onChange={handleChange}
                            placeholder="Site Name / Site Code"
                        />

                    </Grid>

                    {/* ------------------------------------------------------
                        State
                    ------------------------------------------------------ */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 2
                        }}
                    >

                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="State"
                            name="state"
                            value={form.state}
                            onChange={handleChange}
                        >

                            <MenuItem value="">
                                All
                            </MenuItem>

                            <MenuItem value="Lagos">
                                Lagos
                            </MenuItem>

                            <MenuItem value="Abuja">
                                Abuja
                            </MenuItem>

                            <MenuItem value="Kano">
                                Kano
                            </MenuItem>

                            <MenuItem value="Rivers">
                                Rivers
                            </MenuItem>

                            <MenuItem value="Oyo">
                                Oyo
                            </MenuItem>

                        </TextField>

                    </Grid>

                    {/* ------------------------------------------------------
                        Status
                    ------------------------------------------------------ */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 2
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

                            <MenuItem value="Healthy">
                                Healthy
                            </MenuItem>

                            <MenuItem value="Warning">
                                Warning
                            </MenuItem>

                            <MenuItem value="Critical">
                                Critical
                            </MenuItem>

                            <MenuItem value="Offline">
                                Offline
                            </MenuItem>

                        </TextField>

                    </Grid>

                    {/* ------------------------------------------------------
                        Technology
                    ------------------------------------------------------ */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 2
                        }}
                    >

                        <TextField
                            select
                            fullWidth
                            size="small"
                            label="Technology"
                            name="technology"
                            value={form.technology}
                            onChange={handleChange}
                        >

                            <MenuItem value="">
                                All
                            </MenuItem>

                            <MenuItem value="2G">
                                2G
                            </MenuItem>

                            <MenuItem value="3G">
                                3G
                            </MenuItem>

                            <MenuItem value="4G">
                                4G
                            </MenuItem>

                            <MenuItem value="5G">
                                5G
                            </MenuItem>

                        </TextField>

                    </Grid>

                    {/* ------------------------------------------------------
                        Actions
                    ------------------------------------------------------ */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                height: "100%"
                            }}
                        >

                            <Button
                                fullWidth
                                variant="contained"
                                startIcon={
                                    <SearchIcon />
                                }
                                onClick={handleSearch}
                            >
                                Apply Filters
                            </Button>

                            <Button
                                variant="outlined"
                                startIcon={
                                    <RestartAltIcon />
                                }
                                onClick={handleReset}
                            >
                                Reset
                            </Button>

                        </Stack>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}