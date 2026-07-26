import { useState } from "react";

import {

    Card,
    CardContent,
    Grid,
    TextField,
    Button

} from "@mui/material";

import useAudit from "../hooks/useAudit";

/*
|--------------------------------------------------------------------------
| Audit Filter
|--------------------------------------------------------------------------
*/

export default function AuditFilter() {

    const {

        filters,
        updateFilters,
        reload

    } = useAudit();

    const [

        localFilters,

        setLocalFilters

    ] = useState({

        search: filters.search || "",

        module: filters.module || "",

        action: filters.action || "",

        user: filters.user || "",

        site: filters.site || ""

    });

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

        setLocalFilters(previous => ({

            ...previous,

            [name]: value

        }));

    };

    /*
    |--------------------------------------------------------------------------
    | Search
    |--------------------------------------------------------------------------
    */

    const handleSearch = () => {

        updateFilters(localFilters);

        reload(localFilters);

    };

    /*
    |--------------------------------------------------------------------------
    | Reset
    |--------------------------------------------------------------------------
    */

    const handleReset = () => {

        const cleared = {

            search: "",

            module: "",

            action: "",

            user: "",

            site: ""

        };

        setLocalFilters(cleared);

        updateFilters(cleared);

        reload(cleared);

    };

    return (

        <Card>

            <CardContent>

                <Grid

                    container

                    spacing={2}

                >

                    <Grid size={{ xs:12, md:4 }}>

                        <TextField

                            fullWidth

                            label="Search"

                            name="search"

                            value={localFilters.search}

                            onChange={handleChange}

                            placeholder="Description, module or action"

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:2 }}>

                        <TextField

                            fullWidth

                            label="Module"

                            name="module"

                            value={localFilters.module}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:2 }}>

                        <TextField

                            fullWidth

                            label="Action"

                            name="action"

                            value={localFilters.action}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:2 }}>

                        <TextField

                            fullWidth

                            label="User ID"

                            name="user"

                            value={localFilters.user}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:2 }}>

                        <TextField

                            fullWidth

                            label="Site ID"

                            name="site"

                            value={localFilters.site}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid

                        size={{ xs:12 }}

                        display="flex"

                        justifyContent="flex-end"

                        gap={2}

                    >

                        <Button

                            variant="outlined"

                            onClick={handleReset}

                        >

                            Reset

                        </Button>

                        <Button

                            variant="contained"

                            onClick={handleSearch}

                        >

                            Search

                        </Button>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}