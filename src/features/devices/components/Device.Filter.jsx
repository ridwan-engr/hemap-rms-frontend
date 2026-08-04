import {

    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Button

} from "@mui/material";

import {

    useState

} from "react";

import useDevice from "../hooks/useDevice";

/*
|--------------------------------------------------------------------------
| Device Filter
|--------------------------------------------------------------------------
*/

export default function DeviceFilter() {

    const {

        filters,

        updateFilters,

        reload

    } = useDevice();

    const [

        localFilters,

        setLocalFilters

    ] = useState({

        name: filters.name || "",

        type: filters.type || "",

        status: filters.status || ""

    });

    const handleChange = event => {

        const {

            name,

            value

        } = event.target;

        setLocalFilters(

            previous => ({

                ...previous,

                [name]: value

            })

        );

    };

    const handleSearch = () => {

        updateFilters(

            localFilters

        );

        reload(

            localFilters

        );

    };

    const handleReset = () => {

        const cleared = {

            name: "",

            type: "",

            status: ""

        };

        setLocalFilters(

            cleared

        );

        updateFilters(

            cleared

        );

        reload(

            cleared

        );

    };

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

                            md: 4

                        }}

                    >

                        <TextField

                            fullWidth

                            label="Device Name"

                            name="name"

                            value={

                                localFilters.name

                            }

                            onChange={

                                handleChange

                            }

                        />

                    </Grid>

                    <Grid

                        size={{

                            xs: 12,

                            md: 3

                        }}

                    >

                        <TextField

                            fullWidth

                            select

                            label="Type"

                            name="type"

                            value={

                                localFilters.type

                            }

                            onChange={

                                handleChange

                            }

                        >

                            <MenuItem value="">

                                All

                            </MenuItem>

                            <MenuItem value="Gateway">

                                Gateway

                            </MenuItem>

                            <MenuItem value="Battery">

                                Battery

                            </MenuItem>

                            <MenuItem value="Solar">

                                Solar

                            </MenuItem>

                            <MenuItem value="Generator">

                                Generator

                            </MenuItem>

                            <MenuItem value="Rectifier">

                                Rectifier

                            </MenuItem>

                        </TextField>

                    </Grid>

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

                            name="status"

                            value={

                                localFilters.status

                            }

                            onChange={

                                handleChange

                            }

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

                        display="flex"

                        gap={1}

                    >

                        <Button

                            fullWidth

                            variant="contained"

                            onClick={

                                handleSearch

                            }

                        >

                            Search

                        </Button>

                        <Button

                            fullWidth

                            variant="outlined"

                            onClick={

                                handleReset

                            }

                        >

                            Reset

                        </Button>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}