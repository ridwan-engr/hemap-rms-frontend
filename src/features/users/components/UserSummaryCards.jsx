import {

    Grid,
    Card,
    CardContent,
    Typography,
    Skeleton

} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BlockIcon from "@mui/icons-material/Block";

import useUser from "../hooks/useUser";

/*
|--------------------------------------------------------------------------
| Summary Card
|--------------------------------------------------------------------------
*/

function SummaryCard({

    title,

    value,

    icon

}) {

    return (

        <Card>

            <CardContent>

                <Grid

                    container

                    spacing={2}

                    alignItems="center"

                >

                    <Grid>

                        {icon}

                    </Grid>

                    <Grid>

                        <Typography

                            variant="body2"

                            color="text.secondary"

                        >

                            {title}

                        </Typography>

                        <Typography

                            variant="h5"

                            fontWeight={700}

                        >

                            {value}

                        </Typography>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}

/*
|--------------------------------------------------------------------------
| User Summary Cards
|--------------------------------------------------------------------------
*/

export default function UserSummaryCards() {

    const {

        summary,

        loading

    } = useUser();

    if (loading) {

        return (

            <Grid

                container

                spacing={2}

            >

                {

                    Array.from({

                        length: 4

                    }).map((_, index) => (

                        <Grid

                            key={index}

                            size={{

                                xs: 12,

                                sm: 6,

                                lg: 3

                            }}

                        >

                            <Skeleton

                                variant="rounded"

                                height={120}

                            />

                        </Grid>

                    ))

                }

            </Grid>

        );

    }

    return (

        <Grid

            container

            spacing={2}

        >

            <Grid

                size={{

                    xs: 12,

                    sm: 6,

                    lg: 3

                }}

            >

                <SummaryCard

                    title="Total Users"

                    value={

                        summary.totalUsers ?? 0

                    }

                    icon={

                        <PeopleIcon

                            color="primary"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid

                size={{

                    xs: 12,

                    sm: 6,

                    lg: 3

                }}

            >

                <SummaryCard

                    title="Administrators"

                    value={

                        summary.administrators ?? 0

                    }

                    icon={

                        <AdminPanelSettingsIcon

                            color="secondary"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid

                size={{

                    xs: 12,

                    sm: 6,

                    lg: 3

                }}

            >

                <SummaryCard

                    title="Active Users"

                    value={

                        summary.activeUsers ?? 0

                    }

                    icon={

                        <VerifiedUserIcon

                            color="success"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid

                size={{

                    xs: 12,

                    sm: 6,

                    lg: 3

                }}

            >

                <SummaryCard

                    title="Inactive Users"

                    value={

                        summary.inactiveUsers ?? 0

                    }

                    icon={

                        <BlockIcon

                            color="error"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

        </Grid>

    );

}