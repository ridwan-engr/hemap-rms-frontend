import {

    Grid,
    Card,
    CardContent,
    Typography,
    Skeleton

} from "@mui/material";

import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import useRole from "../hooks/useRole";

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
                    alignItems="center"
                    justifyContent="space-between"
                >

                    <Grid>

                        <Typography
                            color="text.secondary"
                            variant="body2"
                        >

                            {title}

                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                        >

                            {value}

                        </Typography>

                    </Grid>

                    <Grid>

                        {icon}

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}

/*
|--------------------------------------------------------------------------
| Role Summary Cards
|--------------------------------------------------------------------------
*/

export default function RoleSummaryCards() {

    const {

        summary,

        loading

    } = useRole();

    if (loading) {

        return (

            <Grid
                container
                spacing={2}
            >

                {

                    [...Array(4)].map((_, index) => (

                        <Grid
                            key={index}
                            size={{ xs:12, md:3 }}
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

            <Grid size={{ xs:12, md:3 }}>

                <SummaryCard

                    title="Total Roles"

                    value={summary.totalRoles ?? 0}

                    icon={

                        <SecurityIcon

                            fontSize="large"

                            color="primary"

                        />

                    }

                />

            </Grid>

            <Grid size={{ xs:12, md:3 }}>

                <SummaryCard

                    title="System Roles"

                    value={summary.systemRoles ?? 0}

                    icon={

                        <AdminPanelSettingsIcon

                            fontSize="large"

                            color="secondary"

                        />

                    }

                />

            </Grid>

            <Grid size={{ xs:12, md:3 }}>

                <SummaryCard

                    title="Custom Roles"

                    value={summary.customRoles ?? 0}

                    icon={

                        <VerifiedUserIcon

                            fontSize="large"

                            color="success"

                        />

                    }

                />

            </Grid>

            <Grid size={{ xs:12, md:3 }}>

                <SummaryCard

                    title="Permissions"

                    value={summary.totalPermissions ?? 0}

                    icon={

                        <LockOpenIcon

                            fontSize="large"

                            color="warning"

                        />

                    }

                />

            </Grid>

        </Grid>

    );

}