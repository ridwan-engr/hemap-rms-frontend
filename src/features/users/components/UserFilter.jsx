import {
    useEffect,
    useState
} from "react";

import {
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Button,
    Stack
} from "@mui/material";

import useUser from "../hooks/useUser.js";

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

    const [localFilters, setLocalFilters] = useState({
        search: filters?.search || "",
        role: filters?.role || "",
        site: filters?.site || "",
        isActive:
            filters?.isActive === true
                ? "true"
                : filters?.isActive === false
                    ? "false"
                    : ""
    });

    /*
    |--------------------------------------------------------------------------
    | Synchronize With Redux
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        setLocalFilters({
            search: filters?.search || "",
            role: filters?.role || "",
            site: filters?.site || "",
            isActive:
                filters?.isActive === true
                    ? "true"
                    : filters?.isActive === false
                        ? "false"
                        : ""
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
            search:
                localFilters.search.trim(),

            role:
                localFilters.role,

            site:
                localFilters.site.trim(),

            ...(localFilters.isActive !== ""
                ? {
                    isActive:
                        localFilters.isActive === "true"
                }
                : {})
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
                    >

                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{
                                justifyContent: "flex-end"
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
                                onClick={handleSearch}
                            >
                                Search
                            </Button>

                        </Stack>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>
    );
}