import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Button
} from "@mui/material";

import useUser from "../hooks/useUser.js";

/*
|--------------------------------------------------------------------------
| User Filter
|--------------------------------------------------------------------------
|
| Uses the existing User API contract through useUser().
|
| Supported API:
|
| GET /users
|
| Query parameters:
| - search
| - role
| - site
| - isActive
|
| No separate role/site lookup endpoints are assumed.
|
*/

export default function UserFilter() {

    const {
        filters,
        updateFilters,
        reload
    } = useUser();

    /*
    |--------------------------------------------------------------------------
    | Local Filter State
    |--------------------------------------------------------------------------
    */

    const [localFilters, setLocalFilters] = useState({

        search:
            filters?.search || "",

        role:
            filters?.role || "",

        site:
            filters?.site || "",

        isActive:
            filters?.isActive === undefined ||
            filters?.isActive === null
                ? ""
                : filters.isActive

    });

    /*
    |--------------------------------------------------------------------------
    | Synchronize Local Filters With Redux
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        setLocalFilters({

            search:
                filters?.search || "",

            role:
                filters?.role || "",

            site:
                filters?.site || "",

            isActive:
                filters?.isActive === undefined ||
                filters?.isActive === null
                    ? ""
                    : filters.isActive

        });

    }, [filters]);

    /*
    |--------------------------------------------------------------------------
    | Change Handler
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

        const nextFilters = {

            ...localFilters,

            /*
            |--------------------------------------------------------------
            | Convert status selection to the appropriate query value
            |--------------------------------------------------------------
            */

            ...(localFilters.isActive === ""
                ? {}
                : {
                    isActive:
                        localFilters.isActive === true ||
                        localFilters.isActive === "true"
                })

        };

        updateFilters(nextFilters);

        reload(nextFilters);

    };

    /*
    |--------------------------------------------------------------------------
    | Reset
    |--------------------------------------------------------------------------
    */

    const handleReset = () => {

        const clearedFilters = {

            search: "",

            role: "",

            site: "",

            isActive: ""

        };

        setLocalFilters(clearedFilters);

        updateFilters(clearedFilters);

        reload(clearedFilters);

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

                    {/* Search */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField

                            fullWidth

                            label="Search"

                            name="search"

                            value={
                                localFilters.search
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Name or Email"

                        />

                    </Grid>


                    {/* Role */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField

                            fullWidth

                            select

                            label="Role"

                            name="role"

                            value={
                                localFilters.role
                            }

                            onChange={
                                handleChange
                            }

                        >

                            <MenuItem value="">

                                All Roles

                            </MenuItem>

                            <MenuItem value="ADMIN">

                                Administrator

                            </MenuItem>

                            <MenuItem value="SUPERVISOR">

                                Supervisor

                            </MenuItem>

                            <MenuItem value="ENGINEER">

                                Engineer

                            </MenuItem>

                        </TextField>

                    </Grid>


                    {/* Site */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField

                            fullWidth

                            label="Assigned Site"

                            name="site"

                            value={
                                localFilters.site
                            }

                            onChange={
                                handleChange
                            }

                            placeholder="Site ID"

                        />

                    </Grid>


                    {/* Status */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 3
                        }}
                    >

                        <TextField

                            fullWidth

                            select

                            label="Status"

                            name="isActive"

                            value={
                                localFilters.isActive
                            }

                            onChange={
                                handleChange
                            }

                        >

                            <MenuItem value="">

                                All

                            </MenuItem>

                            <MenuItem value="true">

                                Active

                            </MenuItem>

                            <MenuItem value="false">

                                Inactive

                            </MenuItem>

                        </TextField>

                    </Grid>


                    {/* Actions */}

                    <Grid

                        size={{
                            xs: 12
                        }}

                        display="flex"

                        justifyContent="flex-end"

                        gap={2}

                    >

                        <Button

                            variant="outlined"

                            onClick={
                                handleReset
                            }

                        >

                            Reset

                        </Button>


                        <Button

                            variant="contained"

                            onClick={
                                handleSearch
                            }

                        >

                            Search

                        </Button>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}