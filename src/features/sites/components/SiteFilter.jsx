import {
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Button
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import {
    useState,
    useEffect
} from "react";

import useSite from "../hooks/useSites.js";

/*
|--------------------------------------------------------------------------
| Site Filter
|--------------------------------------------------------------------------
*/

export default function SiteFilter() {

    const {
        filters,
        updateFilters,
        reload
    } = useSite();

    const [form, setForm] = useState({

        keyword: "",
        state: "",
        status: "",
        technology: ""

    });

    /*
    |--------------------------------------------------------------------------
    | Initialize Filter
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        setForm({

            keyword:
                filters?.keyword ?? "",

            state:
                filters?.state ?? "",

            status:
                filters?.status ?? "",

            technology:
                filters?.technology ?? ""

        });

    }, [
        filters
    ]);

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
    | Apply Filter
    |--------------------------------------------------------------------------
    */

    const handleSearch = () => {

        updateFilters(form);

        reload(form);

    };

    /*
    |--------------------------------------------------------------------------
    | Reset
    |--------------------------------------------------------------------------
    */

    const handleReset = () => {

        const cleared = {

            keyword: "",
            state: "",
            status: "",
            technology: ""

        };

        setForm(cleared);

        updateFilters(cleared);

        reload(cleared);

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

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Keyword"
                            name="keyword"
                            value={form.keyword}
                            onChange={handleChange}
                            placeholder="Site Name / Site Code"
                        />

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 2
                        }}
                    >

                        <TextField
                            select
                            fullWidth
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

                            <MenuItem value="Rivers">
                                Oyo
                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 2
                        }}
                    >

                        <TextField
                            select
                            fullWidth
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

                    <Grid
                        size={{
                            xs: 12,
                            md: 2
                        }}
                    >

                        <TextField
                            select
                            fullWidth
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

                    <Grid
                        size={{ xs: 12, md: 3 }}
                        sx={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<SearchIcon />}
                            onClick={handleSearch}
                        >
                            Apply Filters
                        </Button>
                    </Grid>

                    <Grid
                        size={{
                            xs: 12
                        }}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end"
                        }}
                    >

                        <Button
                            variant="outlined"
                            onClick={handleReset}
                        >
                            Reset
                        </Button>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}