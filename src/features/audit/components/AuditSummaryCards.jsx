import {

    Card,
    CardContent,
    Grid,
    Skeleton,
    Typography

} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TodayIcon from "@mui/icons-material/Today";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";

import useAudit from "../hooks/useAudit";

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

                    justifyContent="space-between"

                    alignItems="center"

                >

                    <Grid>

                        <Typography

                            variant="body2"

                            color="text.secondary"

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
| Audit Summary Cards
|--------------------------------------------------------------------------
*/

export default function AuditSummaryCards() {

    const {

        summary,

        loading

    } = useAudit();

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

                            size={{ xs: 12, md: 3 }}

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

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    title="Total Audit Logs"

                    value={summary.totalLogs ?? 0}

                    icon={

                        <ReceiptLongIcon

                            color="primary"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    title="Today's Logs"

                    value={summary.todayLogs ?? 0}

                    icon={

                        <TodayIcon

                            color="success"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    title="Users Involved"

                    value={summary.totalUsers ?? 0}

                    icon={

                        <PeopleIcon

                            color="secondary"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    title="Sites Involved"

                    value={summary.totalSites ?? 0}

                    icon={

                        <BusinessIcon

                            color="warning"

                            fontSize="large"

                        />

                    }

                />

            </Grid>

        </Grid>

    );

}