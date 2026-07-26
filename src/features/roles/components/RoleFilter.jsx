import { useState } from "react";

import {

    Card,
    CardContent,
    Grid,
    TextField,
    Button

} from "@mui/material";

import useRole from "../hooks/useRole";

/*
|--------------------------------------------------------------------------
| Role Filter
|--------------------------------------------------------------------------
*/

export default function RoleFilter() {

    const {

        filters,
        updateFilters,
        reload

    } = useRole();

    const [

        localFilters,

        setLocalFilters

    ] = useState({

        search: filters.search || "",

        minPermissions: filters.minPermissions || "",

        maxPermissions: filters.maxPermissions || ""

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

            minPermissions: "",

            maxPermissions: ""

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

                            placeholder="Role name"

                            value={localFilters.search}

                            onChange={handleChange}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:3 }}>

                        <TextField

                            fullWidth

                            type="number"

                            label="Minimum Permissions"

                            name="minPermissions"

                            value={localFilters.minPermissions}

                            onChange={handleChange}

                            inputProps={{

                                min: 0

                            }}

                        />

                    </Grid>

                    <Grid size={{ xs:12, md:3 }}>

                        <TextField

                            fullWidth

                            type="number"

                            label="Maximum Permissions"

                            name="maxPermissions"

                            value={localFilters.maxPermissions}

                            onChange={handleChange}

                            inputProps={{

                                min: 0

                            }}

                        />

                    </Grid>

                    <Grid

                        size={{ xs:12, md:2 }}

                        display="flex"

                        justifyContent="flex-end"

                        alignItems="center"

                        gap={1}

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