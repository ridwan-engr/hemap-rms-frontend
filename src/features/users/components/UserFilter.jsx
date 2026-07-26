import { useEffect, useState } from "react";

import {
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Button
} from "@mui/material";

import {
    getRoles,
    getSites
} from "../api/userApi";

import useUser from "../hooks/useUser";

/*
|--------------------------------------------------------------------------
| User Filter
|--------------------------------------------------------------------------
*/

export default function UserFilter() {

    const {
        filters,
        updateFilters,
        reload
    } = useUser();

    const [roles, setRoles] = useState([]);
    const [sites, setSites] = useState([]);

    const [localFilters, setLocalFilters] = useState({

        search: filters.search || "",

        role: filters.role || "",

        site: filters.site || "",

        isActive:
            filters.isActive === undefined
                ? ""
                : filters.isActive

    });

    /*
    |--------------------------------------------------------------------------
    | Load Lookups
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        async function loadLookups() {

            try {

                const [

                    roleData,

                    siteData

                ] = await Promise.all([

                    getRoles(),

                    getSites()

                ]);

                setRoles(roleData || []);

                setSites(siteData || []);

            }

            catch (error) {

                console.error(error);

            }

        }

        loadLookups();

    }, []);

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

            role: "",

            site: "",

            isActive: ""

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

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            fullWidth

                            label="Search"

                            name="search"

                            value={localFilters.search}

                            onChange={handleChange}

                            placeholder="Name or Email"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            fullWidth

                            select

                            label="Role"

                            name="role"

                            value={localFilters.role}

                            onChange={handleChange}

                        >

                            <MenuItem value="">

                                All Roles

                            </MenuItem>

                            {

                                roles.map(role => (

                                    <MenuItem

                                        key={role._id}

                                        value={role._id}

                                    >

                                        {role.name}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            fullWidth

                            select

                            label="Assigned Site"

                            name="site"

                            value={localFilters.site}

                            onChange={handleChange}

                        >

                            <MenuItem value="">

                                All Sites

                            </MenuItem>

                            {

                                sites.map(site => (

                                    <MenuItem

                                        key={site._id}

                                        value={site._id}

                                    >

                                        {site.siteName}

                                    </MenuItem>

                                ))

                            }

                        </TextField>

                    </Grid>

                    <Grid size={{ xs: 12, md: 3 }}>

                        <TextField

                            fullWidth

                            select

                            label="Status"

                            name="isActive"

                            value={localFilters.isActive}

                            onChange={handleChange}

                        >

                            <MenuItem value="">

                                All

                            </MenuItem>

                            <MenuItem value={true}>

                                Active

                            </MenuItem>

                            <MenuItem value={false}>

                                Inactive

                            </MenuItem>

                        </TextField>

                    </Grid>

                    <Grid

                        size={{ xs: 12 }}

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